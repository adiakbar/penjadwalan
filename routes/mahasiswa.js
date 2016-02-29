var express	= require('express');
var router 	= express.Router();

var auth = require('../auth');
var connection = require('../connMysql');

router.route('/prodi/:id_prodi')
	.get(function(req,res) {
		var prodi_id = req.params.id_prodi;
		connection.query("SELECT * FROM mahasiswa WHERE prodi_id = ?",prodi_id,function(err,data) {
			if (!err)
		     res.json(data);
		   else
		     console.log(err);
		});
	});

router.route('/id/:id_mahasiswa')
	.get(auth,function(req,res) {
		var id = req.params.id_mahasiswa;
		connection.query("SELECT * FROM mahasiswa WHERE id_mahasiswa = ?",id,function(err,data) {
			if(!err)
				res.json(data[0]);
			else
				console.log(err);
		});
	});

router.route('/rfid/:rfid_mahasiswa')
	.get(auth,function(req,res) {
		var rfid = req.params.rfid_mahasiswa;
		connection.query("SELECT * FROM mahasiswa WHERE rfid = ?",rfid,function(err,data) {
			if(!err)
				res.json(data[0]);
			else
				console.log(err);
		});
	});

module.exports = router;