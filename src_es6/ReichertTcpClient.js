"use strict";

import net from "net";
import _ from 'lodash';
import Promise from 'bluebird';

const PORT = 9001;
const IP = '10.0.0.158';

class ReichertTcpClient {
    constructor(){
        this.client = new net.Socket();
        this.client.setEncoding('utf8');
        this.init();
    }
    connect() {
        this.client.connect(PORT,IP,() => {
            console.log('-- connected to server -- ');
        });
    }
    init() {
        this.connect();
        this.client.on('data',(data) => {
            if(data.search('# you are now on the IOE-Command-Interface') !== -1) {
                this.write('login api api');
            }else  if(data.search('# welcome api') !== -1) {
                this.write('context client 1');
            }else if(data.search('# context = CLIENT') !== -1) {
                this.write('main.action.login 0');
            }else if(data.search('#') !== -1){
                    //
            }else{
                console.log(' -- data received -- ');
                console.log(this.client.bytesRead);
                console.log(data);
                let arr = data.split(/\n\r/);
                console.log(arr);
            }
        });

        this.client.on('close',() => {
            console.log('connection is closed');
        });
        this.client.on('drain',() => {
            console.log('empty buffer');
        });

        this.client.on("end", () => {

        })
    }

    write(str) {
        this.client.write(str+' '+"\r\n");
    }
}

exports.Rtc = ReichertTcpClient;