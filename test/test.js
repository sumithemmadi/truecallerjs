const truecallerjs = require('truecallerjs');

var searchData = {
                number: "9912345678",
                countryCode: "IN",
                installationId: "a1k07--Vgdfyvv_rftf5uuudhuhnkljyvvtfftjuhbuijbhug",
                output: "JSON"
        }

var sn = truecallerjs.searchNumber(searchData);
sn.then(function(response) {
    console.log(response)
});
