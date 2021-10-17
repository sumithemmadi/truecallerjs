const yargs = require("yargs");
const PhoneNumber = require("awesome-phonenumber");
const prompt = require("prompt-sync")();
const axios = require("axios").default;
var getRandomString = require(".").generate;
const colors = require('colors');

// User login function
function userLogin(number, regionCode, countryCode,internationalNumber) {
  console.log("Sending OTP to".yellow,internationalNumber.yellow);
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
        deviceId: getRandomString.generate({
          length: 12,
          charset: 'hex'
        }),
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

//search number function
function searchNumber(number, regionCode, countryCode, internationalNumber) {
  return true;
}

const argv = yargs
  .usage(
    "Usage: \n$0  login (Login to truecaller).\n$0 -s [number] (command to search a number)."
  )
  .option("search", {
    alias: "s",
    description: "To search caller name and related iformation of a number",
    type: "charecter",
  })
  .option("json", {
    alias: "json",
    description: "To print output in json",
    type: "boolean",
  })
  .help()
  .alias("help", "h").argv;

if (argv._.includes("login") && argv._[0] == "login" && argv._.length == 1) {
  console.log("Login\n\n Enter mobile number in international formate\n Example : +919912345678.\n".blue);
  const inputNumber = prompt("Enter You Mobile Number : ");
  let pn = PhoneNumber(inputNumber.toString());
  if (!pn.isValid()) {
    console.log("! Invalid number".red);
    return false;
  } else {
    // console.log(JSON.stringify( pn, null, 4 ));
    let number = pn.getNumber("significant");
    let regionCode = pn.getRegionCode();
    let internationalNumber = pn.getNumber("e164");
    let countryCode = pn.getCountryCode();

    let sendOtp = userLogin(number,regionCode, countryCode,internationalNumber);
    sendOtp.then(function (response) {
      console.log(response);
      if (response.status == 1 || response.status == 9 ) {
        if (response.message == "Sent") {
          console.log("Otp sent successfully ".green);       
        } else {
          console.log(response.message.red);
        }
      }
    })
  }
  // process.exit();
}

if (argv.s) {
  let pn = PhoneNumber(argv.s.toString(), "IN");
  if (!pn.isValid()) {
    console.log("! Invalid number");
    return false;
  } else {
    // console.log(JSON.stringify( pn, null, 4 ));
    let number = pn.getNumber("significant");
    let regionCode = pn.getRegionCode();
    let internationalNumber = pn.getNumber("e164");
    let countryCode = pn.getCountryCode();
    searchNumber(number, regionCode, countryCode, internationalNumber);
  }
}

