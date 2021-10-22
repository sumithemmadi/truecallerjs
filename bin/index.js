#!/usr/bin/env node

const yargs        = require("yargs");
const PhoneNumber  = require("awesome-phonenumber");
var readlineSync   = require('readline-sync');
const axios        = require("axios").default;
const colors       = require("colors");
const login        = require("../lib/main");
const truecallerjs = require("../lib/truecallerjs");
const path         = require('path')
const fs           = require("fs");
const authkey      = path.join(__dirname, './.secret', 'authkey.json')

const argv = yargs
    .usage(
        "Usage: \n$0  login (Login to truecaller).\n$0 -s [number] (command to search a number)."
    )
    .option("search", {
        alias: "s",
        description: "To search caller name and related iformation of a number",
        type: "charecter"
    })
    .option("installationid", {
        alias: "i",
        description: "shows your InstallationId",
        type: "boolean"
    })
    .help()
    .alias("help", "h").argv;

if (argv._.includes("login") && argv._[0] == "login" && argv._.length == 1) {
    console.log("Login\n\n Enter mobile number in international formate\n Example : +919912345678.\n".blue);
    var inputNumber = readlineSync.question('Enter Mobile Number : ');
    let pn = PhoneNumber(inputNumber.toString());
    if (inputNumber != pn.getNumber("e164")){
        console.log("Enter valid phone number in international formate".red);
        process.exit();
    }
    let sendOtp = login.userLogin(inputNumber, pn.getRegionCode(),pn.getNumber("e164"));
    sendOtp.then(function(response) {
        if (response.status == 1 || response.status == 9) {
            console.log("Otp sent successfully ".green);
            const otp = readlineSync.question('Enter Received OTP: ');
            let verifyOtp = login.verifyOtp(pn.getNumber('significant'), pn.getRegionCode(), pn.getCountryCode(), response.requestId, otp);
            verifyOtp.then(function(result) {
                if ((result.status == 2) && !result.suspended) {
                    fs.writeFile(authkey, JSON.stringify(result, null, 4), (err) => {
                        if (err) {
                            console.log("Error generating authentication keys please login again".red);
                        } else {
                            console.log("Login Successfull.".green);
                            console.log("Your installationId : ".blue, result.installationId.green);
                            console.log('authkey.json file saved to secret folder'.yellow);
                        }
                    });
                } else if (result.status == 11) {
                    console.log("! Invalid OTP ".orange);
                } else if (result.suspended) {
                    console.log("Oops... Your account got suspended.".red);
                } else {
                    console.log("Oops... somthing went wrong.".red);
                }
            });

        } else {
            console.log(response.message.red);
            process.exit();

        }
    });
} else if (argv.s  && !argv._.includes("login")) {
    fs.readFile(authkey, "utf8", (err, jsonString) => {
        if (err) {
            console.log("Please login to your truecaller account".yellow);
            process.exit();
        }
        let countryCode = JSON.parse(jsonString).phones[0].countryCode;
        let installationId = JSON.parse(jsonString).installationId;
        // let pn = PhoneNumber(argv.s.toString(), countryCode );
        let searchNum = truecallerjs.searchNumber(argv.s ,countryCode, installationId);
        // console.log(JSON.parse(searchNum))
        searchNum.then(function(response) {
            console.log("Name :".blue, response.data[0].name.yellow);
        });
    });
} else if (argv.i) {
    fs.readFile(authkey, "utf8", (err, jsonString) => {
        if (err) {
            console.log("Please login to your truecaller account to know your InstallationId".yellow);
            process.exit();
        }
        let countryCode = JSON.parse(jsonString).phones[0].countryCode;
        let installationId = JSON.parse(jsonString).installationId;
        console.log("Your InstallationId : ",installationId);
    });
} else {
    yargs.showHelp();
}
