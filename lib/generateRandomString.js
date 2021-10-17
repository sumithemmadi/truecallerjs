"use strict";

var crypto = require('crypto');
var randomBytes = require('randombytes');
var Charset = require('./charset.js');

function safeRandomBytes(length) {
  while (true) {
    try {
      return randomBytes(length);
    } catch(e) {
      continue;
    }
  }
}

function processString(buf, initialString, chars, reqLen, maxByte) {
  var string = initialString;
  for (var i = 0; i < buf.length && string.length < reqLen; i++) {
    var randomByte = buf.readUInt8(i);
    if (randomByte < maxByte) {
      string += chars.charAt(randomByte % chars.length);
    }
  }
  return string;
}

function getAsyncString(string, chars, length, maxByte, cb) {
  crypto.randomBytes(length, function(err, buf) {
    if (err) {
      // Since it is waiting for entropy, errors are legit and we shouldn't just keep retrying
      cb(err);
    }
    var generatedString = processString(buf, string, chars, length, maxByte);
    if (generatedString.length < length) {
      getAsyncString(generatedString, chars, length, maxByte, cb);
    } else {
      cb(null, generatedString);
    }
  })
}

exports.generate = function(options, cb) {
  var charset = new Charset();

  var length, chars, capitalization, string = '';

  // Handle options
  if (typeof options === 'object') {
    length = options.length || 32;

    if (options.charset) {
      charset.setType(options.charset);
    }
    else {
      charset.setType('alphanumeric');
    }

    if (options.capitalization) {
      charset.setcapitalization(options.capitalization);
    }

    if (options.readable) {
      charset.removeUnreadable();
    }

    charset.removeDuplicates();
  }
  else if (typeof options === 'number') {
    length = options;
    charset.setType('alphanumeric');
  }
  else {
    length = 32;
    charset.setType('alphanumeric');
  }

  // Generate the string
  var charsLen = charset.chars.length;
  var maxByte = 256 - (256 % charsLen);

  if (!cb) {
    while (string.length < length) {
      var buf = safeRandomBytes(Math.ceil(length * 256 / maxByte));
      string = processString(buf, string, charset.chars, length, maxByte);
    }

    return string;
  }

  getAsyncString(string, charset.chars, length, maxByte, cb);

};
