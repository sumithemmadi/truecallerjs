import axios from 'axios';
import https from 'https';
// updated user agent and headers to avoid blocking
/**
 * Axios instance with default headers and configuration for Truecaller API.
 *
 * Configured with:
 * - IPv4 forcing to prevent timeout issues on some networks.
 * - Authenticated User-Agent to mimic the Android app.
 * - Gzip compression support.
 */
const request = axios.create({
    httpsAgent: new https.Agent({ family: 4 }),
    headers: {
        "user-agent": "Truecaller/12.0.0 (Android;10)",
        "accept-encoding": "gzip",
        "content-type": "application/json; charset=UTF-8",
    },
});
export default request;
