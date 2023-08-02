# TruecallerJS

[![NPM version](https://img.shields.io/npm/v/truecallerjs.svg)](https://www.npmjs.com/package/truecallerjs)
[![GIT Stars](https://img.shields.io/github/stars/sumithemmadi/truecallerjs)](https://github.com/sumithemmadi/truecallerjs/)
[![Download](https://img.shields.io/npm/dt/truecallerjs.svg)](https://github.com/sumithemmadi/truecallerjs)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/sumithemmadi)](https://github.com/sumithemmadi/truecallerjs)
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
import truecallerjs, { LoginResponse } from "truecallerjs";

async function performLogin(): Promise<void> {
  try {
    const phoneNumber: string = "+919912345678";
    const json_data: LoginResponse = await truecallerjs.login(phoneNumber);

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
      console.log("OTP sent successfully");
      console.log("Request ID:", json_data.requestId);
      console.log("Token TTL:", json_data.tokenTtl);
    } else if (json_data.status === 6 || json_data.status === 5) {
      // Verification attempts exceeded
      // Handle the response accordingly
      console.log("Verification attempts exceeded");
      console.log("Status:", json_data.status);
      console.log("Message:", json_data.message);
    } else {
      // Unknown response
      // Handle the response accordingly
      console.log("Unknown response");
      console.log("Status:", json_data.status);
      console.log("Message:", json_data.message);
    }
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

performLogin();
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
import truecallerjs, { LoginResponse } from "truecallerjs";

async function performOtpVerification(): Promise<void> {
  try {
    const phoneNumber: string = "+919912345678";
    const json_data: LoginResponse = await truecallerjs.login(phoneNumber);

    // Example response from login:
    // {
    //    "status": 1,
    //    "message": "Sent",
    //    "domain": "noneu",
    //    "parsedPhoneNumber": 919912345678,
    //    "parsedCountryCode": "IN",
    //    "requestId": "6fe0eba6-acds-24dc-66de-15b3fba349c3",
    //    "method": "sms",
    //    "tokenTtl": 300
    // }

    const otp: string = "123456"; // Replace with the actual OTP

    const res: object = await truecallerjs.verifyOtp(
      phoneNumber,
      json_data,
      otp
    );

    console.log(res);

    // Example response from OTP verification:
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

    if (res.status === 2 && !res.suspended) {
      // LOGIN SUCCESSFUL
      console.log("Login successful");
      console.log("Installation ID:", res.installationId);
      console.log("User ID:", res.userId);
    } else if (res.status === 11) {
      // INVALID OTP
      console.log("Invalid OTP");
      console.log("Status:", res.status);
      console.log("Message:", res.message);
    } else if (res.status === 7) {
      // RETRIES LIMIT EXCEEDED
      console.log("Retries limit exceeded");
      console.log("Status:", res.status);
      console.log("Message:", res.message);
    } else if (res.suspended) {
      // ACCOUNT SUSPENDED
      console.log("Account suspended");
      console.log("Status:", res.status);
      console.log("Message:", res.message);
    } else {
      // UNKNOWN RESPONSE
      console.log("Unknown response");
      console.log("Message:", res.message);
    }
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

performOtpVerification();
```

| status    | message                         |
| ----------|---------------------------------|
| 2         | Login Successful                |
| 11        | Invalid OTP                     |
| 7         | OTP Retries exceeded            |

Make sure to replace phonenumber with the actual phone number, json_data with the JSON response obtained from the login function, and otp with the actual OTP received.

The `res` variable will contain the JSON response from the OTP verification request. You can access the properties of the response to handle different scenarios:

- If `res.status` is 2 and `res.suspended` is `false`, it means the login was successful.
  `res.installationId`, `res.suspended`, `res.phones[0].phoneNumber`, and `res.phones[0].countryCode` properties for further processing.

- If `res.status` is `11`, it means the OTP entered is invalid.

- If `res.status` is `7`, it means the number of OTP verification retries has exceeded the limit.

- If `res.suspended` is `true`, it means the account is suspended.

- For any other response, you can check `res.status` and res.message for more information.

### Simple Example of Searching Number

- Normal search for a phone number.

```js
import truecallerjs, { SearchData, Format } from "truecallerjs";

async function performTruecallerSearch(): Promise<void> {
  const searchData: SearchData = {
    number: "9912345678",
    countryCode: "IN",
    installationId: "a1k07--Vgdfyvv_rftf5uuudhuhnkljyvvtfftjuhbuijbhug",
  };

  try {
    const response: Format = await truecallerjs.search(searchData);
    console.log(response.json());

    // Additional response methods:
    // console.log(response.xml());
    // console.log(response.yaml());
    // console.log(response.text());

    // Example of available data from the response:
    console.log(response.getName()); // "Sumith Emmadi"
    console.log(response.getAlternateName()); // "sumith"
    console.log(response.getAddresses()); // {....}
    console.log(response.getEmailId()); // example@domain.com
    console.log(response.getCountryDetails()); // {...}
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

performTruecallerSearch();
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
import truecallerjs, { BulkSearchData, Format } from "truecallerjs";

async function performBulkTruecallerSearch(): Promise<void> {
  const countryCode: string = "IN";
  const installationId: string = "a1k07--Vgdfyvv_rftf5uuudhuhnkljyvvtfftjuhbuijbhug";
  const phoneNumbers: string = "+9912345678,+14051234567,+919987654321";

  try {
    const response: BulkSearchData = await truecallerjs.bulkSearch(phoneNumbers, countryCode, installationId);
    console.log(response);
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

performBulkTruecallerSearch();
```

In this example, the `truecallerjs.bulkSearch()` function is used to perform bulk searches on multiple phone numbers. The `phoneNumbers` parameter should contain the phone numbers separated by commas. The `countryCode` and `installationId` parameters are used to specify the default country code and installation ID, respectively.

> **Note** : Make sure to log in using the `truecallerjs login` command and obtain your installation ID using the `truecallerjs -i` command.
