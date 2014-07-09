var mongoDB = require('mongodb');
var MongoClient = mongoDB.MongoClient;
var MongoServer = mongoDB.Server;
var format = require('util').format;

var MONGOHQ_URL = 'mongodb://neil:goober@alex.mongohq.com:10011/node3';
var url = 'mongodb://neil.weintraut@gmail.com:31958$cloud@alex.mongohq.com';
var port = 10011;
var client = MongoClient.connect(url, function(err, db){
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
