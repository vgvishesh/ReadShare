var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.get('/backgroundimage', function (req, res) {
	var imagePath = "http://127.0.0.1:8080/Images/read4.jpg";
	console.log(imagePath);
	res.json({image : imagePath});
})

app.get('/andrea.html', function (req, res) {
	res.sendFile("Andrea.html");
})

app.post('/search', function (req, res) {
	console.log(req.body);
	console.log('search query from the client is ' + req.body.text);
})

var server = app.listen(8080, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log("the server is listening at %s : %s", host, port);
})
