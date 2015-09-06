var express 	= require('express');
var bodyParser = require('body-parser');
var port 		= process.env.PORT || 3000;

var app 			= express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var connection	= require('express-myconnection');
var mysql		= require('mysql');

app.use(
	connection(mysql,{
		host		: 'localhost',
		user		: 'root',
		password	: '',
		database	: 'penjadwalan',
	},'request')
);

app.all("/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    return next();
});

app.post('/auth',function(req,res){
	var username = req.body.username;
	var password = req.body.password;

	if(username === 'adi' && password === 'siskom10') {
		res.json({
			success: true,
			message: "Suksess"
		});
	} else {
		res.json({
			success: false,
			message: 'Authentication failed.'
		});
	}
});

var routeMahasiswa = require('./routes/mahasiswa');
var routePraktikum = require('./routes/praktikum');
var routeJampraktikum = require('./routes/jampraktikum');
var routeJadwalpraktikum = require('./routes/jadwalpraktikum');

app.use('/api/mahasiswa', routeMahasiswa);
app.use('/api/praktikum', routePraktikum);
app.use('/api/jampraktikum', routeJampraktikum);
app.use('/api/jadwalpraktikum', routeJadwalpraktikum);

app.listen(port,function() {
	console.log('Listen Port ' + port);
});