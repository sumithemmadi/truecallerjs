const truecallerjs = require('../index');

var searchData = {
  number: "9912345678",
  countryCode: "IN",
  installationId: "a1i0t--akjnflkjsfnvslkjfvnsjfvskjnfvafkamlkfmvalkfv",
  output: "text",
  color: true
}

var sn = truecallerjs.searchNumber(searchData);
sn.then(function (response) {
  console.log(response)
});