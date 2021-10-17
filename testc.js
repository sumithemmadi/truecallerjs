const colors = require('colors');

const stringOne = 'This is a plain string.';
const stringTwo = 'This string is red.'.red;
const stringThree = 'This string is blue.'.blue;
const today = new Date().toLocaleDateString(); // returns today's date in mm/dd/yyyy format

console.log(stringOne.black.bgMagenta);
console.log(stringOne.yellow.bgRed.bold);
console.log(`Today is: ${today}`.black.bgGreen);

console.log(stringTwo);
console.log(stringThree);

console.log(stringTwo.magenta);
console.log(stringThree.grey.bold);
