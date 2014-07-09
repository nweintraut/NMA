var http = require('http');
var options = {
	hostname: "localhost",
	path: "/",
	port: '3000',
	menthod: "POST"
};
function handleResponse(response){
	var serverData = "";
	response.on('data', function(chunk){
		serverData += chunk;
	});
	response.on('end', function(){
		console.log("Response Status: " + response.statusCode);
		console.log("Response Headers: " );
		console.dir(response.headers);
		console.log(serverData);
	});
};

function readJSONResponse(response){
	var responseData = '';
	response.on('data', function(chunk){
		responseData += chunk;
	});
	response.on('end', function(){
		var dataObj = JSON.parse(responseData);
		console.log("Raw Response: " + responseData);
		console.log("Message: ", dataObj.message);
		console.log("Question: " + dataObj.question);
	});
};
var req = http.request(options, function(response){
	handleResponse(response);
});
req.end();
