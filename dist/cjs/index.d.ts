import { login as loginFunction } from "./login.js";
import { verifyOtp as verifyOtpFunction } from "./verifyOtp.js";
import { search as searchFunction, bulkSearch as bulkSearchFunction } from "./search.js";
export declare const login: typeof loginFunction;
export declare const verifyOtp: typeof verifyOtpFunction;
export declare const search: typeof searchFunction;
export declare const bulkSearch: typeof bulkSearchFunction;
declare const truecallerjs: {
    login: typeof loginFunction;
    verifyOtp: typeof verifyOtpFunction;
    search: typeof searchFunction;
    bulkSearch: typeof bulkSearchFunction;
};
export default truecallerjs;
