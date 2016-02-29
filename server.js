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

var token = '1a2b3c4d5e6f7g8h9i10j11k12l13m14n15o16p17q18r19s20';

app.get('/testing', function(req,res) {
	res.json({ status: true, pesan: 'Ini adalah halaman testing REST API' });
});

app.use('/api/'+token+'/mahasiswa', routeMahasiswa);
app.use('/api/'+token+'/praktikum', routePraktikum);
app.use('/api/'+token+'/praktikumtambahan', routePraktikumTambahan);
app.use('/api/'+token+'/detailpraktikum', routeDetailpraktikum);
app.use('/api/'+token+'/action', routeAction);

app.listen(port,function() {
	console.log("Server REST Web Service aktif pada port " + port);
});