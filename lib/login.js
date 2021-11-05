

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



const axios        = require("axios");
const PhoneNumber  = require("awesome-phonenumber");
const rawdata      = require('../src/phonesList.json');

const axiosConfig = axios.create({
        headers: {
            "content-type": "application/json; charset=UTF-8",
            "accept-encoding": "gzip",
            "user-agent": "Truecaller/11.75.5 (Android;10)",
            clientsecret: "lvc22mp3l1sfv6ujg83rd17btt"
        }
    });



function userLogin(inputNumber,regionCode,internationalNumber) {
    console.log("Sending OTP to".yellow, internationalNumber.yellow);
    let pn = PhoneNumber(inputNumber.toString(), regionCode);

    let params = {
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
    };

    return axiosConfig
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

function verifyOtp(phoneNumber, countryCode, dialingCode, requestId, token) {
    const postData = {
        countryCode,
        dialingCode,
        phoneNumber,
        requestId,
        token
    };
    return axiosConfig.post(`https://account-asia-south1.truecaller.com/v1/verifyOnboardingOtp`, postData).then(
        (response) => {
            return response.data;
        }, (err) => {
            return err.response.data;
        });
}

module.exports.userLogin = userLogin
module.exports.verifyOtp = verifyOtp
