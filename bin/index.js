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
const path = require("path");
const fs = require("fs");
const { parsePhoneNumber } = require("awesome-phonenumber");
var readlineSync = require("readline-sync");
const axios = require("axios").default;
const colorize = require('json-colorizer');
var convert = require('json-to-plain-text');

const phones_list = require("../src/phonesList.json");
var make_search = require("../lib/main");
// var convertor = require("../")

// argv
const argv = yargs
  .usage(
    "Usage: \n$0  login (Login to truecaller).\n$0 -s [number] (command to search a number)."
  )
  .option("search", {
    alias: "s",
    description: "To search caller name and related information of a number",
    type: "character",
  })
  .option("raw", {
    alias: "r",
    description: "Print's raw output",
    type: "boolean",
  })
  .option("bulksearch", {
    alias: "bs",
    description: "Make a bulk number search",
    type: "character",
  })
  .option("name", {
    alias: "n",
    description: "Print's user name of phone number ",
    type: "boolean",
  })
  .option("email", {
    alias: "e",
    description: "Print's email assigned to the phonenumber",
    type: "boolean",
  })
  .option("output", {
    description: "Output type ",
    type: "character",
    choices: ['json', 'xml', 'yaml', 'html', "text"]
  })
  .option("json", {
    description: "print's  output in json",
    type: "boolean",
  })
  .option("nc", {
    alias: "no_color",
    description: "Print without color",
    type: "boolean",
  })
  .option("installationid", {
    alias: "i",
    description: "shows your InstallationId",
    type: "boolean",
  })
  .help()
  .alias("help", "h").argv;


const authkey = path.join(process.env.HOME || process.env.HOMEPATH, ".config", "truecallerjs", "authkey.json");
const truecallerjs_auth_dir = path.join(process.env.HOME || process.env.HOMEPATH, ".config", "truecallerjs");


// generate a random string
function generateRandomString(length) {
  var result = "";
  var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// sending otp function
async function send_otp(pn, phones_list, reqFile) {
  try {
    const data = {
      countryCode: pn.regionCode,
      dialingCode: pn.countryCode,
      installationDetails: {
        app: {
          buildVersion: 5,
          majorVersion: 11,
          minorVersion: 7,
          store: "GOOGLE_PLAY",
        },
        device: {
          deviceId: generateRandomString(16),
          language: "en",
          manufacturer:
            phones_list[Math.floor(Math.random() * phones_list.length)].manufacturer,
          model: phones_list[Math.floor(Math.random() * phones_list.length)].model,
          osName: "Android",
          osVersion: "10",
          mobileServices: ["GMS"],
        },
        language: "en",
      },
      phoneNumber: pn.number.significant,
      region: "region-2",
      sequenceNo: 2,
    };

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json; charset=UTF-8",
        "accept-encoding": "gzip",
        "user-agent": "Truecaller/11.75.5 (Android;10)",
        clientsecret: "lvc22mp3l1sfv6ujg83rd17btt",
      },
      url: "https://account-asia-south1.truecaller.com/v2/sendOnboardingOtp",
      data,
    };

    console.log(`\x1b[33mSending OTP to ${pn.number.e164}\x1b[0m`);
    var res = await axios(options);

    // checking otp sent status
    if (res.data.status == 1 || res.data.status == 9 || res.data.message == "Sent") {

      fs.writeFileSync(reqFile, JSON.stringify(res.data, null, 4), (err) => {
        if (err) {
          console.error("\x1b[31m ERROR : %s\x1b[0m  ", err.message);
          process.exit()

        }
      });
      console.log("\x1b[32m%s\x1b[0m", "Otp sent successfully ");
    }
    return res.data;
  } catch (error) {
    console.error(error);
    process.exit()
  }
}

