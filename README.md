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
const truecallerjs = require('truecallerjs');

// truecallerjs.searchNumber("MOBILE_NUMBER", "DEFAULT_COUNTRY_CODE", "YOUR_TRUECALLER_INSTALLATION_ID")

var sn = truecallerjs.searchNumber("912345678", 'IN', "YOUR_TRUECALLER_INSTALLATION_ID");
sn.then(function(response) {
    console.log(response);
});

```
If you use mobile number with dialingCode.

```js
const truecallerjs = require('truecallerjs');

// truecallerjs.searchNumber("MOBILE_NUMBER", "DEFAULT_COUNTRY_CODE", "YOUR_TRUECALLER_INSTALLATION_ID")

var sn = truecallerjs.searchNumber("+12122005989", 'IN', "YOUR_TRUECALLER_INSTALLATION_ID");
sn.then(function(response) {
    console.log(response);
});
```
Here,mobile number is **US** and default country code is **IN**.
If mobile number is not in **E164** Format then Default Country Code will be considered as a countryCode of that Mobile Number.

## Login
Install this npm package globally
```
npm install -g  truecallerjs
```
Then  login to your truecaller account 
```
truecallerjs login
```
### Searching a number
Tor search a number enter below command.

```
truecallerjs -s [number]
```


## InstallationId
To know your InstallationId , install the package globally.

```
npm install -g  truecallerjs
```

> After  **Successfully Login** your InstallationId will be saved as **authkey.json** in **.secret** folder if you clone this repository.

Enter the below command to see your **InstallationId**.
```
truecallerjs --installationid
```
or
```
truecallerjs -iid
```
## Searching a number
Tor search a number enter below command.

```
truecallerjs -s [number]
```
