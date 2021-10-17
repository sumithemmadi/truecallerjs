var randomstring = require("randomstring");
const axios = require("axios").default;

// User login function
function userLogin(number, regionCode, countryCode, internationalNumber) {
  console.log("Sending OTP to ${internationalNumber} ");

  let sendOtp = authenticationRequest(number = "9912896765", "in", 91);
  sendOtp.then(function (response) {
    console.log(response);
    if (response.status == 1 || response.status == 9 ) {
      if (response.message == "Sent") {
        console.log("Otp sent successfully ");       
      } else {
        console.log("Somithing went work.");
      }
    }
  });

  return true;
}

//search number function
function searchNumber(number, regionCode, countryCode, internationalNumber) {
  return true;
}

function generate(n) {
  var add = 1,
    max = 12 - add; // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.

  if (n > max) {
    return generate(max) + generate(n - max);
  }

  max = Math.pow(10, n + add);
  var min = max / 10; // Math.pow(10, n) basically
  var number = Math.floor(Math.random() * (max - min + 1)) + min;

  return ("" + number).substring(add);
}

function getRandomNumber(length) {
  return Math.floor(
    Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
  );
}