// truecallerjs login function
async function truecallerjs_login(authkey, phones_list) {

  console.log("\x1b[33m%s\x1b[0m", "Login\n\n Enter mobile number in International Format\n Example : +919912345678.\n");
  var inputNumber = readlineSync.question("Enter Mobile Number : ");
  var pn = parsePhoneNumber(inputNumber.toString());

  // check if number is in international format
  if (inputNumber != pn.number.e164) {
    console.error("\x1b[31m%s\x1b[0m", "ERROR : Enter valid phone number in International Format");
    process.exit();
  }

  // check is number is valid
  if (!pn.valid) {
    console.error("\x1b[31mERROR : %s\x1b[0m", "Invalid phone number");
    process.exit();
  }

  const reqFile = path.join(process.env.HOME || process.env.HOMEPATH, ".config", "truecallerjs", "request.json");

  // check is request.json is exist
  if (!fs.existsSync(reqFile)) {
    var req_data = await send_otp(pn, phones_list, reqFile);
    // console.log(req_data)
  } else {
    try {
      var req_data = JSON.parse(fs.readFileSync(reqFile, "utf8"));
      // console.log(req_data)

      if ("parsedPhoneNumber" in req_data && `+${req_data.parsedPhoneNumber}` == pn.number.e164) {

        console.log("\n\nPrevious request was found for this mobile number.\n");
        var x = readlineSync.question("Do you want to enter previous OTP (y/n): ");
        var x_status = true;

        while (x_status) {
          if (x.toString() == "y" || x.toString() == "yes") {
            var x_status = false;

          } else if (x.toString() == "n" || x.toString() == "no") {
            fs.unlinkSync(reqFile);

            req_data = await send_otp(pn, phones_list, reqFile);
            var x_status = false;

          } else {
            console.log("\n\nEnter 'y' for yes and 'n' for no\n");
            var x = readlineSync.question("Do you want to enter previous OTP (y/n): ");
          }
        }

      } else {
        req_data = await send_otp(pn, phones_list, reqFile);
      }

    } catch (err) {
      fs.unlinkSync(reqFile);
      console.error("\x1b[31mERROR : %s\x1b[0m", err)
      process.exit()

    }
  }

  // console.log(req_data)
  // OTP 
  if (req_data.status == 1 || req_data.status == 9 || req_data.message == "Sent") {

    const token = readlineSync.question("Enter Received OTP: ");
    var requestId = req_data.requestId

    try {
      const postData = {
        countryCode: pn.regionCode,
        dialingCode: pn.countryCode,
        phoneNumber: pn.number.significant,
        requestId,
        token,
      };

      const options2 = {
        method: "POST",
        headers: {
          "content-type": "application/json; charset=UTF-8",
          "accept-encoding": "gzip",
          "user-agent": "Truecaller/11.75.5 (Android;10)",
          clientsecret: "lvc22mp3l1sfv6ujg83rd17btt",
        },
        url: "https://account-asia-south1.truecaller.com/v1/verifyOnboardingOtp",
        data: postData,
      };

      // otp verification

      var requestResponse = await axios(options2);

      // checking 
      if ((requestResponse.data.status == 2 && !requestResponse.data.suspended) || "installationId" in requestResponse.data) {
        console.log(`\x1b[33mYour installationId\x1b[0m : \x1b[32m${requestResponse.data.installationId}\x1b[0m`);

        // save the file
        fs.writeFileSync(authkey, JSON.stringify(requestResponse.data, null, 3), (err) => {
          if (err) {
            console.log("\x1b[31m%s\x1b[0m", err.message);
            process.exit();
          }
        });

        console.log("\x1b[32m%s\x1b[0m", "Logged in successfully.");
        fs.unlinkSync(reqFile);

      } else if (requestResponse.data.status == 11) {
        console.log("\x1b[31mERROR : %s\x1b[0m", "! Invalid OTP ");

      } else if (requestResponse.data.suspended) {
        console.log("\x1b[31mERROR : %s\x1b[0m", "Oops... Your account is suspended.");

      } else if ("message" in requestResponse.data) {
        console.log("\x1b[31mERROR : %s\x1b[0m", requestResponse.data.message);

      } else {
        console.log(JSON.stringify(requestResponse.data));
      }
    } catch (err) {
      console.error("\x1b[31mERROR : %s\x1b[0m", err.message);
      process.exit()
    }

  } else if (req_data.status == 6 || req_data.status == 5) {
    if (fs.existsSync(reqFile)) {
      try {
        fs.unlinkSync(reqFile);
      } catch (err) {
        console.error("ERROR : ", err);
        process.exit()
      }
    }
    console.log("\x1b[31mERROR : %s\x1b[0m", "You have exceeded the limit of verification attempts.\nPlease try again after some time.");
  } else {
    console.log("\x1b[31mERROR : %s\x1b[0m", req_data.message);
  }
}


