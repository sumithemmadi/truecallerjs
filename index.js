#!/usr/bin/env node

var util = require('util');
const yargs = require('yargs');
var PhoneNumber = require( 'awesome-phonenumber' );

const argv = yargs
//    .usage('Usage: $0 -w [num] -yh[num]')
//    .demand(['w','h'])
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
    var pn = PhoneNumber( argv.s, 'IN' );
    //console.log(JSON.stringify( pn, null, 4 ));
    if (!pn.isValid( )) {
        console.log("!invalid number");
        return false;
    } else {
        console.log(JSON.stringify( pn, null, 4 ));
    }
}
