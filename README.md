<h1 id="truecallerjs">
    <a href="https://github.com/sumithemmadi/truecallerjs">Truecallerjs</a>
</h1>
    <a href="https://www.npmjs.com/package/truecallerjs"
        ><img src="https://img.shields.io/npm/v/truecallerjs.svg" alt="Version"
    /></a>
    <a href="https://github.com/sumithemmadi/truecallerjs/stargazers"
        ><img
            src="https://img.shields.io/github/stars/sumithemmadi/truecallerjs"
            alt="Stars"
    /></a>
    <a href="https://github.com/sumithemmadi/truecallerjs"
        ><img
            src="https://img.shields.io/npm/dt/truecallerjs.svg"
            alt="weekly Download"
    /></a>
    <a href="https://github.com/sumithemmadi/truecallerjs/blob/main/LICENSE"
        ><img src="https://img.shields.io/npm/l/truecallerjs.svg" alt="License"
    /></a>
    <a href="https://github.com/sumithemmadi/truecallerjs#license"
        ><img
            src="https://app.fossa.com/api/projects/git%2Bgithub.com%2Fsumithemmadi%2Ftruecallerjs.svg?type=shield"
            alt="FOSSA Status"
    /></a>
    <a href="https://github.com/sumithemmadi/truecallerjs"
        ><img
            src="https://img.shields.io/npms-io/maintenance-score/truecallerjs"
            alt="Maintenance"
    /></a>
    <a href="https://github.com/sumithemmadi/truecallerjs/issues"
        ><img
            src="https://img.shields.io/github/issues/sumithemmadi/truecallerjs"
            alt="issues"
    /></a>
    <br>
    <p>A simple package to search phone number details.</p>


# Requirements

