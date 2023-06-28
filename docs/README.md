# TruecallerJS

[![NPM version](https://img.shields.io/npm/v/truecallerjs.svg)](https://www.npmjs.com/package/truecallerjs)
[![GIT Stars](https://img.shields.io/github/stars/sumithemmadi/truecallerjs)](https://github.com/sumithemmadi/truecallerjs/)
[![Download](https://img.shields.io/npm/dt/truecallerjs.svg)](https://github.com/sumithemmadi/truecallerjs)
[![LICENSE](https://img.shields.io/npm/l/truecallerjs.svg)](https://github.com/sumithemmadi/truecallerjs/blob/main/LICENSE)
[![Maintenance](https://img.shields.io/npms-io/maintenance-score/truecallerjs)](https://github.com/sumithemmadi/truecallerjs)
[![Issues](https://img.shields.io/github/issues/sumithemmadi/truecallerjs)](https://github.com/sumithemmadi/truecallerjs/issues)

- The truecallerjs package allows you to integrate Truecaller functionality into your JavaScript applications. It provides methods for login and OTP verification.

## Installation

- To install the truecallerjs package, run the following command:

```bash
npm install truecallerjs
```

## Login

The `login` function is used to log in to the Truecaller service. It takes a phone number in international format as a parameter and returns a JSON object containing the login request details.

Method Signature

```bash
truecallerjs.login(phonenumber)
```

- phonenumber (String): The phone number in international format.

### Return Value

The function returns a Promise that resolves to a JSON object with the following properties:

- `status` (Number): The status code of the login request. Possible values are 1 (OTP sent successfully) or 9 (request in pending).
- `message` (String): A message indicating the status of the login request.
- `domain` (String): The domain associated with the phone number.
- `parsedPhoneNumber` (Number): The phone number without the country code.
- `parsedCountryCode` (String): The country code associated with the phone number.
- `requestId` (String): The unique identifier for the login request.
- `method` (String): The method used for sending the OTP (e.g., "sms").
- `tokenTtl` (Number): The time-to-live (TTL) value for the OTP token in seconds.

### Example

```js
import truecallerjs from "truecallerjs";

var json_data = await truecallerjs.login("+919912345678");

// Example response:
// {
//     "status": 1,
//     "message": "Sent",
//     "domain": "noneu",
//     "parsedPhoneNumber": 919912345678,
//     "parsedCountryCode": "IN",
//     "requestId": "6fe0eba6-acds-24dc-66de-15b3fba349c3",
//     "method": "sms",
//     "tokenTtl": 300
// }

if (json_data.status === 1 || json_data.status === 9) {
    // OTP sent successfully
    // Handle the response accordingly
} else if (json_data.status === 6 || json_data.status === 5) {
    // Verification attempts exceeded
    // Handle the response accordingly
} else {
    // Unknown response
    // Handle the response accordingly
}
```

> **Note** : Make sure to replace +919912345678 with the actual phone number you want to use.

| status    | message                         |
| ----------|---------------------------------|
| 1         | OTP sent successfully           |
| 9         | Request in pending              |
| 6 or 5    | Verification Attempts Exceeded  |

- Save this json in a file or store in a variable. This json will be used to verify OTP in `verifyOtp()` function.

- OTP Verification

- The verifyOtp function is used to verify the mobile number with the OTP (One-Time Password) received.

```js
import truecallerjs from "truecallerjs";


var json_data = await truecallerjs.login("+919912345678"); // Phone number should be in international format and it must be a 
var res = await truecallerjs.verifyOtp(phonenumber, json_data, otp);

console.log(res);

// {
//    "status": 2,
//    "message": "Verified",
//    "installationId": "a1k07--Vgdfyvv_rftf5uuudhuhnkljyvvtfftjuhbuijbhug",
//    "ttl": 259200,
//    "userId": 1234567890123456789,
//    "suspended": false,
//    "phones": [
//       {
//          "phoneNumber": 919912345678,
//          "countryCode": "IN",
//          "priority": 1
//       }
//    ]
// }

if ((res.data.status == 2 && !res.data.suspended)) {

  //  LOGIN SUCCESSFUL
   
} else if (res.data.status == 11) {
  
  // INVALID OTP
   
} else if (res.data.status == 7) {
  
  // RETRIES LIMIT EXCEED

} else if (res.data.suspended) {

  // ACCOUNT SUSPENDED

} else {
    console.log( res.data.message);
  // UNKNOWN RESPONSE
}

```

| status    | message                         |
| ----------|---------------------------------|
| 2         | Login Successful                |
| 11        | Invalid OTP                     |
| 7         | OTP Retries exceeded            |

Make sure to replace phonenumber with the actual phone number, json_data with the JSON response obtained from the login function, and otp with the actual OTP received.

The `res` variable will contain the JSON response from the OTP verification request. You can access the properties of the response to handle different scenarios:

- If `res.data.status` is 2 and `res.data.suspended` is `false`, it means the login was successful. You can access the res.data.userId
  `res.data.installationId`, `res.data.suspended`, `res.data.phones[0].phoneNumber`, and `res.data.phones[0].countryCode` properties for further processing.

- If `res.data.status` is `11`, it means the OTP entered is invalid.

- If `res.data.status` is `7`, it means the number of OTP verification retries has exceeded the limit.

- If `res.data.suspended` is `true`, it means the account is suspended.

- For any other response, you can check `res.data.status` and res.data.message for more information.

### Simple Example of Searching Number

- Normal search for a phone number.

```js
import truecallerjs from "truecallerjs";

var search_data = {
  number: "9912345678",
  countryCode: "IN",
  installationId: "a1k07--Vgdfyvv_rftf5uuudhuhnkljyvvtfftjuhbuijbhug",
};

var response = await truecallerjs.search(search_data);
console.log(response.json());
```

- `number` : Phone number
- `countryCode` : Country code to use by default If any phone number is not in e164 format(Internation format). Eg: Country code for India is "IN".
- `installationId` : InstallationId Here, you need to login first to use it. Use the truecallerjs login command to login to your account.
-

In the above example, the `truecallerjs` package is used to search for a phone number. The `search_data` object contains the necessary parameters, including the number, country code, and installation ID. The response from the `truecallerjs.search()` function provides various methods to access the returned data.

> **Note** : Make sure to log in using the `truecallerjs login` command and obtain your installation ID using the `truecallerjs -i` command.

### `response` Object

The `response` object represents the response obtained from a query. It provides various methods and properties to access and manipulate the response data.

#### Methods

- `response.json(color)`
  - Parameters:
    - `color` (Boolean): Indicates whether to add color formatting to the JSON output.
  - Returns: JSON response as a string.
  - Description: This method returns the JSON response as a string. The optional `color` parameter determines whether to include color formatting in the output.

- `response.xml(color)`
  - Parameters:
    - `color` (Boolean): Indicates whether to add color formatting to the XML output.
  - Returns: XML output as a string.
  - Description: This method returns the XML output as a string. The optional `color` parameter determines whether to include color formatting in the output.

- `response.yaml(color)`
  - Parameters:
    - `color` (Boolean): Indicates whether to add color formatting to the YAML output.
  - Returns: YAML output as a string.
  - Description: This method returns the YAML output as a string. The optional `color` parameter determines whether to include color formatting in the output.

- `response.html(color)`
  - Parameters:
    - `color` (Boolean): Indicates whether to add color formatting to the HTML output.
  - Returns: HTML output as a string.
  - Description: This method returns the HTML output as a string. The optional `color` parameter determines whether to include color formatting in the output.

- `response.text(color, space)`
  - Parameters:
    - `color` (Boolean): Indicates whether to add color formatting to the JSON output.
    - `space` (Boolean): Indicates whether to include spacing between keys and values in the JSON output.
  - Returns: JSON response as a string.
  - Description: This method returns the JSON response as a string. The optional `color` parameter determines whether to include color formatting in the output, and the `space` parameter determines whether to include spacing between keys and values.

#### Properties

- `response.getName()`
  - Returns: The name associated with the response.
  - Description: This method retrieves the name associated with the response.

- `response.getAlternateName()`
  - Returns: The alternate name associated with the response.
  - Description: This method retrieves the alternate name associated with the response.

- `response.getAddresses()`
  - Returns: The addresses associated with the response.
  - Description: This method retrieves the addresses associated with the response. The details of the addresses can be accessed using the returned object.

- `response.getEmailId()`
  - Returns: The email ID associated with the response.
  - Description: This method retrieves the email ID associated with the response.

- `response.getCountryDetails()`
  - Returns: The country details associated with the response.
  - Description: This method retrieves the country details associated with the response. The details can be accessed using the returned object.

### Bulk Search on Multiple Phone Numbers

The `truecallerjs` package also supports bulk search on multiple phone numbers:

```js
import truecallerjs from "truecallerjs";

var countryCode = "IN";
var installationId = "a1k07--Vgdfyvv_rftf5uuudhuhnkljyvvtfftjuhbuijbhug";
var phoneNumbers = "+9912345678,+14051234567,+919987654321"; // Phone numbers separated by commas

var response = await truecallerjs.bulkSearch(
  phoneNumbers,
  countryCode,
  installationId
);
console.log(response);
```

In this example, the `truecallerjs.bulkSearch()` function is used to perform bulk searches on multiple phone numbers. The `phoneNumbers` parameter should contain the phone numbers separated by commas. The `countryCode` and `installationId` parameters are used to specify the default country code and installation ID, respectively.

> **Note** : Make sure to log in using the `truecallerjs login` command and obtain your installation ID using the `truecallerjs -i` command.
