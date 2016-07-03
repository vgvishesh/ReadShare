var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/bookLook';

var state = {
	db:null,
};

function bookObject(user, book)
{
	this.name = book.name;	
	this.author = book.author;	
	this.user = user;
}

exports.connect = function (callback) 
{
	if(state.db)
		return callback();

	MongoClient.connect(url, function (err, db) 
	{
		if(err) 
		{
			return callback(err);
		}

		state.db = db;
		callback();
	});
};

exports.insertData = function (data, callback)
{
	if(!isValidDatabase(callback))
		return;

	createUserDocuments(data, callback);	
	createBookDocuments(data.user, data.books, callback);
};

exports.closeConnection = function (callback) 
{
	if(!isValidDatabase(callback))
		return;

	state.db.close(function (err, result) 
	{
		state.db = null;
		return callback(null, result);
	});
};


exports.findBook = function (query, callback) 
{
	if(!isValidDatabase(callback))
		return;
	var collection = state.db.collection('books');
	collection.find({name : query}, function (err, result) 
	{
		if(err)
		{
			return callback(err);
		}

		return callback(null, result);
	});
}

var createBookDocuments = function(user, booksData, callback)
{
	var books = state.db.collection('books');
	var bookObjects = createObjectArray(user, booksData);

	books.insert(bookObjects, function (err, result) 
	{
		if(err) 
		{
			callback(err);
		}
		return callback(null, result);
	});
}

var createObjectArray = function (user, booksData)
{
	var bookObjects = [];
	var dataSize = booksData.length;

	for(var i = 0; i< dataSize; i++)
	{
		bookObjects.push(new bookObject(user, booksData[i]));
	}

	return bookObjects;
}

var createUserDocuments = function(data, callback)
{
	var users = state.db.collection('users');
	users.insert(data, function (err, result)
	{
		if(err) 
		{
			callback(err);
		}
		return callback(null, result);	
	});
}

var isValidDatabase = function (callback)
{
	if(!state.db)
	{
		var err = "no valid database connection";
		callback(err);
		return false;
	}
	return true;
}