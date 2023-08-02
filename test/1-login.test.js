// MIT License

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

// import truecallerjs from "../dist/index.js";

// 1-login.test.js

import { login } from "../dist/index.js";

describe("Login Tests", () => {
  test("should perform login", async () => {
    const phoneNumber = process.env.TEST_PHONE_NUMBER || "+919912345678";
    const result = await login(phoneNumber);
    // console.log(result);
    expect(result.status).toBeDefined();
    expect(result.message).toBeDefined();
    expect(result.parsedPhoneNumber).toBeDefined();
    expect(result.parsedCountryCode).toBeDefined();
    expect(result.requestId).toBeDefined();
    expect(result.method).toBeDefined();
    expect(result.tokenTtl).toBeDefined();
  });
});
