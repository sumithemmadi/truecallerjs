const yargs = require("yargs");
const PhoneNumber = require("awesome-phonenumber");
const prompt = require("prompt-sync")();
var mainFile = require("./src/main");

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
  console.log("Login");
  const inputNumber = prompt("Enter You Mobile Number : ");
  let pn = PhoneNumber(inputNumber.toString());
  if (!pn.isValid()) {
    console.log("! Invalid number");
    return false;
  } else {
    // console.log(JSON.stringify( pn, null, 4 ));
    let number = pn.getNumber("significant");
    let regionCode = pn.getRegionCode();
    let internationalNumber = pn.getNumber("e164");
    let countryCode = pn.getCountryCode();

    userLogin(number, regionCode, countryCode, internationalNumber);
  }
  process.exit();
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
