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
/**
 * Login to Truecaller.
 *
 * @param {string} phoneNumber - Phone number in international format.
 * @returns {Promise<LoginResponse>} - Promise that resolves to the login response containing the requestId used for OTP verification.
 */
declare function login(phoneNumber: string): Promise<LoginResponse>;
export { login };
