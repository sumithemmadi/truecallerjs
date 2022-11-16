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
var readlineSync = require("readline-sync");
const axios = require("axios").default;
const truecallerjs = require("../lib/main");
const rawdata = require("../src/phonesList.json");
const path = require("path");
const fs = require("fs");

const authkey = path.join(
  process.env.HOME || process.env.HOMEPATH,
  "/.config/truecallerjs",
  "authkey.json"
);

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
  .option("json", {
    description: "print's  output in json",
    type: "boolean",
  })
  .option("xml", {
    description: "print's  output in XML",
    type: "boolean",
  })
  .option("yaml", {
    description: "Print's  output in YAML",
    type: "boolean",
  })
  .option("text", {
    description: "Print's  output as plain text(TXT)",
    type: "boolean",
  })
  .option("html", {
    description: "Print's html table",
    type: "boolean",
  })
  .option("installationid", {
    alias: "i",
    description: "shows your InstallationId",
    type: "boolean",
  })
  .help()
  .alias("help", "h").argv;

// function to Read file contains of authkey.json file
function read_file(file) {
  try {
    const data = fs.readFileSync(file, "utf8");
    return JSON.parse(data);
  } catch (err) {
    var error = {
      status: false,
      responseStatus: "error",
      data: "null",
    };
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

function getEmailId(response) {
  // console.log(response)
  try {
    return `\x1b[33mEmail\x1b[0m : \x1b[32m${response.data[0].internetAddresses[0].id}\x1b[0m`;
  } catch (error) {
    return "\x1b[33mEmail\x1b[0m : \x1b[32mEmail not found\x1b[0m";
  }
}

function getRawEmailId(response) {
  try {
    return response.data[0].internetAddresses[0].id;
  } catch (error) {
    return "Email not found";
  }
}

async function verify_otp(requestId, pn, token) {
  const postData = {
    countryCode: pn.getRegionCode(),
    dialingCode: pn.getCountryCode(),
    phoneNumber: pn.getNumber("significant"),
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
  var response = await axios(options2);
  return response.data;
}

async function send_otp(pn) {
  try {
    const data = {
      countryCode: pn.getRegionCode(),
      dialingCode: pn.getCountryCode(),
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
            rawdata[Math.floor(Math.random() * rawdata.length)].manufacturer,
          model: rawdata[Math.floor(Math.random() * rawdata.length)].model,
          osName: "Android",
          osVersion: "10",
          mobileServices: ["GMS"],
        },
        language: "en",
      },
      phoneNumber: pn.getNumber("significant"),
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

    console.log(`\x1b[33mSending OTP to ${pn.getNumber("e164")}\x1b[0m`);
    var res = await axios(options);
    if (
      res.data.status == 1 ||
      res.data.status == 9 ||
      res.data.message == "Sent"
    ) {
      const reqFile = path.join(
        process.env.HOME || process.env.HOMEPATH,
        "/.config/truecallerjs",
        "request.json"
      );
      fs.writeFileSync(reqFile, JSON.stringify(res.data, null, 4), (err) => {
        if (err) {
          console.log("\x1b[31m%s\x1b[0m", err.message);
          process.exit();
        }
      });
      console.log("\x1b[32m%s\x1b[0m", "Otp sent successfully ");
    }
    return res.data;
  } catch (error) {
    console.error(error.message);
    process.exit();
  }
}

async function check_and_save(reqFile, requestResponse) {
  // console.log(requestResponse)
  try {
    if (
      (requestResponse.status == 2 && !requestResponse.suspended) ||
      "installationId" in requestResponse
    ) {
      console.log(
        `\x1b[33mYour installationId\x1b[0m : \x1b[32m${requestResponse.installationId}\x1b[0m`
      );
      fs.writeFileSync(
        authkey,
        JSON.stringify(requestResponse, null, 4),
        (err) => {
          if (err) {
            console.log("\x1b[31m%s\x1b[0m", err.message);
            process.exit();
          }
        }
      );
      console.log("\x1b[32m%s\x1b[0m", "Logged in successfully.");
      try {
        fs.unlinkSync(reqFile);
      } catch (err) {
        console.error(err);
        process.exit();
      }
    } else if (requestResponse.status == 11) {
      console.log("\x1b[31m%s\x1b[0m", "! Invalid OTP ");
    } else if (requestResponse.suspended) {
      console.log("\x1b[31m%s\x1b[0m", "Oops... Your account is suspended.");
    } else if ("message" in requestResponse) {
      console.log(requestResponse.message);
    } else {
      console.log(JSON.stringify(requestResponse));
    }
  } catch (error) {
    console.error(error);
    process.exit();
  }
}

async function start_truecallerjs(argv, authkey) {
  if (argv._.includes("login") && argv._[0] == "login" && argv._.length == 1) {
    var dir = path.join(
      process.env.HOME || process.env.HOMEPATH,
      "/.config/truecallerjs"
    );

    if (!fs.existsSync(dir)) {
      try {
        fs.mkdirSync(dir, { recursive: true });
      } catch (error) {
        console.log(error.message);
        process.exit();
      }
    }

    // Login
    console.log(
      "\x1b[33m%s\x1b[0m",
      "Login\n\n Enter mobile number in International Format\n Example : +919912345678.\n"
    );
    var inputNumber = readlineSync.question("Enter Mobile Number : ");
    var pn = PhoneNumber(inputNumber.toString());
    if (inputNumber != pn.getNumber("e164")) {
      console.error(
        "\x1b[31m%s\x1b[0m",
        "Enter valid phone number in International Format"
      );
      process.exit();
    }
    if (!pn.isValid()) {
      console.error("\x1b[31m%s\x1b[0m", "Invalid phone number");
      process.exit();
    }

    const reqFile = path.join(
      process.env.HOME || process.env.HOMEPATH,
      "/.config/truecallerjs",
      "request.json"
    );

    if (!fs.existsSync(reqFile)) {
      var req_data = await send_otp(pn);
    } else {
      var req_data = read_file(reqFile);
      if (req_data.status == false) {
        console.log("\x1b[31mSomthing when wrong\x1b[0m");
        try {
          fs.unlinkSync(reqFile);
        } catch (err) {
          console.error(err);
          process.exit();
        }
        process.exit();
      } else {
        if (
          "parsedPhoneNumber" in req_data &&
          `+${req_data.parsedPhoneNumber}` == pn.getNumber("e164")
        ) {
          console.log(
            "\n\nPrevious request was found for this mobile number.\n"
          );
          var x = readlineSync.question(
            "Do you want to enter previous OTP (y/n): "
          );
          var x_status = true;
          while (x_status) {
            if (x.toString() == "y" || x.toString() == "yes") {
              var x_status = false;
            } else if (x.toString() == "n" || x.toString() == "no") {
              try {
                fs.unlinkSync(reqFile);
              } catch (err) {
                console.error(err);
                process.exit();
              }
              var req_data = await send_otp(pn);
              var x_status = false;
            } else {
              console.log("\n\nEnter 'y' for yes and 'n' for no\n");
              var x = readlineSync.question(
                "Do you want to enter previous OTP (y/n): "
              );
            }
          }
        } else {
          try {
            fs.unlinkSync(reqFile);
          } catch (err) {
            console.error(err);
            process.exit();
          }
          var req_data = await send_otp(pn);
        }
      }
    }

    // console.log(req_data)
    // process.exit()
    if (
      req_data.status == 1 ||
      req_data.status == 9 ||
      req_data.message == "Sent"
    ) {
      const token = readlineSync.question("Enter Received OTP: ");
      var req_data2 = await verify_otp(req_data.requestId, pn, token);
      check_and_save(reqFile, req_data2);
    } else if (req_data.status == 6 || req_data.status == 5) {
      if (fs.existsSync(reqFile)) {
        try {
          fs.unlinkSync(reqFile);
        } catch (err) {
          console.error(err);
          process.exit();
        }
      }
      console.log(
        "\x1b[31m%s\x1b[0m",
        "You have exceeded the limit of verification attempts.\nPlease try again after some time."
      );
    } else {
      console.log("\x1b[31m%s\x1b[0m", req_data.message);
    }
  } else if (
    argv._.includes("login") &&
    argv._[0] == "login" &&
    argv._.length == 2
  ) {
    var dir = path.join(
      process.env.HOME || process.env.HOMEPATH,
      "/.config/truecallerjs"
    );

    // Check whether '.truecallerjs' folder exist or not.
    if (!fs.existsSync(dir)) {
      try {
        fs.mkdirSync(dir, { recursive: true });
      } catch (error) {
        console.log(error.message);
        process.exit();
      }
    }

    try {
      const data = fs.readFileSync(argv._[1], "utf8");

      const fileData = JSON.parse(data);
      // console.log(fileData);

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

      console.log(
        `\x1b[33mYour installationId\x1b[0m : \x1b[32m${fileData.account.installations[0].installation.id}\x1b[0m`
      );
      fs.writeFileSync(authkey, JSON.stringify(installationIdJSON, null, 4));
      console.log("\x1b[32m%s\x1b[0m", "Logged in successfully.");
    } catch (err) {
      console.error(err);
    }
  } else if (argv.s && !argv._.includes("login") && !argv.i) {
    var jsonAuthKey = read_file(authkey);
    if (jsonAuthKey.status == false) {
      console.log("\x1b[33mPlease login to your account.\x1b[0m");
    } else {
      var countryCode = jsonAuthKey.phones[0].countryCode;
      var installationId = jsonAuthKey.installationId;
      if (argv.json || argv.html || argv.xml || argv.text || argv.yaml) {
        if (argv.json && !argv.html && !argv.xml && !argv.text && !argv.yaml) {
          var searchData = {
            number: argv.s,
            countryCode,
            installationId,
            output: "JSON",
          };
        } else if (
          argv.xml &&
          !argv.html &&
          !argv.json &&
          !argv.text &&
          !argv.yaml
        ) {
          var searchData = {
            number: argv.s,
            countryCode,
            installationId,
            output: "XML",
          };
        } else if (
          argv.yaml &&
          !argv.html &&
          !argv.xml &&
          !argv.text &&
          !argv.json
        ) {
          var searchData = {
            number: argv.s,
            countryCode,
            installationId,
            output: "YAML",
          };
        } else if (
          argv.text &&
          !argv.html &&
          !argv.yaml &&
          !argv.xml &&
          !argv.json
        ) {
          var searchData = {
            number: argv.s,
            countryCode,
            installationId,
            output: "TEXT",
          };
        } else if (
          argv.html &&
          !argv.yaml &&
          !argv.xml &&
          !argv.text &&
          !argv.json
        ) {
          var searchData = {
            number: argv.s,
            countryCode,
            installationId,
            output: "HTML",
          };
        } else {
          console.error("Use any one format");
          process.exit();
        }
        const searchResult = await truecallerjs.searchNumber(searchData);
        console.log(searchResult);
      } else {
        var searchData = {
          number: argv.s,
          countryCode,
          installationId,
        };
        // console.log(searchData)
        const response = await truecallerjs.searchNumber(searchData);
        if (response == '""') {
          console.log("\x1b[31m%s\x1b[0m", "Error in input");
        } else if (argv.r && !argv.n && !argv.e) {
          console.log(JSON.stringify(response));
        } else if (argv.n && !argv.r && !argv.e) {
          if ("data" in response) {
            var data1 = response.data[0];
            if ("name" in data1) {
              if ("altName" in data1) {
                console.log(
                  `\x1b[33mName\x1b[0m : \x1b[32m${response.data[0].name}\x1b[0m`
                );
                console.log(
                  `\x1b[33mAlternate Name\x1b[0m : \x1b[32m${response.data[0].altName}\x1b[0m`
                );
              } else {
                console.log(
                  `\x1b[33mName\x1b[0m : \x1b[32m${response.data[0].name}\x1b[0m`
                );
              }
            } else {
              console.log("\x1b[33mName\x1b[0m : \x1b[32mUnknown Name\x1b[0m");
            }
          } else {
            console.log("\x1b[33mName\x1b[0m : \x1b[32mUnknown Name\x1b[0m");
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
          var emailID = getEmailId(response);
          console.log(emailID);
        } else if (!argv.n && argv.r && argv.e) {
          var emailID = getRawEmailId(response).replace();
          console.log(emailID);
        } else {
          const data = JSON.stringify(response, null, 2);
          console.log(data);
        }
      }
    }
  } else if (argv.bs && !argv._.includes("login") && !argv.i) {
    // get file contains of authkey.json
    let jsonAuthKey = read_file(authkey);
    if (jsonAuthKey.status == false) {
      console.log("\x1b[33mPlease login to your account.\x1b[0m");
    } else {
      let countryCode = jsonAuthKey.phones[0].countryCode;
      let installationId = jsonAuthKey.installationId;
      var searchResult = await truecallerjs.bulkSearch(
        argv.bs,
        countryCode,
        installationId
      );
      const data = JSON.stringify(searchResult, null, 2);
      console.log(data);
    }
  } else if (argv.i && !argv.s) {
    let jsonAuthKey = read_file(authkey);
    if (jsonAuthKey.status == false) {
      console.log("\x1b[33mPlease login to your account.\x1b[0m");
    } else {
      // let countryCode = jsonAuthKey.phones[0].countryCode;
      let installationId = jsonAuthKey.installationId;
      if (argv.r) {
        console.log(installationId);
      } else {
        console.log(
          `\x1b[33mYour InstallationId\x1b[0m : \x1b[32m${installationId}\x1b[0m`
        );
      }
    }
  } else {
    yargs.showHelp();
  }
}
start_truecallerjs(argv, authkey);
