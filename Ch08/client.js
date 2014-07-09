var net = require('net');
var client = net.connect({port: 3000, host: 'localhost'}, function(){
	console.log('Client connected');
	client.write('Some Data\r\n');
});
client.on('data', function(data){
	console.log(data.toString());
	client.end();
});
client.on('end', function(){
	console.log('Client disconnected');
});