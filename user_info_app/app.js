var express = require('express');
var app = express();
const request = require('request');
const bodyParser = require('body-parser');
var approuter = require('@sap/approuter');
const jwtDecode = require('jwt-decode');
var ar = new approuter();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname +'/'));



ar.beforeRequestHandler.use('/jwtdecode', function (req, res, next) {
	if (!req.user) {
	  res.statusCode = 403;
	  res.end(`Missing JWT Token`);
	} else {
	  res.statusCode = 200;
	  res.end(`My name is ${JSON.stringify(jwtDecode(req.user.token.accessToken))}`);
	} 
});
ar.start();

// serve app
app.get('/', function(req, res){
	res.sendFile('index.html');
	console.log('[server] index served');
});