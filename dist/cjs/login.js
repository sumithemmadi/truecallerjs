"use strict";
// MIT License
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
exports.login = void 0;
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
const axios_1 = __importDefault(require("axios"));
const awesome_phonenumber_1 = require("awesome-phonenumber");
const phones_js_1 = require("./data/phones.js");
function generateRandomString(length) {
    let result = "";
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
/**
 * Login to Truecaller.
 *
 * @param {string} phoneNumber - Phone number in international format.
 * @returns {Promise<LoginResponse>} - Promise that resolves to the login response containing the requestId used for OTP verification.
 */
function login(phoneNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        const pn = (0, awesome_phonenumber_1.parsePhoneNumber)(phoneNumber);
        if (!(pn === null || pn === void 0 ? void 0 : pn.valid)) {
            throw new Error("Invalid phone number.");
        }
        const postUrl = "https://account-asia-south1.truecaller.com/v2/sendOnboardingOtp";
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
                    manufacturer: phones_js_1.device.manufacturer,
                    model: phones_js_1.device.model,
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
            url: postUrl,
            data,
        };
        const res = yield (0, axios_1.default)(options);
        return res.data;
    });
}
exports.login = login;
