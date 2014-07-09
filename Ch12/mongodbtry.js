var mongoDB = require('mongodb');
var MongoClient = mongoDB.MongoClient;
var MongoServer = mongoDB.Server;
var format = require('util').format;
/*
var MONGOHQ_URL = 'mongodb://neil:goober@alex.mongohq.com:10011/node3';
var client = MongoClient.connect(MONGOHQ_URL, function(err, db){
	if (err) throw err;
	console.dir("ok");
	var collection = db.collection('test_insert');
	collection.insert({a:2}, function (err, docs){
		if (err) console.log(err);
		collection.count(function(err, count){
			console.log(format("count = %s", count));
			collection.find().toArray(function(err, results){
				if(err) console.log(err);
				console.dir(results);
				db.close();
			})
		});
	});
});
*/
var dbAdmin = function(db){
	var adminDB = db.admin();
	adminDB.listDatabases(function(err, databases){
		console.dir(databases);
	});
}
var client = new MongoClient(new MongoServer('alex.mongohq.com', 10011, 
	{socketOptions: {connectionTImeoutMS: 500}, poolSize: 5, auto_reconnect: true}, 
	{numberOfRetries: 3, retryMilliSeconds: 500}
));

client.open(function(err, client){
	if(err) {
		console.log("Connection failed via Client Object.");
	} else {
		var db = client.db("node3");

		if (db) {
			console.log("Connected Via Client Object . . .");
			db.authenticate("neil", "goober", function(err, results){
				if (err){
					console.log("Authentication failed");
					client.close();
					console.log("Connection closed");
				} else {
					console.log("Authenticated Via Client Object...");
					db.collectionNames(function(err, collectionNames){
						if (err) { 
							console.log(err);
						} else {
							console.dir(collectionNames);
						}
					});
					var collection = db.collection('test_insert');
					collection.insert({a:2}, function (err, docs){
						if (err) console.log(err);
						collection.count(function(err, count){
							console.log(format("count = %s", count));
							collection.find().toArray(function(err, results){
								if(err) console.log(err);
								console.dir(results);
								db.logout(function(err, result){
									if (!err){
										console.log("Logged out via client object...");
									} 
									client.close();
									console.log("Connection closed");
								});
							});
						});
					});
	
/*
					db.logout(function(err, result){
						if (!err){
							console.log("Logged out via client object...");
						} 
						client.close();
						console.log("Connection closed");
					});
*/
				}
			});
		}
	}
});