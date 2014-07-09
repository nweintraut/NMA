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
					db.collection(collectionName, function(err, collection){
						if (err){
							console.log(err);
						} else {
							collection.find({type: "Planetary"}, function(err, items){
								if (err){
									console.log(err);
								} else {
									items.toArray(function(err, itemArr){
										if (err){
											console.log(err);
										} else {
											console.log("Before Update: ");
											console.log(itemArr);
											collection.update({type:"Planetary", $isolated: 1},
												{$set:{type:"planetary", updated: true}},
												{upsert: false, multi:true, w:1},
												function(err, results){
													if (err){
														console.log(err);
													} else {
														console.log(results);
														collection.find({type: "planetary"}, function(err, results){
															if(err){
																console.log(err);
															} else {
																results.toArray(function(err, itemArr){
																	if(err){
																		console.log(err);
																	} else {
																		console.log("Afterwards: ");
																		console.log(itemArr);
																		db.close();
																	}
																});
															}
														});

													}
												});
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