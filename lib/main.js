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

const axios = require("axios");
const PhoneNumber = require("awesome-phonenumber");
var xml2js = require("xml2js");
var yaml = require("./json2yaml.js")

function groupChildren(obj) {
	for(prop in obj) {
		if(typeof obj[prop] === 'object') {
			groupChildren(obj[prop]);
		} else {
			obj['$'] = obj['$'] || {};
			obj['$'][prop] = obj[prop];
			delete obj[prop];
		}
	}
	return obj;
}

function sendRequest(inputNumber, regionCode, installationId) {
	let pn = PhoneNumber(inputNumber.toString(), regionCode);
	return	axios.get(`https://search5-noneu.truecaller.com/v2/search`, {
			params: {
				q: pn.getNumber('significant'),
				countryCode: pn.getRegionCode(),
				type: 4,
				locAddr: "",
				placement: "SEARCHRESULTS,HISTORY,DETAILS",
				encoding: "json"
			},
			headers: {
				"content-type": "application/json; charset=UTF-8",
				"accept-encoding": "gzip",
				"user-agent": "Truecaller/11.75.5 (Android;10)",
				clientsecret: "lvc22mp3l1sfv6ujg83rd17btt",
				Authorization: `Bearer ${installationId}`
			},
		}).then(
			(response) => {
				return response.data;
			}, (error) => {
				var data = {
						status : "error",
						errorResp : error.response.data,
						data : "null"
					}
				return data;
			});
}

async function searchNumber(searchData) {
	var result = await sendRequest(searchData.number.toString(), searchData.countryCode, searchData.installationId)
	if( "output" in searchData ){
		switch(searchData.output)
			{
				case "JSON":
					return JSON.stringify(result,null,4)
					break;
				case "XML":
					var builder = new xml2js.Builder();
					var xml = builder.buildObject(result);
					return xml
					break;
				case "YAML":
					const data = yaml.stringify(result);
					return data
				default:
					return result
					break;
			}
	} else {
		return result;
	}
}

module.exports.searchNumber = searchNumber;
