var net = require('net');
var client = new net.Socket();
client.setEncoding('utf8');
// connect to server
client.connect ('9001','10.0.0.158', function (conn) {
    console.log(conn);
    console.log('connected to server');
    client.write('Who needs a browser to communicate?');
});
// when receive data, send to server
process.stdin.on('data', function (data) {
    client.write(data);
});
// when receive data back, print to console
client.on('data',function(data) {
    console.log(data);
});

client.on('error',function(data) {
    console.log(data);
});

// when server closed
client.on('close',function() {
    console.log('connection is closed');
});
