#!/usr/bin/env node

const yargs        = require("yargs");
const PhoneNumber  = require("awesome-phonenumber");
var readlineSync   = require('readline-sync');
const axios        = require("axios").default;
const colors       = require("colors");
const truecallerjs = require("../src/verify");
const path         = require('path')
const fs           = require("fs");
const authkey      = path.join(__dirname, '../.secret', 'authkey.json')


// User login function
function userLogin(number, regionCode, countryCode, internationalNumber) {
    console.log("Sending OTP to".yellow, internationalNumber.yellow);
    let params = {
        countryCode: regionCode,
        dialingCode: countryCode,
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
                manufacturer: "Xiaomi",
                model: "M2010J19SG",
                osName: "Android",
                osVersion: "10",
                mobileServices: ["GMS"]
            },
            language: "en"
        },
        phoneNumber: number,
        region: "region-2",
        sequenceNo: 2
    };
    const axiosInstance = axios.create({
        headers: {
            "content-type": "application/json; charset=UTF-8",
            "accept-encoding": "gzip",
            "user-agent": "Truecaller/11.75.5 (Android;10)",
            clientsecret: "lvc22mp3l1sfv6ujg83rd17btt"
        }
    });

    return axiosInstance
        .post(
            "https://account-asia-south1.truecaller.com/v2/sendOnboardingOtp",
            params
        )
        .then(
            (response) => {
                return response.data;
            },
            (err) => {
                return err.response.data;
            }
        );
}

function generateRandomString(length) {
    var result = "";
    var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

//search number function
function searchNumber(number, regionCode, authorizationBearer) {
    const axiosInstance = axios.create({
        headers: {
            "content-type": "application/json; charset=UTF-8",
            "accept-encoding": "gzip",
            "user-agent": "Truecaller/11.75.5 (Android;10)",
            clientsecret: "lvc22mp3l1sfv6ujg83rd17btt"
        }
    });

    return axiosInstance
        .get(`https://search5-noneu.truecaller.com/v2/search`, {
            params: {
                q: number,
                countryCode: regionCode,
                type: 4,
                locAddr: "",
                placement: "SEARCHRESULTS,HISTORY,DETAILS",
                encoding: "json"
            },
            headers: {
                Authorization: `Bearer ${authorizationBearer}`
            },
        })
        .then(
            (response) => {
                return response.data;
            },
            (err) => {
                return err.response.data;
            }
        );
}

function isEmpty(obj) {
    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

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
    console.log(
        "Login\n\n Enter mobile number in international formate\n Example : +919912345678.\n"
        .blue
    );
    var inputNumber = readlineSync.question('Enter Mobile Number : ');

    let pn = PhoneNumber(inputNumber.toString());
    if (!pn.isValid()) {
        console.log("! Invalid number".red);
        return false;
    } else {
        // console.log(JSON.stringify( pn, null, 4 ));
        let number = pn.getNumber("significant");
        let regionCode = pn.getRegionCode();
        let internationalNumber = pn.getNumber("e164");
        let countryCode = pn.getCountryCode();

        let sendOtp = userLogin(
            number,
            regionCode,
            countryCode,
            internationalNumber
        );
        sendOtp.then(function(response) {
            if (response.status == 1 || response.status == 9) {
                console.log("Otp sent successfully ".green);
                const otp =  readlineSync.question('Enter Received OTP: ');

                let verifyOtp = truecallerjs.verifyOtp(
                    number,
                    regionCode,
                    countryCode,
                    response.requestId,
                    otp
                );

                verifyOtp.then(function(result) {
                 
                    if ((result.status == 2) && !result.suspended) {
                        fs.writeFile(authkey, JSON.stringify(result,null, 4), (err) => {
                            if (err) {
                                console.log("Error generating authentication keys please login again".red);
                            } else {
                                console.log("Login Successfull.".green);
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
    }
} else if (argv.s  && !argv._.includes("login")) {
    fs.readFile(authkey, "utf8", (err, jsonString) => {
        if (err) {
            console.log("Please login to your truecaller account".yellow);
            process.exit();
        }
//        let cc = JSON.parse(jsonString).phones[0].countryCode;
        let installationId = JSON.parse(jsonString).installationId;
        let pn = PhoneNumber(argv.s.toString(), 'IN');
        if (!pn.isValid()) {
            console.log("! Invalid number".red);
            return false;
        } else {
            let number = pn.getNumber("significant");
            let regionCode = pn.getRegionCode();
            let internationalNumber = pn.getNumber("e164");
            let countryCode = pn.getCountryCode();
            let searchNum = searchNumber(number, regionCode, installationId);
            // console.log(JSON.parse(searchNum))
            searchNum.then(function(response) {
                console.log("Name :".blue, response.data[0].name.yellow);
            });
        }
    });
} else {
    yargs.showHelp();
}
