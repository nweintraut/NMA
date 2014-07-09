var fs = require('fs');
var http = require('http');
var url = require ('url');
var ROOT_DIR = "html";
var messages = ['Hello World', 'From a basic Node.js server', 'Take Luck'];

/*
http.createServer(function(req,res){
	res.setHeader("Content-Type", "text/html");
	res.writeHead(200);
	res.write('<html><head><title>Simple HTTP</title></head>');
	res.write('<body>');
	for (var index in messages){
		res.write('\n<h1>' + messages[index] + '</h1>');
	}
	res.end('\n</body></html>');
}).listen(3000, function(){
	console.log("Listening");
});
*/
http.createServer(function(req, res){
	var jsonData = "";
	req.on('data', function(chunk){
		jsonData += chunk;
	});
	req.on('end', function(){
		var reqObj = JSON.parse(jsonData);
		var resObj = {
			message: "Hello " + reqObj.name,
			question: "Are you a good " + reqObj.occupation +"?"
		};
		res.writeHead(200);
		res.end(JSON.stringify(resObj));
	});
}).listen(3000, function(stuff){
	console.dir(stuff);
	console.log("listening");
})
/*
http.createServer(function(req, res){
	var urlObj = url.parse(req.url, true, false);
	fs.readFile(ROOT_DIR + urlObj.pathname, function(err, data){
		if (err){
			res.writeHead(404);
			res.end(JSON.stringify(err));
			return;
		} else {
			res.writeHead(200);
			res.end(data);
		}
	});
}).listen(3000, function(){
	console.log("Listening");
});
*/