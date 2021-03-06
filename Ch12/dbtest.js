var mongoose = require('mongoose');
var MONGOHQ_URL = 'mongodb://neil:goober@alex.mongohq.com:10011/node3';

var uri = process.env.MONGO_URL ? process.env.MONGOHQ_URL : MONGOHQ_URL;
console.log(uri);

function connect(uri){
    mongoose.connect(uri, function(err) {
        if (err) {
            console.log(">>>> **** " + err + " *** <<<");
        }
        else {
            console.log("Connected to Mongodb at: " + uri);
        }
    });
};
connect(uri);
