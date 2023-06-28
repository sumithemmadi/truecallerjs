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
Object.defineProperty(exports, "login", { enumerable: true, get: function () { return login_js_1.login; } });
const verifyOtp_js_1 = require("./verifyOtp.js");
Object.defineProperty(exports, "verifyOtp", { enumerable: true, get: function () { return verifyOtp_js_1.verifyOtp; } });
const search_js_1 = require("./search.js");
Object.defineProperty(exports, "search", { enumerable: true, get: function () { return search_js_1.search; } });
Object.defineProperty(exports, "bulkSearch", { enumerable: true, get: function () { return search_js_1.bulkSearch; } });
