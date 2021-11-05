const truecallerjs = require('truecallerjs');

var searchData = {
                number: "+12093031250",
                countryCode: "IN",
                installationId: "a1k07--Vgdfyvv_rftf5uuudhuhnkljyvvtfftjuhbuijbhug",
                output: "XML"
        }

var sn = truecallerjs.searchNumber(searchData);
sn.then(function(response) {
    console.log(response)
});
