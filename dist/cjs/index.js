"use strict";
// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkSearch = exports.search = exports.verifyOtp = exports.login = void 0;
// Copyright (c) 2021 Emmadi Sumith Kumar
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
const login_js_1 = require("./login.js");
const verifyOtp_js_1 = require("./verifyOtp.js");
const search_js_1 = require("./search.js");
exports.login = login_js_1.login;
exports.verifyOtp = verifyOtp_js_1.verifyOtp;
exports.search = search_js_1.search;
exports.bulkSearch = search_js_1.bulkSearch;
const truecallerjs = {
    login: exports.login,
    verifyOtp: exports.verifyOtp,
    search: exports.search,
    bulkSearch: exports.bulkSearch,
};
exports.default = truecallerjs;
