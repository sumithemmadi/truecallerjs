var randomstring = require("randomstring");
const axios = require("axios").default;

// User login function
function userLogin(number, regionCode, countryCode, internationalNumber) {
  console.log("Sending OTP to ${internationalNumber} ")
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

function authenticationRequest(
  number,
  regionCode,
  countryCode
) {
  let postdata = {
    countryCode: regionCode,
    dialingCode: countryCode,
    installationDetails: {
      app: {
        buildVersion: 5,
        majorVersion: 11,
        minorVersion: 7,
        store: "GOOGLE_PLAY"
      },
      device: {
        deviceId: "2fa2d0b0h82ef00",
        language: "en",
        manufacturer: "Xiaomi",
        model: "M2010J19SG",
        osName: "Android",
        osVersion: "10",
        mobileServices: [
          "GMS"
        ]
      },
      language: "en"
    },
    phoneNumber: number,
    region: 'region-2',
    sequenceNo: 2
  }


  const axiosInstance = axios.create({
    headers: {
      "content-type": "application/json; charset=UTF-8",
      "accept-encoding": "gzip",
      "user-agent": "Truecaller/11.75.5 (Android;10)",
      clientsecret: "lvc22mp3l1sfv6ujg83rd17btt"
    },
  });

  return axiosInstance
    .post(
      "https://account-asia-south1.truecaller.com/v2/sendOnboardingOtp",
      postdata
    )
    .then(
      (response) => {
        return response.data;
      },
      (err) => {
        return err.response.data;
      }
    );
}

