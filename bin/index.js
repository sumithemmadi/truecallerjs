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

const yargs = require("yargs");
const PhoneNumber = require("awesome-phonenumber");
var readlineSync = require('readline-sync');
const axios = require("axios").default;
const colors = require("colors");
const truecallerjs = require("../lib/main");
const rawdata = require('../src/phonesList.json');
const path = require('path')
const fs = require("fs");

const authkey = path.join(process.env.HOME || process.env.HOMEPATH, '/.truecallerjs', 'authkey.json');

const argv = yargs.usage("Usage: \n$0  login (Login to truecaller).\n$0 -s [number] (command to search a number).").option("search", {
    alias: "s",
    description: "To search caller name and related information of a number",
    type: "character"
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
    description: "print's  output in json",
    type: "boolean"
}).option("xml", {
    description: "print's  output in XML",
    type: "boolean"
}).option("yaml", {
    description: "Print's  output in YAML",
    type: "boolean"
}).option("text", {
    description: "Print's  output as plain text(TXT)",
    type: "boolean"
}).option("html", {
    description: "Print's html table",
    type: "boolean"
}).help().alias("help", "h").argv;


// function to Read file contains of authkey.json file
function getAuthKey() {
    try {
        const data = fs.readFileSync(authkey, 'utf8')
        return JSON.parse(data);
    } catch (err) {
        let error = {
            responseStatus: "error",
            errorResp: `Unable to read  \'${authkey}\'  file. Please login to your account.`,
            data: "null"
        }
        return error;
    }
}

