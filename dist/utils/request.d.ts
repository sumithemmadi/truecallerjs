/**
 * Axios instance with default headers and configuration for Truecaller API.
 *
 * Configured with:
 * - IPv4 forcing to prevent timeout issues on some networks.
 * - Authenticated User-Agent to mimic the Android app.
 * - Gzip compression support.
 */
declare const request: import("axios").AxiosInstance;
export default request;
