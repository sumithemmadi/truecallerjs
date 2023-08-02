"use strict";
// MIT License
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkSearch = exports.search = void 0;
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
const xml2js_1 = require("xml2js");
const json_to_plain_text_1 = require("json-to-plain-text");
const json_to_pretty_yaml_1 = require("json-to-pretty-yaml");
const countries_js_1 = require("./data/countries.js");
class Format {
    constructor(data) {
        this.data = data;
    }
    json() {
        return this.data;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    xml(color = false) {
        const builder = new xml2js_1.Builder();
        const xml = builder.buildObject(JSON.parse(JSON.stringify(this.json())));
        return xml;
    }
    yaml(color = false) {
        return (0, json_to_pretty_yaml_1.stringify)(JSON.parse(JSON.stringify(this.json())), color);
    }
    text(color = false, space = false) {
        const options = {
            color: color,
            spacing: space,
            squareBracketsForArray: false,
            doubleQuotesForKeys: false,
            doubleQuotesForValues: false,
        };
        return (0, json_to_plain_text_1.jsonToPlainText)(JSON.parse(JSON.stringify(this.json())), options);
    }
    getName() {
        var _a, _b;
        return ((_b = (_a = this.json()) === null || _a === void 0 ? void 0 : _a.data[0]) === null || _b === void 0 ? void 0 : _b.name) || "unknown name";
    }
    getAlternateName() {
        var _a, _b;
        return ((_b = (_a = this.json()) === null || _a === void 0 ? void 0 : _a.data[0]) === null || _b === void 0 ? void 0 : _b.altName) || "no alternate name";
    }
    getAddresses() {
        var _a, _b;
        return ((_b = (_a = this.json()) === null || _a === void 0 ? void 0 : _a.data[0]) === null || _b === void 0 ? void 0 : _b.addresses) || [];
    }
    getEmailId() {
        var _a, _b, _c;
        const data = (_a = this.json()) === null || _a === void 0 ? void 0 : _a.data;
        if (data && data.length > 0) {
            const internetAddresses = (_b = data[0]) === null || _b === void 0 ? void 0 : _b.internetAddresses;
            if (internetAddresses && internetAddresses.length > 0) {
                const id = (_c = internetAddresses[0]) === null || _c === void 0 ? void 0 : _c.id;
                if (id) {
                    return id;
                }
            }
        }
        return "unknown email";
    }
    getCountryDetails() {
        var _a, _b, _c;
        const data = (_a = this.json()) === null || _a === void 0 ? void 0 : _a.data;
        if (data && data.length > 0) {
            const addresses = (_b = data[0]) === null || _b === void 0 ? void 0 : _b.addresses;
            if (addresses && addresses.length > 0) {
                const countryCode = (_c = addresses[0]) === null || _c === void 0 ? void 0 : _c.countryCode;
                if (countryCode) {
                    return countries_js_1.countries[countryCode];
                }
            }
        }
        return {
            name: "unknown",
            native: "unknwon",
            phone: [],
            continent: "unknwon",
            capital: "unknwon",
            currency: ["unknwon"],
            languages: ["unknwon"],
            flag: "🇦🇩",
            flagURL: "unknwon",
        };
    }
}
/**
 * Searching phone number on truecallerjs
 * @var response => {...}
 * @method response.json(color) JSON response.
 * @method response.xml(color)  XML output.
 * @method response.yaml(color) YAML output.
 * @method response.html(color) HTML output.
 * @method response.text(color,space) JSON response.
 * @method response.getName() => "Sumith Emmadi"
 * @method response.getAlternateName() => "sumith"
 * @method response.getAddresses() => {....}
 * @method response.getEmailId() => sumithemmadi244@gmail.com
 * @method response.getCountryDetails() => {...}
 * @name search
 * @function truecallerjs.search(search_data)
 * @return {Object} It contains details of the phone number
 */
function search(searchData) {
    var _a;
    const phoneNumber = (0, awesome_phonenumber_1.parsePhoneNumber)(searchData.number, {
        regionCode: searchData.countryCode,
    });
    const significantNumber = (_a = phoneNumber === null || phoneNumber === void 0 ? void 0 : phoneNumber.number) === null || _a === void 0 ? void 0 : _a.significant;
    return axios_1.default
        .get(`https://search5-noneu.truecaller.com/v2/search`, {
        params: {
            q: significantNumber,
            countryCode: phoneNumber.regionCode,
            type: 4,
            locAddr: "",
            placement: "SEARCHRESULTS,HISTORY,DETAILS",
            encoding: "json",
        },
        headers: {
            "content-type": "application/json; charset=UTF-8",
            "accept-encoding": "gzip",
            "user-agent": "Truecaller/11.75.5 (Android;10)",
            Authorization: `Bearer ${searchData.installationId}`,
        },
    })
        .then((response) => {
        // console.log(response);
        return new Format(response.data);
    }, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error) => {
        return new Format(error);
    });
}
exports.search = search;
/**
 * Bulk search on truecallerjs
 * @name bulkSearch
 * @function truecallerjs.bulkSearch(phoneNumbers,countryCode,installationId)
 * @param {String} phoneNumbers phone number separted with coma.
 * @param {String} installationId 6-digits OTP .
 * @return {Object} It contains phone numbers information in a array
 */
function bulkSearch(phoneNumbers, regionCode, installationId) {
    return axios_1.default
        .get(`https://search5-noneu.truecaller.com/v2/bulk`, {
        params: {
            q: phoneNumbers,
            countryCode: regionCode,
            type: 14,
            placement: "SEARCHRESULTS,HISTORY,DETAILS",
            encoding: "json",
        },
        headers: {
            "content-type": "application/json; charset=UTF-8",
            "accept-encoding": "gzip",
            "user-agent": "Truecaller/11.75.5 (Android;10)",
            Authorization: `Bearer ${installationId}`,
        },
    })
        .then((response) => {
        return response.data;
    }, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error) => {
        return JSON.parse(JSON.stringify(error));
    });
}
exports.bulkSearch = bulkSearch;
