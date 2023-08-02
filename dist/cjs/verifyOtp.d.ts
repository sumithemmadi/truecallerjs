/**
 * Verifying mobile number with OTP
 *
 * @name truecallerjs.verifyOtp
 * @function verifyOtp
 * @param {string} phonenumber - Phone number in international format.
 * @param {Object} json_data - JSON response of the login(phonenumber) function.
 * @param {string} otp - 6-digit OTP.
 * @returns {Promise<Object>} - JSON output containing the installationId.
 *
 * Follow this documentation for more details: https://github.com/sumithemmadi/truecallerjs/tree/main/docs
 */
declare function verifyOtp(phonenumber: string, json_data: any, otp: string): Promise<object>;
export { verifyOtp };
