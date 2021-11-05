<h1 align="center" id="truecallerjs"><a href="https://github.com/sumithemmadi/truecallerjs">Truecallerjs</a></h1>

<div align="center">
<a href="https://www.npmjs.com/package/truecallerjs"><img src="https://img.shields.io/npm/v/truecallerjs.svg" alt="Version"></a>
<a href="https://github.com/sumithemmadi/truecallerjs/stargazers"><img src="https://img.shields.io/github/stars/sumithemmadi/truecallerjs" alt="Stars"></a>
<a href="https://github.com/sumithemmadi/truecallerjs"><img src="https://img.shields.io/npm/dt/truecallerjs.svg" alt="weekly Download"></a>
<a href="https://github.com/sumithemmadi/truecallerjs/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/truecallerjs.svg" alt="License"></a>
<a href="https://github.com/sumithemmadi/truecallerjs#license"><img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2Fsumithemmadi%2Ftruecallerjs.svg?type=shield" alt="FOSSA Status"></a>
<a href="https://github.com/sumithemmadi/truecallerjs"><img src="https://img.shields.io/npms-io/maintenance-score/truecallerjs" alt="Maintenance"></a>
<a href="https://github.com/sumithemmadi/truecallerjs/issues"><img src="https://img.shields.io/github/issues/sumithemmadi/truecallerjs" alt="issues"></a>
<a href="https://github.com/sumithemmadi/truecallerjs"><img src="https://snyk.io/test/npm/truecallerjs/badge.svg" alt="Known Vulnerabilities"></a>
<br>
<br>
<p>A simple  package to search phone number details.</p>
</div>

## Requirements
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
                    "carrier": "Vodafone Idea",
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
"phones":[{"e164Format":"+000000000000","numberType":"MOBILE","nationalFormat":"+000000000000","dialingCode":91,"countryCode":"IN","carrier":"Vodafone Idea","type":"openPhone"}],"addresses":[{"city":"Andhra Pradesh","countryCode":"IN","timeZone":"+05:30","type":"address"}],
"internetAddresses":[{"id":"email@gmail.com","service":"email","caption":"Sumith Emmadi","type":"internetAddress"}],"badges":["verified","user"],"cacheTtl":"","sources":[],"searchWarnings":[],"surveys":[]}],"provider":"ss-nu","stats":{"sourceStats":[]}}
```

To print only name.
```bash
~$ truecallerjs -s [number] --name

Name : Sumith Emmadi
```

Other command's
```bash
~$ truecallerjs -s [number] -r --name

Sumith Emmadi
```
### Output Formates
- 1 . JSON
- 2 . XML
- 3 . YAML

#### To get only JSON output
```bash
~$ truecallerjs -s [number] --json
```

#### To get XML output
```bash
~$ truecallerjs -s [number] --xml
```
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<root>
   <data>
     <item0>
	<id>jsiebejebbeebhee/dnss00w==</id>
	<name>Sumith Emmadi</name>
	<imId>1g7rm006b356o</imId>
	<gender>UNKNOWN</gender>
	<image>https://storage.googleapis.com/tc-images-noneu/myview/1/jdvdidbdhvdjdvddbkdbeiebeieb</image>
	<score>0.9</score>
	<access>PUBLIC</access>
	<enhanced>1</enhanced>
	<phones>
		<item0>
			<e164Format>+000000000000</e164Format>
			<numberType>MOBILE</numberType>
			<nationalFormat>+000000000000</nationalFormat>
			<dialingCode>91</dialingCode>
			<countryCode>IN</countryCode>
			<carrier>Vodafone Idea</carrier>
			<type>openPhone</type>
		</item0>
	</phones>
	<addresses>
		<item0>
			<city>Andhra Pradesh</city>
			<countryCode>IN</countryCode>
			<timeZone>+05:30</timeZone>
			<type>address</type>
		</item0>
	</addresses>
	<internetAddresses>
		<item0>
			<id>email@gmail.com</id>
			<service>email</service>
			<caption>Sumith Emmadi</caption>
			<type>internetAddress</type>
		</item0>
	</internetAddresses>
	<badges>
		<item0>verified</item0>
		<item1>user</item1>
	</badges>
	<cacheTtl/>
	<sources/>
	<searchWarnings/>
	<surveys/>
      </item0>
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
    carrier: "Vodafone Idea"
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

### InstallationId

Enter the below command to see your **InstallationId**.
```bash
truecallerjs --installationid
```
Print only installation Id.
```bash
truecallerjs -i -r
```


## [Basic Usage](https://github.com/sumithemmadi/truecallerjs)

### Installation

```bash
npm install truecallerjs
```

### Usage
```js
const truecallerjs = require('truecallerjs');

var searchData = {
                number: "[PHONE_NUMBER]",
                countryCode: "[COUNTRY_CODE]",
                installationId: "[INSTALLATION_ID]",
                output: "[FORMATE]"
        }

var sn = truecallerjs.searchNumber(searchData);
sn.then(function(response) {
    console.log(response)
});

```
- **PHONE_NUMBER** : Number you want to search.
- **COUNTRY_CODE** : Country code you want to use by default . If mobile number is not in **E164**(International formate) Format then **COUNTRY_CODE** will be considered as a country code of that Mobile Number.
- **FORMATE** : Formate of the output.
     1. JSON
     2. XML
     3. YAML

- **INSTALLATION_ID** : To know your InstallationId , install the package globally.

-  **InstallationId**
```bash
npm install -g  truecallerjs
```
- [Login to you account](https://github.com/sumithemmadi/truecallerjs#Login).
- Enter the below command to see your **InstallationId**.

```bash
truecallerjs --installationid
```
### Example
Here mobile number is in national formate and country code is india.
So india is considered as a country code of that mobile number
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
Here mobile number is in international formate. So it is a US number

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


## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fsumithemmadi%2Ftruecallerjs.svg?type=large)](https://github.com/sumithemmadi/truecallerjs/)