// generate a Random number.
function generateRandomString(length) {
    var result = "";
    var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


// User Login
if (argv._.includes("login") && argv._[0] == "login" && argv._.length == 1) {

    var dir = process.env.HOME || process.env.HOMEPATH + '/.truecallerjs';

    // Check whether '.truecallerjs' folder exist or not. 
    if (!fs.existsSync(dir)) {
        try {
            fs.mkdirSync(dir, { recursive: true });
        } catch (error) {
            console.log(error.message);
            process.exit();
        }
    }

    // create login.txt file.
    fs.writeFileSync(dir + "/login.txt", Date(), (err) => {
        if (err) {
            console.log(err.message);
            process.exit();
        }
    });


    // Login
    console.log("Login\n\n Enter mobile number in International Format\n Example : +919912345678.\n".yellow);
    var inputNumber = readlineSync.question('Enter Mobile Number : ');
    let pn = PhoneNumber(inputNumber.toString());
    if (inputNumber != pn.getNumber("e164")) {
        console.log("Enter valid phone number in International Format".red);
        process.exit();
    }
    const data = {
        countryCode: pn.getRegionCode(),
        dialingCode: pn.getCountryCode(),
        installationDetails: {
            app: {
                buildVersion: 5,
                majorVersion: 11,
                minorVersion: 7,
                store: "GOOGLE_PLAY"
            },
            device: {
                deviceId: generateRandomString(16),
                language: "en",
                manufacturer: rawdata[Math.floor(Math.random() * rawdata.length)].manufacturer,
                model: rawdata[Math.floor(Math.random() * rawdata.length)].model,
                osName: "Android",
                osVersion: "10",
                mobileServices: ["GMS"]
            },
            language: "en"
        },
        phoneNumber: pn.getNumber('significant'),
        region: "region-2",
        sequenceNo: 2
    }

    const options = {
        method: 'POST',
        headers: {
            "content-type": "application/json; charset=UTF-8",
            "accept-encoding": "gzip",
            "user-agent": "Truecaller/11.75.5 (Android;10)",
            clientsecret: "lvc22mp3l1sfv6ujg83rd17btt"
        },
        url: "https://account-asia-south1.truecaller.com/v2/sendOnboardingOtp",
        data
    };

    console.log("Sending OTP to".yellow, inputNumber.yellow);
    axios(options)
        .then(
            (response) => {
                // console.log(response.data);
                if (response.data.status == 1 || response.data.status == 9 || response.data.message == "Sent") {
                    console.log("Otp sent successfully ".green);

                    // verifyOtp and create authkey.json file.
                    const token = readlineSync.question('Enter Received OTP: ');
                    const postData = {
                        countryCode: pn.getRegionCode(),
                        dialingCode: pn.getCountryCode(),
                        phoneNumber: pn.getNumber('significant'),
                        requestId: response.data.requestId,
                        token
                    };
                    const options2 = {
                        method: 'POST',
                        headers: {
                            "content-type": "application/json; charset=UTF-8",
                            "accept-encoding": "gzip",
                            "user-agent": "Truecaller/11.75.5 (Android;10)",
                            clientsecret: "lvc22mp3l1sfv6ujg83rd17btt"
                        },
                        url: "https://account-asia-south1.truecaller.com/v1/verifyOnboardingOtp",
                        data: postData
                    }
                    axios(options2)
                        .then(
                            (requestResponse) => {
                                // console.log(requestResponse.data);
                                if ((requestResponse.data.status == 2 && !requestResponse.data.suspended) || ("installationId" in requestResponse.data)) {
                                    console.log("Your installationId : ".yellow, requestResponse.data.installationId.green);
                                    fs.writeFileSync(authkey, JSON.stringify(requestResponse.data, null, 4), (err) => {
                                        if (err) {
                                            console.log(err.message.red);
                                            process.exit();
                                        }
                                    });
                                    console.log("Logged in successfully.".green);
                                } else if (requestResponse.data.status == 11) {
                                    console.log("! Invalid OTP ".red);
                                } else if (requestResponse.data.suspended) {
                                    console.log("Oops... Your account is suspended.".red);
                                } else if ("message" in requestResponse.data) {
                                    console.log(requestResponse.message);
                                } else {
                                    console.log(requestResponse.data);
                                }
                            },
                            (error) => {
                                console.log(error.message.red);
                            })
                }
            },
            (err) => {
                console.log(err.message.red);
            }
        );

} else if (argv.s && !argv._.includes("login") && !argv.i) {

    // get file contains of authkey.json
    let jsonAuthKey = getAuthKey()
    if (jsonAuthKey.responseStatus == "error") {
        console.log(jsonAuthKey)
    } else {
        let countryCode = jsonAuthKey.phones[0].countryCode;
        let installationId = jsonAuthKey.installationId;
        if (argv.json && !argv.html && !argv.xml && !argv.text && !argv.yaml) {
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
        } else if (argv.xml && !argv.html && !argv.json && !argv.text && !argv.yaml) {
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
        } else if (argv.yaml && !argv.html && !argv.xml && !argv.text && !argv.json) {
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
        } else if (argv.text && !argv.html && !argv.yaml && !argv.xml && !argv.json) {
            let searchData = {
                number: argv.s,
                countryCode,
                installationId,
                output: "TEXT"
            }
            const searchResult = truecallerjs.searchNumber(searchData)
            searchResult.then(function(response) {
                console.log(response)
            })
        } else if (argv.html && !argv.yaml && !argv.xml && !argv.text && !argv.json) {
            let searchData = {
                number: argv.s,
                countryCode,
                installationId,
                output: "HTML"
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
                if (response == '""') {
                    console.log("Error in input".red);
                } else if (argv.r && !argv.n) {
                    console.log(JSON.stringify(response));
                } else if (argv.n && !argv.r) {
                    if ("data" in response) {
                        let data1 = response.data[0];
                        if ("name" in data1) {
                            console.log("Name :".yellow, response.data[0].name.green);
                        } else {
                            console.log("Name : ".yellow, "Unknown Name".green);
                        }
                    } else {
                        console.log("Name : ".yellow, "Unknown Name".green);
                    }
                } else if (argv.n && argv.r) {
                    if ("data" in response) {
                        let data1 = response.data[0];
                        if ("name" in data1) {
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
} else if (argv.i && !argv.s) {
    let jsonAuthKey = getAuthKey()
    if (jsonAuthKey.responseStatus == "error") {
        console.log(jsonAuthKey)
    } else {
        // let countryCode = jsonAuthKey.phones[0].countryCode;
        let installationId = jsonAuthKey.installationId;
        if (argv.r) {
            console.log(installationId);
        } else {
            console.log("Your InstallationId : ".yellow, installationId.green);
        }
    }
} else {
    yargs.showHelp();
}