"use strict";

import fs from "fs";

fs.exists('./logs.txt', (exists) => {
    if(!exists){
        fs.appendFile('./logs.txt','',(err)=>{
            if(err) {
                //console.log(err);
            }
        })
    }
});
const writeStream = fs.createWriteStream('./logs.txt', {
    "flags": "w",
    "encoding": "utf8",
    "mode": 0o666,
    "autoClose": true
});

class Logger {
    constructor() {
        writeStream.on('open', () => {
            console.log('-- log file opened --');
        });
    }

    writeToLog(obj){
        console.log('-- write to log --');
        obj['timestamp'] = new Date();
        let str = JSON.stringify(obj, null, 4);
        writeStream.write(str+ '\n', 'utf8', function(err){
            if(err) {
                //console.log(err);
            }
        })
    }
}

exports._logger = Logger;