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
import axios from "axios";
import { parsePhoneNumber } from "awesome-phonenumber";
import { Builder } from "xml2js";
import { jsonToPlainText } from "json-to-plain-text";
import { stringify as yamlStringify } from "json-to-pretty-yaml";
import { countries } from "./data/countries.js";
class Format {
    data;
    constructor(data) {
        this.data = data;
    }
    json() {
        return this.data;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    xml(color = false) {
        const builder = new Builder();
        const xml = builder.buildObject(JSON.parse(JSON.stringify(this.json())));
        return xml;
    }
    yaml(color = false) {
        return yamlStringify(JSON.parse(JSON.stringify(this.json())), color);
    }
    text(color = false, space = false) {
        const options = {
            color: color,
            spacing: space,
            squareBracketsForArray: false,
            doubleQuotesForKeys: false,
            doubleQuotesForValues: false,
        };
        return jsonToPlainText(JSON.parse(JSON.stringify(this.json())), options);
    }
    getName() {
        return this.json()?.data[0]?.name || "unknown name";
    }
    getAlternateName() {
        return this.json()?.data[0]?.altName || "no alternate name";
    }
    getAddresses() {
        return this.json()?.data[0]?.addresses || [];
    }
    getEmailId() {
        const data = this.json()?.data;
        if (data && data.length > 0) {
            const internetAddresses = data[0]?.internetAddresses;
            if (internetAddresses && internetAddresses.length > 0) {
                const id = internetAddresses[0]?.id;
                if (id) {
                    return id;
                }
            }
        }
        return "unknown email";
    }
    getCountryDetails() {
        const data = this.json()?.data;
        if (data && data.length > 0) {
            const addresses = data[0]?.addresses;
            if (addresses && addresses.length > 0) {
                const countryCode = addresses[0]?.countryCode;
                if (countryCode) {
                    return countries[countryCode];
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
    const phoneNumber = parsePhoneNumber(searchData.number, {
        regionCode: searchData.countryCode,
    });
    const significantNumber = phoneNumber?.number?.significant;
    return axios
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
/**
 * Bulk search on truecallerjs
 * @name bulkSearch
 * @function truecallerjs.bulkSearch(phoneNumbers,countryCode,installationId)
 * @param {String} phoneNumbers phone number separted with coma.
 * @param {String} installationId 6-digits OTP .
 * @return {Object} It contains phone numbers information in a array
 */
function bulkSearch(phoneNumbers, regionCode, installationId) {
    return axios
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
export { search, bulkSearch };
