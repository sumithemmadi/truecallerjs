const axios = require("axios");
const { exitProcess } = require("yargs");
// var randomstring = require("randomstring");
var phoneNumber = "6945340482";

const testdata = {
  countryCode: "in",
  dialingCode: 91,
  installationDetails: {
    app: {
      buildVersion: 5,
      majorVersion: 11,
      minorVersion: 7,
      store: "GOOGLE_PLAY",
    },
    device: {
      deviceId: "w3JGvZj1UYR3AAU",
      language: "en",
      manufacturer: "OnePlus",
      model: "OnePlus 7T",
      osName: "Android",
      osVersion: 9,
      mobileServices: ["GMS"],
    },
    language: "en",
  },
  phoneNumber: phoneNumber,
  region: "region-2",
  sequenceNo: 2,
};

const axiosInstance = axios.create({
  headers: {
    clientSecret: "lvc22mp3l1sfv6ujg83rd17btt",
    "User-Agent": "Truecaller/11.7.5 (Android;6.0)",
    "Content-Type": "application/json",
  },
});

let AuthUser = function(testdata) {
  return axiosInstance
    .post(
      `https://account-asia-south1.truecaller.com/v2/sendOnboardingOtp`,
      testdata
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

let userToken = AuthUser(testdata)


userToken.then(function(result) {
   console.log(result) // "Some User token"
})