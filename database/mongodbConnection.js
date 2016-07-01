var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/bookLook';

var state = {
	db:null,
};

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

		var collection = db.collection('books');
		state.db = db;
		callback();
	});
};

exports.insertBooks = function (data, callback)
{
	if(!isValidDatabase(callback))
		return;

	var collection = state.db.collection('books');

	collection.insert(data, function (err, result) 
	{
		if(err) 
		{
			callback(err);
		}
		return callback(null, result);
	});
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