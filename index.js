const yargs = require("yargs");
const PhoneNumber = require("awesome-phonenumber");
const prompt = require("prompt-sync")();
const axios = require("axios").default;
// var getRandomString = require("./lib/generateRandomString");
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
        deviceId: generateRandomString(16),
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
  console.log(postdata);
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

function otpVerification(number,regionCode,countryCode,RequestID,otpValue){
  const postdata = {
    countryCode: regionCode,
    dialingCode: countryCode,
    phoneNumber: number,
    requestId: RequestID, 
    token: otpValue
  }
  const axiosInstance = axios.create({
    headers: {
      "content-type": "application/json; charset=UTF-8",
      "accept-encoding": "gzip",
      "user-agent": "Truecaller/11.75.5 (Android;10)",
      clientsecret: "lvc22mp3l1sfv6ujg83rd17btt"
    },
  });
  console.log(postdata);
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

function generateRandomString(length){
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
  }
  return result;
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
        if (response.status == 1) {
          console.log("Otp sent successfully ".green);
        }
        let RequestID = response.requestId
        let otp =  prompt("Enter Received OTP : ");
        while (otp.length != 6) {
          console.log("Enter valid 6 digits otp ".red);
          let otp =  prompt("Enter OTP : ");
        }
        const otpValue  = otp.toString()
        let verifyOtp = otpVerification(number,regionCode,countryCode,RequestID,otpValue)
        verifyOtp.then(function (result) {
          console.log(result);
          console.log(result.installationId);
        });
      } else {
        console.log(response.message.red);
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




// deviceId: getRandomString({
//   length: 16,
//   charset: 'hex'
// }),
// lang
// lfhiguiohglieru
// dgihjrg
// dgjkdgd
// dflj;gbjmdf
// dfgblmjd;lfgbmd
// df;mbjd;gbl