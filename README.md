# TruecallerJS

<!-- ![TruecallerJS logo](Screenshot_20230606-183149_Chrome.png) -->

[![NPM version](https://img.shields.io/npm/v/truecallerjs.svg)](https://www.npmjs.com/package/truecallerjs)
[![GIT Stars](https://img.shields.io/github/stars/sumithemmadi/truecallerjs)](https://github.com/sumithemmadi/truecallerjs/)
[![Download](https://img.shields.io/npm/dt/truecallerjs.svg)](https://github.com/sumithemmadi/truecallerjs)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/sumithemmadi)](https://github.com/sumithemmadi/truecallerjs)
[![LICENSE](https://img.shields.io/npm/l/truecallerjs.svg)](https://github.com/sumithemmadi/truecallerjs/blob/main/LICENSE)
[![Maintenance](https://img.shields.io/npms-io/maintenance-score/truecallerjs)](https://github.com/sumithemmadi/truecallerjs)
[![Issues](https://img.shields.io/github/issues/sumithemmadi/truecallerjs)](https://github.com/sumithemmadi/truecallerjs/issues)

Welcome to TruecallerJS! This is a library for retrieving phone number details using the Truecaller API. It provides a simple and convenient way to access information about phone numbers in your Node.js, JavaScript, and TypeScript projects.

## Description

TruecallerJS is built to simplify the process of fetching phone number details. With this library, you can easily integrate Truecaller functionality into your Node.js, JavaScript, and TypeScript applications. It abstracts the complexities of interacting with the Truecaller API and provides a streamlined interface for fetching and processing phone number information.

## Features

- **Phone Number Lookup**: Retrieve detailed information about a phone number, including the owner's name, location, and more.

- **Support for Node.js, JavaScript, and TypeScript**: TruecallerJS can be used in Node.js projects, as well as in JavaScript and TypeScript applications.
- **Simple and Lightweight**: TruecallerJS is designed to be easy to use and lightweight.

## Table of Contents

- [TruecallerJS](#truecallerjs)
  - [Description](#description)
  - [Features](#features)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Command Line Usage](#command-line-usage)
    - [Limitations](#limitations)
  - [Usage](#usage)
    - [Simple Example](#simple-example)
    - [Bulk Search on Multiple Phone Numbers](#bulk-search-on-multiple-phone-numbers)
  - [Disclaimer](#disclaimer)
  - [Contributing](#contributing)
  - [License](#license)
  - [Acknowledgments](#acknowledgments)

## Installation

You can install TruecallerJS using npm:

```bash
npm install truecallerjs
```

To use TruecallerJS from the command line

```bash
npm install -g truecallerjs
```

> **Note**: If you are using a version of `truecallerjs` that is older than [1.1.2](https://github.com/sumithemmadi/truecallerjs/tree/truecallerjs-v1.1.2), we recommend referring to the [truecallerjs-v1.1.2](https://github.com/sumithemmadi/truecallerjs/tree/truecallerjs-v1.1.2) documentation for instructions.
> **Note**: If you are using `truecallerjs` version from [1.1.3](https://github.com/sumithemmadi/truecallerjs/tree/truecallerjs-v1.1.2) to [1.1.5](https://github.com/sumithemmadi/truecallerjs/tree/truecallerjs-v1.1.5), please refer to the [truecallerjs-v1.1.5](https://github.com/sumithemmadi/truecallerjs/tree/truecallerjs-v1.1.5) documentation for instructions.

## Command Line Usage

To use TruecallerJS from the command line, you can run the `truecallerjs` command followed by the desired options and arguments.

Here are some examples of the available options:

- `truecallerjs login`: Use this command to log in to your Truecaller account.
- `truecallerjs -s [number]`: Use this command to search for a phone number and retrieve the caller name and related information.
- `truecallerjs --bulksearch, --bs` command is used to performing bulk number searches using the Truecaller service. It allows you to search for multiple phone numbers at once, making it convenient for processing large sets of phone numbers in a single request.

- `truecallerjs --bulksearch, --bs`: Use this command to perform a bulk number search.
- Additional options include `--raw`, `--name`, `--email`, `--json`, `--xml`, `--yaml`, `--text`, `--nc`, `--installationid`, `--verbose`, and `--help`.

For example:

```bash
~$ truecallerjs -s +9199123456789 --json
{
     ...
     "name":"Sumith Emmadi"
     ...
}

~$ truecallerjs -s +9199123456789 --name
Name : Sumith Emmadi
```

Example for bulk search

```bash
truecallerjs --bulksearch <phone_number_1>,<phone_number_2>,<phone_number_3>,...,<phone_number_n>
```

Replace `<phone_number_1>, <phone_number_2>, ..., <phone_number_n>` with the actual phone numbers you want to search. Separate each phone number with a comma.

```bash
 ~$ truecallerjs --bs 9912345678,+14051234567,+919987654321
```

> **Note** : If the country code is not specified for a phone number, it will default to using your own country code.

### Limitations

Please note the following limitations when using the `--bulksearch` option:

1. Maximum Number of Phone Numbers: The tool supports searching 30 or fewer phone numbers at once in a single request. If you exceed this limit, you may need to split your input into multiple requests.

2. Formatting: Ensure that the phone numbers are correctly formatted and do not contain any additional characters or spaces. The tool expects the phone numbers to be provided in a comma-separated format.

## Usage

To use the project, start by installing the `truecallerjs` package via npm:

```bash
npm install truecallerjs
```

### Simple Example

Here's a basic example of how to perform a normal search for a phone number:

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

In the above example, the `truecallerjs` package is used to search for a phone number. The `search_data` object contains the necessary parameters, including the number, country code, and installation ID. The response from the `truecallerjs.search()` function provides various methods to access the returned data.

> **Note** : Make sure to log in using the `truecallerjs login` command and obtain your installation ID using the `truecallerjs -i` command.

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

For more details and additional functionalities, please refer to the [documentation](https://github.com/sumithemmadi/truecallerjs/tree/main/docs), including the process for logging in and obtaining the installation ID.

## Disclaimer

The `truecallerjs` tool is not an official Truecaller product. It is a custom script developed by [Sumith Emmadi](https://github.com/sumithemmadi), and its functionality is dependent on the Truecaller service. Please use this tool responsibly and in compliance with the terms of service of Truecaller.

For more information and support, please contact   [Sumith Emmadi](https://github.com/sumithemmadi) at  <sumithemmadi244@gmail.com> .

## Contributing

Contributions to the `truecallerjs` are not only welcome but highly encouraged!

1. Fork this repository `git clone https://github.com/sumithemmadi/truecallerjs.git`
2. Create a new branch for your contribution.
3. Add your content in the appropriate folder or create a new file.
4. Commit your changes and push them to your forked repository.
5. Open a pull request, explaining the nature of your contribution.

Please note that all contributions should align with the spirit of the repository and be suitable for all audiences. Offensive or inappropriate content will not be accepted.

## License

TruecallerJS is open source and licensed under the MIT License. See the LICENSE file for more information.

## 💝 Sponsor

If you find TruecallerJS helpful or inspiring, consider supporting me through GitHub Sponsors. Your sponsorship helps me dedicate more time and effort to open source development and creating impactful projects.

- **Sponsor Me**: [https://github.com/sponsors/sumithemmadi](https://github.com/sponsors/sumithemmadi/)
- **Paypal**: [paypal.me/sumithemmadi](https://paypal.me/sumithemmadi)
- **UPI ID** : sumithemmadi@paytm

### 💖 Sponsors

[![Sponsors](https://sumithemmadi.github.io/sponsor.svg)](https://github.com/sponsors/sumithemmadi/)

## Acknowledgments

Thank you for choosing TruecallerJS! I hope it helps you retrieve phone number details efficiently.

Repository:
[https://github.com/sumithemmadi/truecallerjs.git](https://github.com/sumithemmadi/truecallerjs.git)
