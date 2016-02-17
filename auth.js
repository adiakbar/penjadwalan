var express 	= require('express');
var basicAuth 	= require('basic-auth');

var connection = require('./connMysql');
var passwordHash = require('password-hash');

var auth = function(req,res,next) {
	function unauthorized(res) {
		res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
		return res.sendStatus(401);
	};

	var operator = basicAuth(req);
	if(!operator || !operator.name || !operator.pass) {
		return unauthorized(res);
	}

	connection.query('SELECT * FROM operator WHERE username = ?',operator.name,function(err,data) {
		if(!err)
			if(passwordHash.verify(operator.pass,data[0].password)){
				next();
			} else {
				return unauthorized(res);
			}
		else
			return unauthorized(res);
	});
};

module.exports = auth;