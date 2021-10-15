#!/usr/bin/env node

// var argv = require('minimist')(process.argv.slice(2));
// console.log(argv);
var util = require('util');
const yargs = require('yargs');

const argv = yargs
//    .usage('Usage: $0 -w [num] -yh[num]')
//    .demand(['w','h'])
    .command('login', 'login to truecaller', {
        number: {
            description: 'number',
            alias: 'n',
            type: 'number',
        }
    })
    .option('search', {
        alias: 's',
        description: 'To search caller id of a number',
        type: 'charecter',
    })
    .help()
    .alias('help', 'h')
    .argv;

if (argv.search) {
    console.log('The current time is: ', argv.s);
}

if (argv._.includes('login')) {
   // const year = argv.year || new Date().getFullYear();
   // if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {
     //   console.log(`${year} is a Leap Year`);
   // } else {
     //   console.log(`${year} is NOT a Leap Year`);
  //  }
     console.log ("Login");
}

console.log(argv);
