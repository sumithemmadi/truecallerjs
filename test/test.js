const truecallerjs = require("..");

// truecallerjs.searchNumber("MOBILE_NUMBER", "DEFAULT_COUNTRY_CODE", "YOUR_TRUECALLER_INSTALLATION_ID")

var sn = truecallerjs.searchNumber("9912857147", 'IN', "aaddsgjfyychvbjhcfftyhhyhgggg");
sn.then(function(response) {
    console.log(response);
});
