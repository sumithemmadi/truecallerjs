#!/usr/bin/env node

var util = require('util');
const yargs = require('yargs');
var PhoneNumber = require( 'awesome-phonenumber' );


function get_json_response(number) {
    var pn = new PhoneNumber(number,'IN');
    var data = JSON.stringify( pn, null, 4 );
    return data;
}



const argv = yargs
    .usage('Login : $0 login +919912345678\n  Usage : $0 -s +919912345678')
    .command('login', '(login to truecaller)', {
        number: {
            description: 'number',
            type: 'number',
        }
    })
    .option('search', {
        alias: 's',
        description: 'To search caller id of a number',
        type: 'charecter',
    })
    .option('json', {
         alias :'json',
         description: 'To print output in json',
         type: 'boolean',
    })
    .help()
    .alias('help', 'h')
    .argv;

if (argv._[0] == 'login') {
     console.log ("Login");
     process.exit();
}

if (argv.s) {
    var pn = get_json_response(argv.s);
    if (pn.valid) {
        console.log("!invalid number");
        return false;
    } else {
        console.log(pn);
    }
}
