var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/test';

MongoClient.connect(url, function (err, db) {
	if(err) {
		console.log('unable to connect to the mongodb server. Error:', err);		
	}
	else {
		console.log('connection established to', url);
		var collection = db.collection('users');
		var user1 = {name : 'vishesh', age : 25};
		var user2 = {name : 'vaishvik', age : 23};
		var user3 = {name : 'Rakesh', age : 27};

		collection.insert([user1, user2, user3], function (err, result) {
			if(err) {
				console.log(err);				
			}
			else {
				console.log('Inserted %d document into the users collection. The id is :', result.length, result);
				db.close();
			}
		});
	}
});