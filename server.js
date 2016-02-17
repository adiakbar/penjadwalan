var express 		= require('express');
var bodyParser 	= require('body-parser');
var port 				= process.env.PORT || 3000;

var app 				= express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  return next();
});

var routeMahasiswa 					= require('./routes/mahasiswa');
var routePraktikum 					= require('./routes/praktikum');
var routePraktikumTambahan 	= require('./routes/praktikumtambahan');
var routeDetailpraktikum 		= require('./routes/detailpraktikum');
var routeAction 						= require('./routes/action');

app.use('/api/mahasiswa', routeMahasiswa);
app.use('/api/praktikum', routePraktikum);
app.use('/api/praktikumtambahan', routePraktikumTambahan);
app.use('/api/detailpraktikum', routeDetailpraktikum);
app.use('/api/action', routeAction);

app.listen(port,function() {
	console.log("Server REST Web Service aktif pada port " + port);
});