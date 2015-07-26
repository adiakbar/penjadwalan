var express	= require('express');
var router 	= express.Router();

var auth = require('../auth');

router.route('/')
	.get(auth,function(req,res){
		req.getConnection(function(err,conn) {
			var query = conn.query('SELECT * FROM mahasiswa', function(err, data) {
				if(err) console.log(err);
				res.json(data);
			});
		});
	})

	.post(auth,function(req,res){
		var dataMahasiswa = {
			nama_mhs	: req.body.nama,
			nim		: req.body.nim,
			rfid		: req.body.rfid
		};
		req.getConnection(function(err,conn) {
			var query = conn.query("INSERT INTO mahasiswa set ? ",dataMahasiswa,function(err,data){
				if(err) console.log(err);
				res.json({ success: true, message: "Data Created"});
			});
		});
	});

module.exports = router;