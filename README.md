# Truecallerjs

A module to search phone number details with truecaller.

## Requirements
   * Valid Mobile Number( for Truecaller verification)
   * [Truecaller InstallationId](https://github.com/sumithemmadi/truecallerjs#installationId)

## Installation


```bash
npm install -g truecallerjs
```
## Usage

```js
const truecallerjs = require(".");

// truecallerjs.searchNumber("MOBILE_NUMBER", "DEFAULT_COUNTRY_CODE", "YOUR_TRUECALLER_INSTALLATION_ID")

var sn = truecallerjs.searchNumber("9912345678", 'IN', "YOUR_TRUECALLER_INSTALLATION_ID");
sn.then(function(response) {
    console.log(response);
});

```
If you use mobile number with dialingCode.

```js
const truecallerjs = require(".");

// truecallerjs.searchNumber("MOBILE_NUMBER", "DEFAULT_COUNTRY_CODE", "YOUR_TRUECALLER_INSTALLATION_ID")

var sn = truecallerjs.searchNumber("9912345678", 'IN', "YOUR_TRUECALLER_INSTALLATION_ID");
sn.then(function(response) {
    console.log(response);
});
```

## Login

You need to login into your truecaller account first.

```
truecallerjs login
```

## Searching a number
Tor search a number enter below command.

```
truecallerjs -s [number]
```

