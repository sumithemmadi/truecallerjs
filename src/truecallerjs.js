const axios = require("axios");
const PhoneNumber  = require("awesome-phonenumber");
var xml2js = require('xml2js'); 

function groupChildren(obj) {
  for(prop in obj) {
    if (typeof obj[prop] === 'object') {
      groupChildren(obj[prop]);
    } else {
      obj['$'] = obj['$'] || {};
      obj['$'][prop] = obj[prop];
      delete obj[prop];
    }
  }

  return obj;
}


const truecallerjs = {
    searchNumber: (inputNumber, regionCode, installationId) => {
        let pn = PhoneNumber(inputNumber.toString(), regionCode);
        return axios.get(`https://search5-noneu.truecaller.com/v2/search`, {
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
            }, (err) => {
                return err.response.data;
            });
    }
}
module.exports = truecallerjs;
