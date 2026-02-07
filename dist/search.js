// MIT License
import request from "./utils/request.js";
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
            color: color, // Whether to apply colors to the output or not
            spacing: space, // Whether to include spacing after colons or not
            squareBracketsForArray: false, // Whether to use square brackets for arrays or not
            doubleQuotesForKeys: false, // Whether to use double quotes for object keys or not
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
    // Perform the search using the centralized request utility
    // Using 'search5-noneu' endpoint as it has shown better reliability for non-EU requests.
    return request
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
            Authorization: `Bearer ${searchData.installationId}`,
        },
    })
        .then((response) => {
        // console.log(response);
        return new Format(response.data);
    }, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error) => {
        // Return a Format object wrapping the error to prevent crashes,
        // though consumers should check for error properties.
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
    // Perform the bulk search using the centralized request utility
    return request
        .get(`https://search5-noneu.truecaller.com/v2/bulk`, {
        params: {
            q: phoneNumbers,
            countryCode: regionCode,
            type: 14,
            placement: "SEARCHRESULTS,HISTORY,DETAILS",
            encoding: "json",
        },
        headers: {
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
