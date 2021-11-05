var util = require('util');

var settings = {
    attributes_key: false,
    header: false
};

function json2xml(json, opts) {
    "use strict";
    if (opts) {
        Object.keys(settings).forEach(function (k) {
            if (opts[k] === undefined) {
                opts[k] = settings[k];
            }
        });
    } else {
        opts = settings;
    }

    var result = opts.header ? '<?xml version="1.0" encoding="UTF-8"?>' : '';
    opts.header = false;

    if (json instanceof Array) { //Array
        json.forEach(function (node) {
            result += json2xml(node, opts);
        });
    } else if (typeof json === 'object') {
        Object.keys(json).forEach(function (key) {
            if (key !== opts.attributes_key) {
                var node = json[key],
                    attributes = '';

                if (node === undefined || node === null) {
                    node = '';
                }

                if (opts.attributes_key && json[opts.attributes_key]) {
                    Object.keys(json[opts.attributes_key]).forEach(function (k) {
                        attributes += util.format(' %s="%s"', k, json[opts.attributes_key][k]);
                    });
                }
                var inner = json2xml(node, opts);

                if (inner) {
                    result += util.format("<%s%s>%s</%s>", key, attributes, json2xml(node, opts), key);
                } else {
                    result += util.format("<%s%s/>", key, attributes);
                }
            }
        });
    } else {
        if (json.toString().match(/^<\!\[CDATA\[.*]]>$/)) {
            return json.toString();
        }
        return json.toString().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    return result;
};

module.exports.json2xml = json2xml;
