const axios = require("axios");

const truecallerjs = {
    searchNumber: (number, regionCode, authorizationBearer) => {
        return axios.get(`https://search5-noneu.truecaller.com/v2/search`, {
            params: {
                q: number,
                countryCode: regionCode,
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
                Authorization: `Bearer ${authorizationBearer}`
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
