var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/bookLook';

MongoClient.connect(url, function (err, db) {
	if(err) {
		console.log('unable to connect to the mongodb server. Error:', err);		
	}
	else {
		console.log('connection established to ', url);

		var collection = db.collection('books');
		
		var book1 = {name : '1000 splendid suns', author : "author1"};
		var book2 = {name : 'the great gatsby', author : "author2"};
		var book3 = {name : 'guns and roses', author : "author3"};

		collection.insert([book1, book2, book3], function (err, result) {
			if(err) {
				console.log(err);				
			}
			else {
				console.log('Inserted %d document into the books collection. The id is :', result.length, result);
				db.close();
			}
		});
	}
})