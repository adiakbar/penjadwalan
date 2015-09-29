var express 	= require('express');
var bodyParser = require('body-parser');
var port 		= process.env.PORT || 3000;

var app 			= express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routeMahasiswa = require('./routes/mahasiswa');
var routePraktikum = require('./routes/praktikum');
// var routeJampraktikum = require('./routes/jampraktikum');
// var routeJadwalpraktikum = require('./routes/jadwalpraktikum');

app.use('/api/mahasiswa', routeMahasiswa);
app.use('/api/praktikum', routePraktikum);
// app.use('/api/jampraktikum', routeJampraktikum);
// app.use('/api/jadwalpraktikum', routeJadwalpraktikum);

app.listen(port,function() {
	console.log('Listen Port ' + port);
});