//login with file dunction
async function truecallerjs_login_with_file(authkey, file) {
  try {
    const data = fs.readFileSync(file, "utf8");
    const fileData = JSON.parse(data);

    var installationIdJSON = {
      status: 2,
      message: "Verified",
      installationId: fileData.account.installations[0].installation.id,
      ttl: 123456,
      userId: fileData.account.userId,
      suspended: false,
      phones: [
        {
          phoneNumber: fileData.profile.personalData.phoneNumbers[0].number,
          countryCode:
            fileData.profile.personalData.phoneNumbers[0].countryCode,
          priority: 1,
        },
      ],
    };

    console.log(`\x1b[33mYour installationId\x1b[0m : \x1b[32m${fileData.account.installations[0].installation.id}\x1b[0m`);
    fs.writeFileSync(authkey, JSON.stringify(installationIdJSON, null, 4));
    console.log("\x1b[32m%s\x1b[0m", "Logged in successfully.");
  } catch (error) {
    console.error("Error : ", error.message);
    process.exit()

  }
}



// truecallerjs starts here
async function start_truecallerjs(argv, authkey, truecallerjs_auth_dir) {

  if (argv._.includes("login") && !argv.s && !argv.bs) {
    // console.log(argv)
    // Check whether '.truecallerjs' folder exist or not.
    if (!fs.existsSync(truecallerjs_auth_dir)) {
      try {
        fs.mkdirSync(truecallerjs_auth_dir, { recursive: true });
      } catch (error) {
        console.error("Error : ", error.message);
        process.exit()

      }
    }

    // login
    if (argv._[0] == "login" && argv._.length <= 2) {
      if (argv._.length == 1) {
        truecallerjs_login(authkey, phones_list)
      } else {
        truecallerjs_login_with_file(authkey, argv._[1])
      }
    } else {
      console.error("\x1b[31mERROR : Wrong command\x1b[0m.\nuse 'truecallerjs login'")
      process.exit();
    }
  } else if (argv.s && !argv.bs && !argv._.includes("login") && !argv.i) {

    // check if authkey exist or not
    if (!fs.existsSync(authkey)) {
      console.error("\x1b[33mERROR : Please login to your account.\x1b[0m");
      process.exit()
    }

    // read the file
    try {
      const data = fs.readFileSync(authkey, "utf8");
      var jsonAuthKey = JSON.parse(data);
    } catch (err) {
      console.error("\x1b[31mERROR : %s\x1b[0m", err.message);
      console.error("\x1b[33mERROR : Please login to your account.\x1b[0m");
      process.exit()
    }

    var countryCode = jsonAuthKey.phones[0].countryCode;
    var installationId = jsonAuthKey.installationId;

    if (argv.output || argv.json) {
      if (argv.json && argv.output) {
        console.error("\x1b[31mERROR : Arguments 'json' and 'output' shound not be used at same time.\x1b[0m");
        process.exit()
      }

      var searchResult = await make_search.searchNumber({
        number: argv.s,
        countryCode,
        installationId,
        output: argv.json ? "json" : argv.output,
        color: !argv.nc,
      });

      if (argv.json || argv.output == "json") {

        // const data = JSON.stringify(searchResult);
        if (argv.r) {
          console.log(!argv.nc ? colorize(searchResult) : JSON.stringify(searchResult));
        } else {
          console.log(!argv.nc ? colorize(searchResult, { pretty: true }) : JSON.stringify(searchResult, null, 3));
        }
      } else if (!argv.json && argv.output) {
        console.log(searchResult)
      }
    } else {
      var searchData = {
        number: argv.s,
        countryCode,
        installationId,
      };

      // console.log(searchData)
      const response = await make_search.searchNumber(searchData);

      if (response.data == "null") {
        console.error("\x1b[31mERROR : %s\x1b[0m", response.errorResp);
        process.exit()
      } else if (response == '""') {
        console.error("\x1b[31mERROR : Error in input\x1b[0m");
        process.exit()

        // } else if (argv.no_color && !argv.n && !argv.e) {
        //   var cdata = convert.toPlainText(response, false, true);
        //   console.log(cdata)


      } else if (argv.n && !argv.r && !argv.e) {
        if ("data" in response) {
          var data1 = response.data[0];
          if ("name" in data1) {
            if ("altName" in data1) {
              console.log(argv.nc ? `Name : ${response.data[0].name}` : `\x1b[33mName\x1b[0m : \x1b[32m${response.data[0].name}\x1b[0m`);
              console.log(argv.nc ? `33mAlternate Name : ${response.data[0].altName}` : `\x1b[33mName\x1b[0m : \x1b[32m${response.data[0].altName}\x1b[0m`);
            } else {
              console.log(argv.nc ? `Name : ${response.data[0].name}` : `\x1b[33mName\x1b[0m : \x1b[32m${response.data[0].name}\x1b[0m`);
            }
          } else {
            console.log(argv.nc ? "Name : Unknown Name" : "\x1b[33mName\x1b[0m : \x1b[32mUnknown Name\x1b[0m");

          }
        } else {
          console.log(argv.nc ? "Name : Unknown Name" : "\x1b[33mName\x1b[0m : \x1b[32mUnknown Name\x1b[0m");
        }
      } else if (argv.n && argv.r && !argv.e) {
        if ("data" in response) {
          var data1 = response.data[0];
          if ("name" in data1) {
            console.log(response.data[0].name);
          } else {
            console.log("Unknown Name");
          }
        } else {
          console.log("Unknown Name");
        }
      } else if (!argv.n && !argv.r && argv.e) {

        try {
          console.log(argv.nc ? `Email : ${response.data[0].internetAddresses[0].id}` : `\x1b[33mEmail\x1b[0m : \x1b[32m${response.data[0].internetAddresses[0].id}\x1b[0m`);
        } catch (error) {
          console.log("\x1b[33mEmail\x1b[0m : \x1b[32mEmail not found\x1b[0m");
          console.log(argv.nc ? "Email : Email not found" : "\x1b[33mEmail\x1b[0m : \x1b[32mEmail not found\x1b[0m");

        }

      } else if (!argv.n && argv.r && argv.e) {

        try {
          console.log(response.data[0].internetAddresses[0].id);
        } catch (error) {
          console.log("Email not found");
        }

      } else {
        var cdata = convert.toPlainText(response, !argv.nc, true);
        console.log(cdata);
      }
    }

  } else if (!argv.s && argv.bs && !argv._.includes("login") && !argv.i) {
    // check if authkey exist or not
    if (!fs.existsSync(authkey)) {
      console.error("\x1b[33mERROR : Please login to your account.\x1b[0m");
      process.exit()
    }

    // read the file
    try {
      const data = fs.readFileSync(authkey, "utf8");
      var jsonAuthKey = JSON.parse(data);
    } catch (err) {
      console.error("\x1b[31mERROR : %s\x1b[0m", err.message);
      console.error("\x1b[33mERROR : Please login to your account.\x1b[0m");
      process.exit()
    }

    let countryCode = jsonAuthKey.phones[0].countryCode;
    let installationId = jsonAuthKey.installationId;
    var searchResult = await make_search.bulkSearch(
      argv.bs,
      countryCode,
      installationId
    );

    if (searchResult.data == "null") {
      console.error("\x1b[31mERROR : %s\x1b[0m", searchResult.errorResp);
      process.exit()
    }

    // const data = JSON.stringify(searchResult);
    if (argv.r) {
      console.log(!argv.nc ? colorize(JSON.stringify(searchResult)) : JSON.stringify(searchResult));
    } else {
      console.log(!argv.nc ? colorize(JSON.stringify(searchResult), { pretty: true }) : JSON.stringify(searchResult, null, 3));
    }


  } else if (!argv.s && !argv.bs && !argv._.includes("login") && argv.i) {
    // check if authkey exist or not
    if (!fs.existsSync(authkey)) {
      console.error("\x1b[33mERROR : Please login to your account.\x1b[0m");
      process.exit()
    }

    // read the file
    try {
      const data = fs.readFileSync(authkey, "utf8");
      var jsonAuthKey = JSON.parse(data);
    } catch (err) {
      console.error("\x1b[31mERROR : %s\x1b[0m", err.message);
      console.error("\x1b[33mERROR : Please login to your account.\x1b[0m");
      process.exit()
    }

    // let countryCode = jsonAuthKey.phones[0].countryCode;
    let installationId = jsonAuthKey.installationId;
    if (argv.r) {
      console.log(installationId);
    } else {
      console.log(argv.nc ? `Your InstallationId : ${installationId}` : `\x1b[33mYour InstallationId\x1b[0m : \x1b[32m${installationId}\x1b[0m`
      );
    }

  } else {
    yargs.showHelp();
  }
}

start_truecallerjs(argv, authkey, truecallerjs_auth_dir);
// console.log(argv)

