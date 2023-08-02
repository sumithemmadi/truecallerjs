"use strict";
// MIT License
Object.defineProperty(exports, "__esModule", { value: true });
exports.device = void 0;
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
const phones_list = [
    {
        manufacturer: "Xiaomi",
        model: "M2010J19SG",
    },
    {
        manufacturer: "Xiaomi",
        model: "POCO F1",
    },
    {
        manufacturer: "Xiaomi",
        model: "Redmi 9A",
    },
    {
        manufacturer: "Xiaomi",
        model: "Xiaomi Mi 4",
    },
    {
        manufacturer: "Xiaomi",
        model: "Redmi Note 10 pro",
    },
    {
        manufacturer: "Xiaomi",
        model: "Redmi Note 10",
    },
    {
        manufacturer: "Xiaomi",
        model: "Xiaomi Redmi 1S",
    },
    {
        manufacturer: "Xiaomi",
        model: "Xiaomi Mi 10T",
    },
    {
        manufacturer: "Xiaomi",
        model: "Xiaomi Redmi 6 Pro",
    },
    {
        manufacturer: "Xiaomi",
        model: "Xiaomi Redmi Y3",
    },
    {
        manufacturer: "Xiaomi",
        model: "Xiaomi Redmi 9 Prime",
    },
    {
        manufacturer: "Xiaomi",
        model: "Redmi Note 7",
    },
    {
        manufacturer: "Vivo",
        model: "Vivo Y33s",
    },
    {
        manufacturer: "Vivo",
        model: "Vivo V21 5G",
    },
    {
        manufacturer: "Vivo",
        model: "Vivo Y20T",
    },
    {
        manufacturer: "Vivo",
        model: "Vivo Y73 2021",
    },
    {
        manufacturer: "Vivo",
        model: "Vivo X60",
    },
    {
        manufacturer: "Vivo",
        model: "Vivo X70 Pro 5G",
    },
    {
        manufacturer: "Vivo",
        model: "Vivo U3x",
    },
    {
        manufacturer: "Vivo",
        model: "Vivo V20 Pro",
    },
    {
        manufacturer: "Vivo",
        model: "Vivo Y21 2021",
    },
    {
        manufacturer: "Vivo",
        model: "Vivo Y53s",
    },
    {
        manufacturer: "Vivo",
        model: "Vivo S12 Pro",
    },
    {
        manufacturer: "Vivo",
        model: "Vivo V21e 5G",
    },
    {
        manufacturer: "OnePlus",
        model: "OnePlus Nord CE 5G",
    },
    {
        manufacturer: "OnePlus",
        model: "OnePlus 9 Pro",
    },
    {
        manufacturer: "OnePlus",
        model: "OnePlus 8T",
    },
    {
        manufacturer: "OnePlus",
        model: "OnePlus 9",
    },
    {
        manufacturer: "OnePlus",
        model: "OnePlus 7T",
    },
    {
        manufacturer: "OnePlus",
        model: "OnePlus 6T",
    },
    {
        manufacturer: "OnePlus",
        model: "OnePlus Nord 2",
    },
    {
        manufacturer: "OnePlus",
        model: "OnePlus 7 Pro",
    },
    {
        manufacturer: "OnePlus",
        model: "OnePlus Nord",
    },
    {
        manufacturer: "Realme",
        model: "RMX2185",
    },
    {
        manufacturer: "Realme",
        model: "Realme GT Neo2 5G",
    },
    {
        manufacturer: "Realme",
        model: "Realme 8 5G",
    },
    {
        manufacturer: "Realme",
        model: "Realme C11 2021",
    },
    {
        manufacturer: "Realme",
        model: "Realme GT",
    },
    {
        manufacturer: "Realme",
        model: "Realme Narzo 30",
    },
    {
        manufacturer: "Realme",
        model: "Realme Q3i 5G",
    },
    {
        manufacturer: "Realme",
        model: "Realme 8s 5G",
    },
    {
        manufacturer: "Realme",
        model: "Realme 8i",
    },
    {
        manufacturer: "Realme",
        model: "Realme Narzo 50A",
    },
    {
        manufacturer: "Realme",
        model: "Realme C21Y",
    },
    {
        manufacturer: "Oppo",
        model: "OPPO A55",
    },
    {
        manufacturer: "Oppo",
        model: "OPPO A74 5G",
    },
    {
        manufacturer: "Oppo",
        model: "OPPO A53",
    },
    {
        manufacturer: "Oppo",
        model: "OPPO A31",
    },
    {
        manufacturer: "Oppo",
        model: "OPPO A12",
    },
    {
        manufacturer: "Oppo",
        model: "OPPO Reno6 Pro",
    },
    {
        manufacturer: "Oppo",
        model: "OPPO Reno6",
    },
    {
        manufacturer: "Oppo",
        model: "OPPO F19 Pro",
    },
    {
        manufacturer: "Oppo",
        model: "OPPO F19s",
    },
    {
        manufacturer: "Oppo",
        model: "Oppo F19 Pro+",
    },
    {
        manufacturer: "Oppo",
        model: "Oppo A33",
    },
    {
        manufacturer: "Oppo",
        model: "Oppo Reno 3 Pro",
    },
    {
        manufacturer: "Oppo",
        model: "Oppo Reno 4 Pro",
    },
    {
        manufacturer: "Oppo",
        model: "Oppo Find X2",
    },
    {
        manufacturer: "Oppo",
        model: "OPPO F15",
    },
    {
        manufacturer: "Oppo",
        model: "OPPO Reno 2F",
    },
    {
        manufacturer: "Oppo",
        model: "OPPO K3",
    },
    {
        manufacturer: "Oppo",
        model: "OPPO A9",
    },
    {
        manufacturer: "Oppo",
        model: "OPPO A1k",
    },
    {
        manufacturer: "Oppo",
        model: "OPPO A5s",
    },
    {
        manufacturer: "Samsung",
        model: "Samsung Galaxy M31s",
    },
    {
        manufacturer: "Samsung",
        model: "Samsung Galaxy M32",
    },
    {
        manufacturer: "Samsung",
        model: "Samsung Galaxy F62",
    },
    {
        manufacturer: "Samsung",
        model: "Samsung Galaxy M52 5G",
    },
    {
        manufacturer: "Samsung",
        model: "Samsung Galaxy M12",
    },
    {
        manufacturer: "Samsung",
        model: "Samsung Galaxy M51",
    },
    {
        manufacturer: "Samsung",
        model: "Samsung Galaxy F12",
    },
    {
        manufacturer: "Samsung",
        model: "Samsung Galaxy F22",
    },
    {
        manufacturer: "Samsung",
        model: "Samsung Galaxy A52",
    },
    {
        manufacturer: "Samsung",
        model: "Samsung Galaxy S20 FE 5G",
    },
    {
        manufacturer: "Samsung",
        model: "Samsung Galaxy M52",
    },
    {
        manufacturer: "Samsung",
        model: "Samsung Galaxy M62",
    },
    {
        manufacturer: "Samsung",
        model: "Samsung Galaxy S21 Ultra",
    },
    {
        manufacturer: "Samsung",
        model: "Samsung Galaxy A52s 5G",
    },
    {
        manufacturer: "Samsung",
        model: "Samsung Galaxy S21",
    },
    {
        manufacturer: "Samsung",
        model: "Samsung Galaxy M21 2021",
    },
    {
        manufacturer: "Samsung",
        model: "Samsung Galaxy F42",
    },
    {
        manufacturer: "Samsung",
        model: "Samsung Galaxy A12",
    },
    {
        manufacturer: "Samsung",
        model: "Samsung Galaxy F41",
    },
    {
        manufacturer: "Samsung",
        model: "Samsung Galaxy M01 Core",
    },
];
const getRandomDevice = () => {
    const randomIndex = Math.floor(Math.random() * phones_list.length);
    return phones_list[randomIndex];
};
const device = getRandomDevice();
exports.device = device;
