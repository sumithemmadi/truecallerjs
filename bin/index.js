#!/usr/bin/env node

// MIT License

// Copyright (c) 2021 Emmadi Sumith Kumar
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
const yargs        = require("yargs");
const PhoneNumber  = require("awesome-phonenumber");
var readlineSync   = require('readline-sync');
const axios        = require("axios").default;
const colors       = require("colors");
const truecallerjs = require("../lib/main");
const login        = require("../lib/login");
const path         = require('path')
const fs           = require("fs");
const authkey      = path.join(__dirname, '../.secret', 'authkey.json')

const argv         = yargs.usage("Usage: \n$0  login (Login to truecaller).\n$0 -s [number] (command to search a number).").option("search", {
	alias: "s",
	description: "To search caller name and related iformation of a number",
	type: "charecter"
}).option("raw", {
	alias: "r",
	description: "Print's raw output",
	type: "boolean"
}).option("name", {
	alias: "n",
	description: "Print's user name of phone number ",
	type: "boolean"
}).option("installationid", {
	alias: "i",
	description: "shows your InstallationId",
	type: "boolean"
}).option("json", {
	description: "Get output in json only",
	type: "boolean"
}).option("xml", {
    description: "Get XML output",
    type: "boolean"
}).option("yaml", {
    description: "Get YAML output",
    type: "boolean"
}).help().alias("help", "h").argv;

function getAuthKey() {
	try {
		const data = fs.readFileSync(authkey, 'utf8')
		return JSON.parse(data);
	} catch(err) {
		let errorResp = {
			"status": "error",
			"message": "Unable to read authkey.json file"
		}
		return errorResp;
	}
}
if(argv._.includes("login") && argv._[0] == "login" && argv._.length == 1) {
	console.log("Login\n\n Enter mobile number in international formate\n Example : +919912345678.\n".blue);
	var inputNumber = readlineSync.question('Enter Mobile Number : ');
	let pn = PhoneNumber(inputNumber.toString());
	if(inputNumber != pn.getNumber("e164")) {
		console.log("Enter valid phone number in international formate".red);
		process.exit();
	}
	let sendOtp = login.userLogin(inputNumber, pn.getRegionCode(), pn.getNumber("e164"));
	sendOtp.then(function(response) {
		if(response.status == 1 || response.status == 9) {
			console.log("Otp sent successfully ".green);
			const otp = readlineSync.question('Enter Received OTP: ');
			let verifyOtp = login.verifyOtp(pn.getNumber('significant'), pn.getRegionCode(), pn.getCountryCode(), response.requestId, otp);
			verifyOtp.then(function(result) {
				//  console.log(result);
				if((result.status == 2) && !result.suspended) {
					console.log("Your installationId : ".blue, result.installationId.yellow);
					fs.writeFile(authkey, JSON.stringify(result, null, 4), (err) => {
						if(err) {
							console.log("Error creating authkey.json file . please login again".red);
						} else {
							console.log("Login Successfull.".green);
							console.log('authkey.json file saved to secret folder'.yellow);
						}
					});
				} else if(result.status == 11) {
					console.log("! Invalid OTP ".red);
				} else if(result.suspended) {
					console.log("Oops... Your account got suspended.".red);
				} else {
					console.log("Oops... somthing went wrong.".red);
				}
			}).catch(function(error) {
				console.error("Error".red);
			});
		} else {
			console.log(response.message.red);
			process.exit();
		}
	}).catch(function(error) {
		console.error("Error".red);
	});
} else if(argv.s && !argv._.includes("login") && !argv.i) {
	let jsonAuthKey = getAuthKey()
	if(jsonAuthKey.status == "error") {
		console.log(jsonAuthKey)
	} else {
		let countryCode = jsonAuthKey.phones[0].countryCode;
		let installationId = jsonAuthKey.installationId;
		if( argv.json && !argv.xml && !argv.yaml) {
			let searchData = {
					number: argv.s,
					countryCode,
					installationId,
					output: "JSON"
				}
			const searchResult = truecallerjs.searchNumber(searchData)
			searchResult.then(function(response) {
				console.log(response)
			})
		} else if ( argv.xml && !argv.json && !argv.yaml) {
			let searchData = {
					number: argv.s,
					countryCode,
					installationId,
					output: "XML"
				}
			const searchResult = truecallerjs.searchNumber(searchData)
			searchResult.then(function(response) {
				console.log(response)
			})
		} else if ( argv.yaml && !argv.xml && !argv.json ) {
			let searchData = {
					number: argv.s,
					countryCode,
					installationId,
					output: "YAML"
				}
			const searchResult = truecallerjs.searchNumber(searchData)
			searchResult.then(function(response) {
				console.log(response)
			})
		} else {
			let searchData = {
					number: argv.s,
					countryCode,
					installationId
				}
				// console.log(searchData)
			const searchResult = truecallerjs.searchNumber(searchData)
			searchResult.then(function(response) {
				if(response == '""') {
					console.log("Error in input".red);
				} else if(argv.r && !argv.n) {
					console.log(JSON.stringify(response));
				} else if(argv.n && !argv.r) {
					if("data" in response) {
						let data1 = response.data[0];
						if("name" in data1) {
							console.log("Name :".blue, response.data[0].name.yellow);
						} else {
							console.log("Name : ".blue, "Unknown Name".yellow);
						}
					} else {
						console.log("Name : ".blue, "Unknown Name".yellow);
					}
				} else if(argv.n && argv.r) {
					if("data" in response) {
						let data1 = response.data[0];
						if("name" in data1) {
							console.log(response.data[0].name);
						} else {
							console.log("Unknown Name");
						}
					} else {
						console.log("Unknown Name");
					}
				} else {
					const data = JSON.stringify(response, null, 4);
					console.log(data);
				}
			}).catch(function(error) {
				console.error("Error".red);
			});
		}
	}
} else if(argv.i && !argv.s) {
	let jsonAuthKey = getAuthKey()
	if(jsonAuthKey.status == "error") {
		console.log(jsonAuthKey)
	} else {
		let countryCode = jsonAuthKey.phones[0].countryCode;
		let installationId = jsonAuthKey.installationId;
		if(argv.r) {
			console.log(installationId);
		} else {
			console.log("Your InstallationId : ".blue, installationId.yellow);
		}
	}
} else {
	yargs.showHelp();
}
