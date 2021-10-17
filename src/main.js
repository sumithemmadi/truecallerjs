
// User login function
function userLogin(number, regionCode, countryCode, internationalNumber) {
  return true;
}
  
//search number function
function searchNumber(number, regionCode, countryCode, internationalNumber) {
  return true;
}

function dec2hex (dec) {
  return dec.toString(16).padStart(2, "0")
}

// generateRandomString :: Integer -> String
function authenticationRequest (stringLength) {
  var arr = new Uint8Array((stringLength || 40) / 2)
  window.crypto.getRandomValues(arr)
  return Array.from(arr, dec2hex).join('')
}

function getRandomNumber(length) {
  return Math.floor(Math.pow(10, length-1) + Math.random() * 9 * Math.pow(10, length-1));
}

function authenticationRequest(number, regionCode, countryCode, internationalNumber) {
  let postdata = {
    'countryCode': regionCode,
    'dialingCode': countryCode,
    'installationDetails': {
      'app': {
        'buildVersion': 5,
        'majorVersion': 11,
        'minorVersion': 75,
        'store': 'GOOGLE_PLAY'
      },
      'device': {
        'deviceId': generateRandomString(16),
        'language': 'en',
        'manufacturer': 'Xiaomi',
        'mobileServices': ['GMS'],
        'model': 'M2010J19SG',
        'osName': 'Android',
        'osVersion': '10',
        'simSerials': [ getRandomNumber(19), getRandomNumber(20)]
      },
      'language': 'en',
      'sims': [{
        'imsi': getRandomNumber(15),
        'mcc': '413',
        'mnc': '2',
        'operator': None
      }]
    },
    'phoneNumber': number,
    'region': 'region-2',
    'sequenceNo': '2'
  }

  let headers = {
    'content-type': 'application/json; charset=UTF-8',
    'accept-encoding': 'gzip',
    'user-agent': 'Truecaller/11.75.5 (Android;10)',
    'clientsecret': 'lvc22mp3l1sfv6ujg83rd17btt'
  }
  let requestResp = sumthing.post('https://account-asia-south1.truecaller.com/v2/sendOnboardingOtp', headers = headers, json = postdata)
  if (requestResp.json()['status'] == 1 or requestResp.json()['status'] == 9) {
    return req.json()['requestId']
  } else {
    return False, req.json()['message']
  }
}

function authenticateOTP(id_, number, pin):
    jsonData = {'countryCode':'', 'dialingCode':None, 'phoneNumber':num, 'requestId':id_, 'token':pin}
    headers = {'content-type':'application/json; charset=UTF-8', 'accept-encoding':'gzip', 'user-agent':'Truecaller/11.75.5 (Android;10)', 'clientsecret':'lvc22mp3l1sfv6ujg83rd17btt'}
    req = requests.post('https://account-asia-south1.truecaller.com/v1/verifyOnboardingOtp', headers=headers, json=jsonData)
    if (req.json()['status'] == 11)
        return False, 'OTP code is invalid'
    elseif (req.json()['status'] == 2 and req.json()['suspended']) {
        return False, 'oops.. your account got suspended. try another number :('
    } else {
        return req.json()['installationId']
    }
}
