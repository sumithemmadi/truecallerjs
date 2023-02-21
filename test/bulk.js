const truecallerjs = require('../index');

var countryCode = "IN";
var installationId = "a1i0t--dsdkfmsldkfmvslkdfmvsdflmvsdfv8s5dgbsgdbs-";
var phoneNumbers = "+9912345678,+14051234567,+919987654321" // Phone numbers seperated by comma's

const searchResult = truecallerjs.bulkSearch(phoneNumbers, countryCode, installationId)
searchResult.then(function (response) {
    const data = JSON.stringify(response, null, 2);
    console.log(data);
})