* Valid Mobile Number(Phone number verification for truecaller)
* [Truecaller InstallationId](https://github.com/sumithemmadi/truecallerjs#installation)

## [Command Line Usage](https://github.com/sumithemmadi/truecallerjs)

### Installation

Install this npm package globally.

```bash
npm install -g  truecallerjs
```

### Login

Then  login to your truecaller account .

```bash
~$ truecallerjs login
```

> If you get any error try running '**sudo truecallerjs login**'. If you are using Windows try the command with **Adminitrative Privilege**.

> If you still facing problems in login then try below steps.

   1. On Truecaller Android, tap on the 3 line menu on top left then click on `setting's`.
   2. Tap on `Privacy Center` and then click on `Download my data`.
   3. Now a json file is downloaded. 
   4. Save the json file on your PC at any location e.g /home/HP/1234567890-99123456789.json
   5. On you terminal or command prompt enter below command.
   ```
   ~$ truecallerjs login /home/HP/1234567890-99123456789.json
   ```
   6. Now you are successfully logged in.


### InstallationId

Enter the below command to see your **InstallationId**.

```bash
truecallerjs --installationid
```

Print only installation Id.

```bash
truecallerjs -i -r
```

### Searching a number

```bash
~$ truecallerjs -s [number]
```

```yaml
{
   "data": [
      {
         "id": "jsiebejebbeebhee/dnss00w==",
         "name": "Sumith Emmadi",
         "imId": "1g7rm006b356o",
         "gender": "UNKNOWN",
         "image": "https://storage.googleapis.com/tc-images-noneu/myview/1/jdvdidbdhvdjdvddbkdbeiebeieb",
         "score": 0.9,
         "access": "PUBLIC",
         "enhanced": true,
         "phones": [
            {
               "e164Format": "+000000000000",
               "numberType": "MOBILE",
               "nationalFormat": "+000000000000",
               "dialingCode": 91,
               "countryCode": "IN",
               "carrier": "Airtel",
               "type": "openPhone"
            }
         ],
         "addresses": [
            {
               "city": "Andhra Pradesh",
               "countryCode": "IN",
               "timeZone": "+05:30",
               "type": "address"
            }
         ],
         "internetAddresses": [
            {
               "id": "email@gmail.com",
               "service": "email",
               "caption": "Sumith Emmadi",
               "type": "internetAddress"
            }
         ],
         "badges": [
            "verified",
            "user"
         ],
         "cacheTtl": "",
         "sources": [],
         "searchWarnings": [],
         "surveys": []
      }
   ],
   "provider": "ss-nu",
   "stats": {
      "sourceStats": []
   }
}
```

To get raw output.

```bash
~$ truecallerjs -r -s [number]

{"data":[{"id":"jsiebejebbeebhee/dnss00w==","name":"Sumith Emmadi","imId":"1g7rm006b356o","gender":"UNKNOWN","image":"https://storage.googleapis.com/tc-images-noneu/myview/1/jdvdidbdhvdjdvddbkdbeiebeieb","score":0.9,"access":"PUBLIC","enhanced":true,
"phones":[{"e164Format":"+000000000000","numberType":"MOBILE","nationalFormat":"+000000000000","dialingCode":91,"countryCode":"IN","carrier":"Airtel","type":"openPhone"}],"addresses":[{"city":"Andhra Pradesh","countryCode":"IN","timeZone":"+05:30","type":"address"}],
"internetAddresses":[{"id":"email@gmail.com","service":"email","caption":"Sumith Emmadi","type":"internetAddress"}],"badges":["verified","user"],"cacheTtl":"","sources":[],"searchWarnings":[],"surveys":[]}],"provider":"ss-nu","stats":{"sourceStats":[]}}
```

## To make a bulk number search 
```sh
~$ truecallerjs --bs [Numbers seperated by comma]
```

```bash
Example : 
 ~$ truecallerjs --bs 9912345678,+14051234567,+919987654321
 ```

To print only name.

```bash
~$ truecallerjs -s [number] --name

Name : Sumith Emmadi
Aternate name : sumithemmadi  ## print's alternate name if exist
```

Other command's

```bash
~$ truecallerjs -s [number] -r --name

Sumith Emmadi
```

### Output Formats

* 1 . JSON
* 2 . XML
* 3 . YAML
* 4 . TEXT
* 5 . HTML

#### To get only JSON output

```bash
~$ truecallerjs -s [number] --json
```

#### To get XML output

```bash
~$ truecallerjs -s [number] --xml
```

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
<root>
  <data>
    <id>jsiebejebbeebhee/dnss00w==</id>
    <name>Sumith Emmadi</name>
    <imId>1g7rm006b356o</imId>
    <gender>UNKNOWN</gender>
    <image>https://storage.googleapis.com/tc-images-noneu/myview/1/jdvdidbdhvdjdvddbkdbeiebeieb</image>
    <score>0.9</score>
    <access>PUBLIC</access>
    <enhanced>true</enhanced>
    <phones>
      <e164Format>+000000000000</e164Format>
      <numberType>MOBILE</numberType>
      <nationalFormat>+000000000000</nationalFormat>
      <dialingCode>91</dialingCode>
      <countryCode>IN</countryCode>
      <carrier>Airtel</carrier>
      <type>openPhone</type>
    </phones>
    <addresses>
      <city>Andhra Pradesh</city>
      <countryCode>IN</countryCode>
      <timeZone>+05:30</timeZone>
      <type>address</type>
    </addresses>
    <internetAddresses>
      <id>email@gmail.com</id>
      <service>email</service>
      <caption>Sumith Emmadi</caption>
      <type>internetAddress</type>
    </internetAddresses>
    <badges>verified</badges>
    <badges>user</badges>
    <cacheTtl>
    </cacheTtl>
    <sources/>
    <searchWarnings/>
    <surveys/>
  </data>
  <provider>ss-nu</provider>
  <stats>
    <sourceStats/>
  </stats>
</root>
```

#### To get YAML output

```bash
~$ truecallerjs -s [number] --yaml
```

```yaml
data: 
 - 
   id: "jsiebejebbeebhee/dnss00w=="
  name: "Sumith Emmadi"
  imId: 1g7rm006b356o
  gender: UNKNOWN
  image: "https://storage.googleapis.com/tc-images-noneu/myview/1/jdvdidbdhvdjdvddbkdbeiebeieb"
  score: 0.9
  access: PUBLIC
  enhanced: true
  phones: 
   - 
   e164Format: "+000000000000"
    numberType: MOBILE
    nationalFormat: "+000000000000"
    dialingCode: 91
    countryCode: IN
    carrier: "Airtel"
    type: openPhone
  addresses: 
   - 
   city: "Andhra Pradesh"
    countryCode: IN
    timeZone: "+05:30"
    type: address
  internetAddresses: 
   - 
   id: "email@gmail.com"
    service: email
    caption: "Sumith Emmadi"
    type: internetAddress
  badges: 
   - 
   verified
   - 
   user
  tags: 
  nameFeedback: 
   nameSource: 1
   nameElectionAlgo: ""
  cacheTtl: ""
  sources: 
  searchWarnings: 
  surveys: 
provider: "ss-nu"
stats: 
 sourceStats: 
```

#### To get output as a plain text

```bash
~$ truecallerjs -s [number] --text
```

```yaml
data                : 
id                  : jsiebejebbeebhee/dnss00w==
name                : Sumith Emmadi
imId                : 1g7rm006b356o
gender              : UNKNOWN
image               : https://storage.googleapis.com/tc-images-noneu/myview/1/jdvdidbdhvdjdvddbkdbeiebeieb
score               : 0.9
access              : PUBLIC
enhanced            : true
phones              : 
e164Format          : +000000000000
numberType          : MOBILE
nationalFormat      : +000000000000
dialingCode         : 91
countryCode         : IN
carrier             : Airtel
type                : openPhone
addresses           : 
city                : Andhra Pradesh
countryCode         : IN
timeZone            : +05:30
type                : address
internetAddresses   : 
id                  : email@gmail.com
service             : email
caption             : Sumith Emmadi
type                : internetAddress
badges              : verified, user
cacheTtl            :
sources             : []
searchWarnings      : []
surveys             : []
provider            : ss-nu
stats               :
sourceStats         : []
```

#### To get HTML output

```bash
~$ truecallerjs -s [number] --html
```

```xml
<table>
   <tr>
      <th>Properties</th>
      <th>Values</th>
   </tr>
   <tr>
      <td>data</td>
      <td>
   <tr>
      <td>id</td>
      <td>jsiebejebbeebhee/dnss00w==</td>
   </tr>
   <tr>
      <td>name</td>
      <td>Sumith Emmadi</td>
   </tr>
   <tr>
      <td>imId</td>
      <td>1g7rm006b356o</td>
   </tr>
   <tr>
      <td>gender</td>
      <td>UNKNOWN</td>
   </tr>
   <tr>
      <td>image</td>
      <td>https://storage.googleapis.com/tc-images-noneu/myview/1/jdvdidbdhvdjdvddbkdbeiebeieb</td>
   </tr>
   <tr>
      <td>score</td>
      <td>0.9</td>
   </tr>
   <tr>
      <td>access</td>
      <td>PUBLIC</td>
   </tr>
   <tr>
      <td>enhanced</td>
      <td>true</td>
   </tr>
   <tr>
      <td>phones</td>
      <td>
   <tr>
      <td>e164Format</td>
      <td>+000000000000</td>
   </tr>
   <tr>
      <td>numberType</td>
      <td>MOBILE</td>
   </tr>
   <tr>
      <td>nationalFormat</td>
      <td>+000000000000</td>
   </tr>
   <tr>
      <td>dialingCode</td>
      <td>91</td>
   </tr>
   <tr>
      <td>countryCode</td>
      <td>IN</td>
   </tr>
   <tr>
      <td>carrier</td>
      <td>Airtel</td>
   </tr>
   <tr>
      <td>type</td>
      <td>openPhone</td>
   </tr>
   </td></tr>
   <tr>
      <td>addresses</td>
      <td>
   <tr>
      <td>city</td>
      <td>Andhra Pradesh</td>
   </tr>
   <tr>
      <td>countryCode</td>
      <td>IN</td>
   </tr>
   <tr>
      <td>timeZone</td>
      <td>+05:30</td>
   </tr>
   <tr>
      <td>type</td>
      <td>address</td>
   </tr>
   </td></tr>
   <tr>
      <td>internetAddresses</td>
      <td>
   <tr>
      <td>id</td>
      <td>email@gmail.com</td>
   </tr>
   <tr>
      <td>service</td>
      <td>email</td>
   </tr>
   <tr>
      <td>caption</td>
      <td>Sumith Emmadi</td>
   </tr>
   <tr>
      <td>type</td>
      <td>internetAddress</td>
   </tr>
   </td></tr>
   <tr>
      <td>badges</td>
      <td>verified, user</td>
   </tr>
   <tr>
      <td>cacheTtl</td>
      <td></td>
   </tr>
   <tr>
      <td>sources</td>
      <td>[]</td>
   </tr>
   <tr>
      <td>searchWarnings</td>
      <td>[]</td>
   </tr>
   <tr>
      <td>surveys</td>
      <td>[]</td>
   </tr>
   </td></tr>
   <tr>
      <td>provider</td>
      <td>ss-nu</td>
   </tr>
   <tr>
      <td>stats</td>
      <td>
   <tr>
      <td>sourceStats</td>
      <td>[]</td>
   </tr>
   </td></tr>
</table>
```

## [Basic Usage](https://github.com/sumithemmadi/truecallerjs)

```bash
npm install truecallerjs
```

### Usage

```js
const truecallerjs = require('truecallerjs');

var searchData = {
    number: "[PHONE_NUMBER]",
    countryCode: "[COUNTRY_CODE]",
    installationId: "[INSTALLATION_ID]"
}

var sn = truecallerjs.searchNumber(searchData);
sn.then(function(response) {
    console.log(response)
});
```

If you want output in different format's.

```js
const truecallerjs = require('truecallerjs');

var searchData = {
    number: "[PHONE_NUMBER]",
    countryCode: "[COUNTRY_CODE]",
    installationId: "[INSTALLATION_ID]",
    output: "[FORMAT]"
}

var sn = truecallerjs.searchNumber(searchData);
sn.then(function(response) {
    console.log(response)
});
```

* **PHONE_NUMBER** : Number you want to search.
* **COUNTRY_CODE** : Country code you want to use by default . If mobile number is not in **E164**(International Format) Format then **COUNTRY_CODE** will be considered as a country code of that Mobile Number.
* **FORMAT** : Format of the output.
     1 . JSON
     2 . XML
     3 . YAML
     4 . TEXT
     5 . HTML

* **INSTALLATION_ID** : To know your InstallationId , install the package globally.

* **InstallationId**

```bash
npm install -g  truecallerjs
```

* [Login to you account](https://github.com/sumithemmadi/truecallerjs#Login).
* Enter the below command to see your **InstallationId**.

```bash
truecallerjs --installationid
```

### Examples

* **Example for JSON response.**

```js
const truecallerjs = require('truecallerjs');

var searchData = {
    number: "9912345678",
    countryCode: "IN",
    installationId: "a1k07--Vgdfyvv_rftf5uuudhuhnkljyvvtfftjuhbuijbhug",
    output: "JSON"
}

var sn = truecallerjs.searchNumber(searchData);
sn.then(function(response) {
    console.log(response)
});
```

Here mobile number is in national format and country code is indian.
So india is considered as a country code of that mobile number and response will be json format.

* **Example for XML response.**

```js
const truecallerjs = require('truecallerjs');

var searchData = {
    number: "+12093031250",
    countryCode: "IN",
    installationId: "a1k07--Vgdfyvv_rftf5uuudhuhnkljyvvtfftjuhbuijbhug",
    output: "XML"
}

var sn = truecallerjs.searchNumber(searchData);
sn.then(function(response) {
    console.log(response)
});
```

Here mobile number is in international format. So it is a US number.

* **Example for YAML response**

```js
const truecallerjs = require('truecallerjs');

var searchData = {
    number: "09912345678",
    countryCode: "IN",
    installationId: "a1k07--Vgdfyvv_rftf5uuudhuhnkljyvvtfftjuhbuijbhug",
    output: "YAML"
}

var sn = truecallerjs.searchNumber(searchData);
sn.then(function(response) {
    console.log(response)
});
```

* **Example for TEXT response**

```js
const truecallerjs = require('truecallerjs');

var searchData = {
    number: "09912345678",
    countryCode: "IN",
    installationId: "a1k07--Vgdfyvv_rftf5uuudhuhnkljyvvtfftjuhbuijbhug",
    output: "TEXT"
}

var sn = truecallerjs.searchNumber(searchData);
sn.then(function(response) {
    console.log(response)
});
```

* **Example for HTML Table**

```js
const truecallerjs = require('truecallerjs');

var searchData = {
    number: "09912345678",
    countryCode: "IN",
    installationId: "a1k07--Vgdfyvv_rftf5uuudhuhnkljyvvtfftjuhbuijbhug",
    output: "HTML"
}

var sn = truecallerjs.searchNumber(searchData);
sn.then(function(response) {
    console.log(response)
});
```

## Make a bulk search in your project.

```js
const truecallerjs = require('truecallerjs');

var countryCode = "IN";
var installationId = "a1k07--Vgdfyvv_rftf5uuudhuhnkljyvvtfftjuhbuijbhug";
var phoneNumbers = "+9912345678,+14051234567,+919987654321" // Phone numbers seperated by comma's

const searchResult = truecallerjs.bulkSearch(phoneNumbers,countryCode,installationId)
searchResult.then(function (response) {
    const data = JSON.stringify(response, null, 2);
    console.log(data);
})
```

## License

MIT License

Copyright (c) 2021 Emmadi Sumith Kumar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.