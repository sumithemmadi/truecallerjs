#!/usr/bin/env node
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
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import fs from "fs";
import chalk from "chalk";
import path from "path";
import inquirer from "inquirer";
import { parsePhoneNumber } from "awesome-phonenumber";
import os from "os";
import { login } from "./login.js";
import { verifyOtp } from "./verifyOtp.js";
import { search, bulkSearch } from "./search.js";
import colorizeJson from "json-colorizer";
const homePath = os.homedir();
const truecallerjsAuthDirPath = path.join(homePath, ".config", "truecallerjs");
const requestFilePath = path.join(truecallerjsAuthDirPath, "request.json");
const authKeyFilePath = path.join(truecallerjsAuthDirPath, "authkey.json");
const runCLI = async () => {
    const args = yargs(hideBin(process.argv))
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
        if (!fs.existsSync(truecallerjsAuthDirPath)) {
            try {
                fs.mkdirSync(truecallerjsAuthDirPath, { recursive: true });
            }
            catch (error) {
                console.log(error);
                process.exit(1);
            }
        }
        // Starts here
        if (args._[0] === "login" && args._.length <= 2) {
            console.log(chalk.yellow.bold("Login\n\n Enter mobile number in International Format\n Example : ") +
                chalk.magenta("+919912345678") +
                ".\n");
            const inputNumber = await inquirer.prompt({
                type: "input",
                name: "phonenumber",
                message: "Enter your phone number :",
                validate: async (input) => {
                    const check = parsePhoneNumber(input);
                    if (input !== (check?.number?.e164 ?? "")) {
                        return "Enter a valid phone number in International Format";
                    }
                    if (!check?.valid) {
                        return "Invalid Phone Number";
                    }
                    return true;
                },
            });
            const pn = parsePhoneNumber(inputNumber.phonenumber);
            let response;
            let new_req = true;
            if (fs.existsSync(requestFilePath)) {
                const fileData = JSON.parse(fs.readFileSync(requestFilePath, "utf8"));
                if ("parsedPhoneNumber" in fileData &&
                    `+${fileData.parsedPhoneNumber}` == pn?.number?.e164) {
                    console.log(chalk.magenta("\nPrevious request was found for this mobile number.\n"));
                    const x = await inquirer.prompt({
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
                response = await login(String(pn?.number?.e164));
                console.log(chalk.yellow(`Sending OTP to ${chalk.green(pn?.number?.e164 ?? "")}.`));
            }
            if (response.status == 1 ||
                response.status == 9 ||
                response.message == "Sent") {
                // Otp sent
                try {
                    fs.writeFileSync(requestFilePath, JSON.stringify(response, null, 4));
                    if (new_req) {
                        console.log(chalk.green("OTP sent successfully."));
                    }
                    const token = await inquirer.prompt({
                        type: "input",
                        name: "otp",
                        message: "Enter Received OTP:",
                        validate: async (input) => {
                            const isnum = /^\d+$/.test(String(input));
                            if (input.length !== 6 || !isnum) {
                                return "Enter a valid 6-digit OTP.";
                            }
                            return true;
                        },
                    });
                    const response1 = await verifyOtp(String(pn?.number?.e164), response, token.otp);
                    if (response1.status === 2 && !response1.suspended) {
                        console.log(chalk.yellow.bold("Your installationId: ") +
                            chalk.green(response1.installationId));
                        console.log(`This is the installationId: ${chalk.green(response1.installationId)} used to authenticate with Truecaller.`);
                        // Save the file
                        fs.writeFileSync(authKeyFilePath, JSON.stringify(response1, null, 3));
                        console.log(chalk.green("Logged in successfully."));
                        fs.unlinkSync(requestFilePath);
                    }
                    else if (response1.status === 11) {
                        console.log(chalk.red("! Invalid OTP"));
                        console.log(`OTP not valid. Enter the 6-digit OTP received on ${pn?.number?.e164}.`);
                    }
                    else if (response1.status === 7) {
                        console.log(chalk.red("Retries limit exceeded"));
                        console.log(`Retries on secret code reached for ${pn?.number?.e164}.`);
                    }
                    else if (response1.suspended) {
                        console.log(chalk.red("Oops... Your account is suspended."));
                        console.log("Your account has been suspended by Truecaller.");
                    }
                    else if ("message" in response1) {
                        console.log(chalk.red(response1.message));
                    }
                    else {
                        console.log(JSON.stringify(response1, null, 4));
                    }
                }
                catch (error) {
                    if (error instanceof Error) {
                        console.log(chalk.red(error.message));
                    }
                    else {
                        console.log(chalk.red("An error occurred."));
                    }
                    process.exit(1);
                }
            }
            else if (response.status == 6 || response.status == 5) {
                if (fs.existsSync(requestFilePath)) {
                    fs.unlinkSync(requestFilePath);
                }
                console.log(chalk.red("You have exceeded the limit of verification attempts.\nPlease try again after some time."));
            }
            else {
                console.log(chalk.red(response.message));
            }
        }
    }
    else if (args.s && !args.bs && !args._.includes("login") && !args.i) {
        if (!fs.existsSync(authKeyFilePath)) {
            console.error(chalk.magenta.bold("Please login to your account."));
            process.exit();
        }
        try {
            const data = fs.readFileSync(authKeyFilePath, "utf8");
            const jsonAuthKey = JSON.parse(data);
            const countryCode = jsonAuthKey.phones[0].countryCode;
            const installationId = jsonAuthKey.installationId;
            const search_result = await search({
                number: String(args.s),
                countryCode,
                installationId,
            });
            if (args.json || args.xml || args.text || args.yaml) {
                if (args.json && !args.xml && !args.text && !args.yaml) {
                    if (args.r) {
                        console.log(!args.nc
                            ? colorizeJson(JSON.stringify(search_result.json()), {
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
                            ? colorizeJson(JSON.stringify(search_result.json()), {
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
                    console.log(chalk.blue.bold("Name"), " : ", chalk.green(search_result.getName()));
                }
                else if (args.n && args.r && !args.e) {
                    console.log(search_result.getName());
                }
                else if (!args.n && !args.r && args.e) {
                    console.log(chalk.blue.bold("Email"), " : ", chalk.green(search_result.getEmailId()));
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
                console.log(chalk.red(error.message));
            }
            else {
                console.log(chalk.red("An error occurred."));
            }
            process.exit(1);
        }
    }
    else if (args.bs && !args._.includes("login") && !args.i) {
        if (!fs.existsSync(authKeyFilePath)) {
            console.error(chalk.magenta.bold("Please login to your account."));
            process.exit(1);
        }
        try {
            const data = fs.readFileSync(authKeyFilePath, "utf8");
            const jsonAuthKey = JSON.parse(data);
            const countryCode = jsonAuthKey.phones[0].countryCode;
            const installationId = jsonAuthKey.installationId;
            const searchResult = await bulkSearch(String(args?.bs), countryCode, installationId);
            if (args.r) {
                console.log(!args.nc
                    ? colorizeJson(JSON.stringify(searchResult), {
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
                    ? colorizeJson(JSON.stringify(searchResult), {
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
                console.log(chalk.red(error.message));
            }
            else {
                console.log(chalk.red("An error occurred."));
            }
            process.exit(1);
        }
    }
    else if (args.i && !args.s) {
        if (!fs.existsSync(authKeyFilePath)) {
            console.error(chalk.magenta.bold("Please login to your account."));
            process.exit(1);
        }
        try {
            const data = fs.readFileSync(authKeyFilePath, "utf8");
            const jsonAuthKey = JSON.parse(data);
            // let countryCode = jsonAuthKey.phones[0].countryCode;
            const installationId = jsonAuthKey.installationId;
            if (args.r) {
                console.log(installationId);
            }
            else {
                args.nc
                    ? console.log("Your InstallationId : " + installationId)
                    : console.log(chalk.blue.bold("Your InstallationId") +
                        " : " +
                        chalk.green(installationId));
            }
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(chalk.red(error.message));
            }
            else {
                console.log(chalk.red("An error occurred."));
            }
            process.exit(1);
        }
    }
    else {
        console.log(`Usage:
${chalk.green("truecallerjs")} login (Login to truecaller).
${chalk.green("truecallerjs")} -s [number] (command to search a number).

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
};
runCLI();
