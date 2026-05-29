const path = require('path');
const os = require('os');
const fs = require('fs');
const EventEmitter = require('events');
const customModule = require('./functions');
const Emitter = new EventEmitter();






console.log(__filename);
console.log(__dirname);

let baseName = path.basename(__filename);

console.log('basename:' + baseName);


let extname = path.extname(__filename);
console.log('extension name:' + extname);

console.log(os.hostname());
console.log(os.cpus());
console.log(os.totalmem());
console.log(os.freemem());


fs.readFile('./index.js', 'utf-8', function (err, data) {
    if(err) console.log('Error reading file' + err);
    else
    console.log('file content ' + data)
});
Emitter.on('error' , () => {
    console.log('Error happened');
});
Emitter.emit('error');

console.log(customModule.name);
customModule.greet();
