#!/usr/bin/env node
"use strict";
/*
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
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const fs_1 = __importDefault(require("fs"));
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
const inquirer_1 = __importDefault(require("inquirer"));
const awesome_phonenumber_1 = require("awesome-phonenumber");
const os_1 = __importDefault(require("os"));
const login_js_1 = require("./login.js");
const verifyOtp_js_1 = require("./verifyOtp.js");
const search_js_1 = require("./search.js");
const json_colorizer_1 = __importDefault(require("json-colorizer"));
const homePath = os_1.default.homedir();
const truecallerjsAuthDirPath = path_1.default.join(homePath, ".config", "truecallerjs");
const requestFilePath = path_1.default.join(truecallerjsAuthDirPath, "request.json");
const authKeyFilePath = path_1.default.join(truecallerjsAuthDirPath, "authkey.json");
const runCLI = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g;
    const args = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
        .usage("Usage: \n$0  login (Login to truecaller).\n$0 -s [number] (command to search a number).")
        .option("search", {
        alias: "s",
        description: "To search caller name and related information of a number",
    })
        .option("raw", {
        alias: "r",
        description: "Print's raw output",
        type: "boolean",
    })
        .option("bulksearch", {
        alias: "bs",
        description: "Make a bulk number search",
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
        .option("verbose", {
        alias: "v",
        description: "Show additional information",
        type: "count",
    })
        .help()
        .alias("help", "h")
        .parseSync();
    if (args._.includes("login") && !args.s && !args.bs) {
        // Create the auth directory for truecallerjs if it doesn't exist
        if (!fs_1.default.existsSync(truecallerjsAuthDirPath)) {
            try {
                fs_1.default.mkdirSync(truecallerjsAuthDirPath, { recursive: true });
            }
            catch (error) {
                console.log(error);
                process.exit(1);
            }
        }
        // Starts here
        if (args._[0] === "login" && args._.length <= 2) {
            console.log(chalk_1.default.yellow.bold("Login\n\n Enter mobile number in International Format\n Example : ") +
                chalk_1.default.magenta("+919912345678") +
                ".\n");
            const inputNumber = yield inquirer_1.default.prompt({
                type: "input",
                name: "phonenumber",
                message: "Enter your phone number :",
                validate: (input) => __awaiter(void 0, void 0, void 0, function* () {
                    var _h, _j;
                    const check = (0, awesome_phonenumber_1.parsePhoneNumber)(input);
                    if (input !== ((_j = (_h = check === null || check === void 0 ? void 0 : check.number) === null || _h === void 0 ? void 0 : _h.e164) !== null && _j !== void 0 ? _j : "")) {
                        return "Enter a valid phone number in International Format";
                    }
                    if (!(check === null || check === void 0 ? void 0 : check.valid)) {
                        return "Invalid Phone Number";
                    }
                    return true;
                }),
            });
            const pn = (0, awesome_phonenumber_1.parsePhoneNumber)(inputNumber.phonenumber);
            let response;
            let new_req = true;
            if (fs_1.default.existsSync(requestFilePath)) {
                const fileData = JSON.parse(fs_1.default.readFileSync(requestFilePath, "utf8"));
                if ("parsedPhoneNumber" in fileData &&
                    `+${fileData.parsedPhoneNumber}` == ((_a = pn === null || pn === void 0 ? void 0 : pn.number) === null || _a === void 0 ? void 0 : _a.e164)) {
                    console.log(chalk_1.default.magenta("\nPrevious request was found for this mobile number.\n"));
                    const x = yield inquirer_1.default.prompt({
                        type: "confirm",
                        name: "status",
                        message: "Do you want to enter previous OTP ",
                    });
                    if (x.status) {
                        new_req = false;
                        response = fileData;
                    }
                }
            }
            if (new_req) {
                response = yield (0, login_js_1.login)(String((_b = pn === null || pn === void 0 ? void 0 : pn.number) === null || _b === void 0 ? void 0 : _b.e164));
                console.log(chalk_1.default.yellow(`Sending OTP to ${chalk_1.default.green((_d = (_c = pn === null || pn === void 0 ? void 0 : pn.number) === null || _c === void 0 ? void 0 : _c.e164) !== null && _d !== void 0 ? _d : "")}.`));
            }
            if (response.status == 1 ||
                response.status == 9 ||
                response.message == "Sent") {
                // Otp sent
                try {
                    fs_1.default.writeFileSync(requestFilePath, JSON.stringify(response, null, 4));
                    if (new_req) {
                        console.log(chalk_1.default.green("OTP sent successfully."));
                    }
                    const token = yield inquirer_1.default.prompt({
                        type: "input",
                        name: "otp",
                        message: "Enter Received OTP:",
                        validate: (input) => __awaiter(void 0, void 0, void 0, function* () {
                            const isnum = /^\d+$/.test(String(input));
                            if (input.length !== 6 || !isnum) {
                                return "Enter a valid 6-digit OTP.";
                            }
                            return true;
                        }),
                    });
                    const response1 = yield (0, verifyOtp_js_1.verifyOtp)(String((_e = pn === null || pn === void 0 ? void 0 : pn.number) === null || _e === void 0 ? void 0 : _e.e164), response, token.otp);
                    if (response1.status === 2 && !response1.suspended) {
                        console.log(chalk_1.default.yellow.bold("Your installationId: ") +
                            chalk_1.default.green(response1.installationId));
                        console.log(`This is the installationId: ${chalk_1.default.green(response1.installationId)} used to authenticate with Truecaller.`);
                        // Save the file
                        fs_1.default.writeFileSync(authKeyFilePath, JSON.stringify(response1, null, 3));
                        console.log(chalk_1.default.green("Logged in successfully."));
                        fs_1.default.unlinkSync(requestFilePath);
                    }
                    else if (response1.status === 11) {
                        console.log(chalk_1.default.red("! Invalid OTP"));
                        console.log(`OTP not valid. Enter the 6-digit OTP received on ${(_f = pn === null || pn === void 0 ? void 0 : pn.number) === null || _f === void 0 ? void 0 : _f.e164}.`);
                    }
                    else if (response1.status === 7) {
                        console.log(chalk_1.default.red("Retries limit exceeded"));
                        console.log(`Retries on secret code reached for ${(_g = pn === null || pn === void 0 ? void 0 : pn.number) === null || _g === void 0 ? void 0 : _g.e164}.`);
                    }
                    else if (response1.suspended) {
                        console.log(chalk_1.default.red("Oops... Your account is suspended."));
                        console.log("Your account has been suspended by Truecaller.");
                    }
                    else if ("message" in response1) {
                        console.log(chalk_1.default.red(response1.message));
                    }
                    else {
                        console.log(JSON.stringify(response1, null, 4));
                    }
                }
                catch (error) {
                    if (error instanceof Error) {
                        console.log(chalk_1.default.red(error.message));
                    }
                    else {
                        console.log(chalk_1.default.red("An error occurred."));
                    }
                    process.exit(1);
                }
            }
            else if (response.status == 6 || response.status == 5) {
                if (fs_1.default.existsSync(requestFilePath)) {
                    fs_1.default.unlinkSync(requestFilePath);
                }
                console.log(chalk_1.default.red("You have exceeded the limit of verification attempts.\nPlease try again after some time."));
            }
            else {
                console.log(chalk_1.default.red(response.message));
            }
        }
    }
    else if (args.s && !args.bs && !args._.includes("login") && !args.i) {
        if (!fs_1.default.existsSync(authKeyFilePath)) {
            console.error(chalk_1.default.magenta.bold("Please login to your account."));
            process.exit();
        }
        try {
            const data = fs_1.default.readFileSync(authKeyFilePath, "utf8");
            const jsonAuthKey = JSON.parse(data);
            const countryCode = jsonAuthKey.phones[0].countryCode;
            const installationId = jsonAuthKey.installationId;
            const search_result = yield (0, search_js_1.search)({
                number: String(args.s),
                countryCode,
                installationId,
            });
            if (args.json || args.xml || args.text || args.yaml) {
                if (args.json && !args.xml && !args.text && !args.yaml) {
                    if (args.r) {
                        console.log(!args.nc
                            ? (0, json_colorizer_1.default)(JSON.stringify(search_result.json()), {
                                colors: {
                                    STRING_KEY: "blue",
                                    STRING_LITERAL: "green",
                                    NUMBER_LITERAL: "magenta",
                                },
                            })
                            : JSON.stringify(search_result.json()));
                    }
                    else {
                        console.log(!args.nc
                            ? (0, json_colorizer_1.default)(JSON.stringify(search_result.json()), {
                                pretty: true,
                                colors: {
                                    STRING_KEY: "blue",
                                    STRING_LITERAL: "green",
                                    NUMBER_LITERAL: "magenta",
                                },
                            })
                            : JSON.stringify(search_result.json(), null, 2));
                    }
                }
                else if (args.xml && !args.json && !args.text && !args.yaml) {
                    console.log(search_result.xml(!args.nc));
                }
                else if (args.yaml && !args.xml && !args.text && !args.json) {
                    console.log(search_result.yaml(!args.nc));
                }
                else {
                    console.log(search_result.text(!args.nc, true));
                }
            }
            else {
                if (args.n && !args.r && !args.e) {
                    console.log(chalk_1.default.blue.bold("Name"), " : ", chalk_1.default.green(search_result.getName()));
                }
                else if (args.n && args.r && !args.e) {
                    console.log(search_result.getName());
                }
                else if (!args.n && !args.r && args.e) {
                    console.log(chalk_1.default.blue.bold("Email"), " : ", chalk_1.default.green(search_result.getEmailId()));
                }
                else if (!args.n && args.r && args.e) {
                    console.log(search_result.getEmailId());
                }
                else {
                    console.log(search_result.text(!args.nc, true));
                }
            }
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(chalk_1.default.red(error.message));
            }
            else {
                console.log(chalk_1.default.red("An error occurred."));
            }
            process.exit(1);
        }
    }
    else if (args.bs && !args._.includes("login") && !args.i) {
        if (!fs_1.default.existsSync(authKeyFilePath)) {
            console.error(chalk_1.default.magenta.bold("Please login to your account."));
            process.exit(1);
        }
        try {
            const data = fs_1.default.readFileSync(authKeyFilePath, "utf8");
            const jsonAuthKey = JSON.parse(data);
            const countryCode = jsonAuthKey.phones[0].countryCode;
            const installationId = jsonAuthKey.installationId;
            const searchResult = yield (0, search_js_1.bulkSearch)(String(args === null || args === void 0 ? void 0 : args.bs), countryCode, installationId);
            if (args.r) {
                console.log(!args.nc
                    ? (0, json_colorizer_1.default)(JSON.stringify(searchResult), {
                        colors: {
                            STRING_KEY: "blue",
                            STRING_LITERAL: "green",
                            NUMBER_LITERAL: "magenta",
                        },
                    })
                    : JSON.stringify(searchResult));
            }
            else {
                console.log(!args.nc
                    ? (0, json_colorizer_1.default)(JSON.stringify(searchResult), {
                        pretty: true,
                        colors: {
                            STRING_KEY: "blue",
                            STRING_LITERAL: "green",
                            NUMBER_LITERAL: "magenta",
                        },
                    })
                    : JSON.stringify(searchResult, null, 2));
            }
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(chalk_1.default.red(error.message));
            }
            else {
                console.log(chalk_1.default.red("An error occurred."));
            }
            process.exit(1);
        }
    }
    else if (args.i && !args.s) {
        if (!fs_1.default.existsSync(authKeyFilePath)) {
            console.error(chalk_1.default.magenta.bold("Please login to your account."));
            process.exit(1);
        }
        try {
            const data = fs_1.default.readFileSync(authKeyFilePath, "utf8");
            const jsonAuthKey = JSON.parse(data);
            // let countryCode = jsonAuthKey.phones[0].countryCode;
            const installationId = jsonAuthKey.installationId;
            if (args.r) {
                console.log(installationId);
            }
            else {
                args.nc
                    ? console.log("Your InstallationId : " + installationId)
                    : console.log(chalk_1.default.blue.bold("Your InstallationId") +
                        " : " +
                        chalk_1.default.green(installationId));
            }
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(chalk_1.default.red(error.message));
            }
            else {
                console.log(chalk_1.default.red("An error occurred."));
            }
            process.exit(1);
        }
    }
    else {
        console.log(`Usage:
${chalk_1.default.green("truecallerjs")} login (Login to truecaller).
${chalk_1.default.green("truecallerjs")} -s [number] (command to search a number).

Options:
      --version           Show version number                          [boolean]
  -s, --search            To search caller name and related information of a num
                          ber
  -r, --raw               Print's raw output                           [boolean]
      --bulksearch, --bs  Make a bulk number search
  -n, --name              Print's user name of phone number            [boolean]
  -e, --email             Print's email assigned to the phonenumber    [boolean]
      --json              print's  output in json                      [boolean]
      --xml               print's  output in XML                       [boolean]
      --yaml              Print's  output in YAML                      [boolean]
      --text              Print's  output as plain text(TXT)           [boolean]
      --nc, --no_color    Print without color                          [boolean]
  -i, --installationid    shows your InstallationId                    [boolean]
  -v, --verbose           Show additional information                    [count]
  -h, --help              Show help                                    [boolean]

  Repository => https://github.com/sumithemmadi/truecallerjs
  `);
    }
});
runCLI();
