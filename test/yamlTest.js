const truecallerjs = require('truecallerjs');

var searchData = {
                number: "+9199123456789",
                countryCode: "IN",
                installationId: "a1k07--Vgdfyvv_rftf5uuudhuhnkljyvvtfftjuhbuijbhug",
                output: "YAML"
        }

var sn = truecallerjs.searchNumber(searchData);
sn.then(function(response) {
    console.log(response)
});
