var mongoDB = require('mongodb');
var MongoClient = mongoDB.MongoClient;
var MongoServer = mongoDB.Server;
var format = require('util').format;

function addObject(collection, object) {
	collection.insert(object, function(err, result) {
		if (err) {
			console.log(err);
		} else {
			console.log("Inserted : " );
			console.dir(result);
		}
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
					var collectionName = "nebulae";
					db.createCollection(collectionName, function(err, collection){
						if (err) {
							console.log("Error creating " + collectionName + " " + err);
						} else {
							console.log(collection.collectionName + " exists");
							var name = collection.collectionName;
							
							collection.drop(function(err, result){
								if (err) {
									console.log ("Error dropping " + name + " " + err);
								} else {
									console.log(name + " dropped [" + result);
									db.createCollection(collectionName, function(err, collection){
										if (err) {
											console.log("Error creating " + collectionName + " " + err);
										} else {
											console.log("Created " + collectionName);
											addObject(collection, {ngc: "NGC 7293", name: 'Helix', type: "planetary", location: "Aquila"});
											addObject(collection, {ngc: "NGC 6543", name: "Cat's Eye", type: "planetary", location: "Draco"});
											addObject(collection, {ngc: "NGC 1952", name: 'Crab', type: "supernova", location: "Taurus"});
											setTimeout(function(){db.close();}, 3000);
										}
									});
								}

							});

						}
					});
				}
			});
		}
	}
});