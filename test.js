#!/usr/bin/env node

const yargs       = require("yargs");
const PhoneNumber = require("awesome-phonenumber");
var readlineSync  = require('readline-sync');
const axios       = require("axios").default;
const colors      = require("colors");
const login       = require("./src/main");
const path        = require('path')
const fs          = require("fs");
const authkey     = path.join(__dirname, './.secret', 'authkey.json')

const argv = yargs
    .usage(
        "Usage: \n$0  login (Login to truecaller).\n$0 -s [number] (command to search a number)."
    )
    .option("search", {
        alias: "s",
        description: "To search caller name and related iformation of a number",
        type: "charecter",
    })
    .option("json", {
        alias: "json",
        description: "To print output in json",
        type: "boolean",
    })
    .help()
    .alias("help", "h").argv;

if (argv._.includes("login") && argv._[0] == "login" && argv._.length == 1) {
    console.log("Login\n\n Enter mobile number in international formate\n Example : +919912345678.\n".blue);
    var inputNumber = readlineSync.question('Enter Mobile Number : ');
    let pn = PhoneNumber(inputNumber.toString());
    let sendOtp = login.userLogin(inputNumber, pn.getRegionCode());
    sendOtp.then(function(response) {
        if (response.status == 1 || response.status == 9) {
            console.log("Otp sent successfully ".green);
            const otp = readlineSync.question('Enter Received OTP: ');
            let verifyOtp = login.verifyOtp(number, pn.getRegionCode(), pn.getCountryCode(), response.requestId, otp);
            verifyOtp.then(function(result) {
                if ((result.status == 2) && !result.suspended) {
                    fs.writeFile(authkey, JSON.stringify(result, null, 4), (err) => {
                        if (err) {
                            console.log("Error generating authentication keys please login again".red);
                        } else {
                            console.log("Login Successfull.".green);
                            console.log("Your installationId : ".blue, result.installationId.green);
                            console.log('authkey.json file saved to secret folder');
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
} else {
    yargs.showHelp();
}
