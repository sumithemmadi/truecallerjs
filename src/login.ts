
import request from "./utils/request.js";
import { parsePhoneNumber } from "awesome-phonenumber";
import { device } from "./data/phones.js";

interface LoginResponse {
  status: number;
  message: string;
  domain: string;
  parsedPhoneNumber: number;
  parsedCountryCode: string;
  requestId: string;
  method: string;
  tokenTtl: number;
}

function generateRandomString(length: number): string {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

/**
 * Login to Truecaller.
 *
 * @param {string} phoneNumber - Phone number in international format.
 * @returns {Promise<LoginResponse>} - Promise that resolves to the login response containing the requestId used for OTP verification.
 */
async function login(phoneNumber: string): Promise<LoginResponse> {
  const pn = parsePhoneNumber(phoneNumber);

  if (!pn?.valid) {
    throw new Error("Invalid phone number.");
  }

  const postUrl =
    "https://account-noneu.truecaller.com/v2/sendOnboardingOtp";

  const data = {
    countryCode: pn.regionCode,
    dialingCode: pn.countryCode,
    installationDetails: {
      app: {
        buildVersion: 5,
        majorVersion: 11,
        minorVersion: 7,
        store: "GOOGLE_PLAY",
      },
      device: {
        deviceId: generateRandomString(16),
        language: "en",
        // Using a realistic Xiaomi device profile to reduce the chance of spam detection/blocking by Truecaller.
        manufacturer: "Xiaomi",
        model: "M2010J19SI",
        osName: "Android",
        osVersion: "10",
        mobileServices: ["GMS"],
      },
      language: "en",
    },
    phoneNumber: pn.number.significant,
    region: "region-2",
    sequenceNo: 2,
  };

  const options = {
    method: "POST",
    headers: {
      clientsecret: "lvc22mp3l1sfv6ujg83rd17btt",
    },
    url: postUrl,
    data,
  };

  // Send the onboarding OTP request
  const res = await request(options);
  return res.data;
}

export { login };
