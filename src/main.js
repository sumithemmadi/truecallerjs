const axios = require('axios')

function userLogin(number, regionCode, countryCode, internationalNumber) {
    console.log("Sending OTP to".yellow, internationalNumber.yellow);
    let params = {
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
                mobileServices: ["GMS"]
            },
            language: "en"
        },
        phoneNumber: number,
        region: "region-2",
        sequenceNo: 2
    };
    const axiosInstance = axios.create({
        headers: {
            "content-type": "application/json; charset=UTF-8",
            "accept-encoding": "gzip",
            "user-agent": "Truecaller/11.75.5 (Android;10)",
            clientsecret: "lvc22mp3l1sfv6ujg83rd17btt"
        }
    });

    return axiosInstance
        .post(
            "https://account-asia-south1.truecaller.com/v2/sendOnboardingOtp",
            params
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

function generateRandomString(length) {
    var result = "";
    var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
module.exports.userLogin = userLogin
