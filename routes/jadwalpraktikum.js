var express	= require('express');
var router 	= express.Router();

var auth = require('../auth');

router.route('/')
	.get(auth,function(req,res) {
		req.getConnection(function(err,conn) {
			var query = conn.query("SELECT * FROM jadwalpraktikum LEFT JOIN mahasiswa ON jadwalpraktikum.mahasiswa_id = mahasiswa.id_mahasiswa LEFT JOIN jampraktikum ON jadwalpraktikum.jampraktikum_id = jampraktikum.id_jampraktikum LEFT JOIN praktikum ON jampraktikum.praktikum_id = praktikum.id_praktikum",function(err,data) {
				if(err) console.log(err);
				res.json(data);
			});
		});
	})

	.post(auth,function(req,res) {
		var dataJadwal = {
			mahasiswa_id : req.body.mahasiswa_id,
			jampraktikum_id : req.body.jampraktikum_id
		};
		req.getConnection(function(err,conn) {
			var query = conn.query("INSERT INTO jadwalpraktikum set ? ",dataJadwal,function(err,data) {
				if(err) console.log(err);
				res.json({ success: true, message: "Data Created" });
			});
		});
	});

router.route('/mahasiswa/:id')
	.get(auth,function(req,res) {
		var id_mahasiswa = req.params.id;
		req.getConnection(function(err,conn) {
			var query = conn.query("SELECT * FROM jadwalpraktikum LEFT JOIN mahasiswa ON jadwalpraktikum.mahasiswa_id = mahasiswa.id_mahasiswa LEFT JOIN jampraktikum ON jadwalpraktikum.jampraktikum_id = jampraktikum.id_jampraktikum LEFT JOIN praktikum ON jampraktikum.praktikum_id = praktikum.id_praktikum WHERE mahasiswa.id_mahasiswa = ? ",id_mahasiswa,function(err,data) {
				if(err) console.log(err);
				// mahasiswa not found
				if(data.length < 1)
					return res.send("Mahasiswa Not Found");
				res.send(data[0]);
			});
		});
	});

router.route('/praktikum/:id')
	.get(auth,function(req,res) {
		var id_praktikum = req.params.id;
		req.getConnection(function(err,conn) {
			var query = conn.query("SELECT * FROM jadwalpraktikum LEFT JOIN mahasiswa ON jadwalpraktikum.mahasiswa_id = mahasiswa.id_mahasiswa LEFT JOIN jampraktikum ON jadwalpraktikum.jampraktikum_id = jampraktikum.id_jampraktikum LEFT JOIN praktikum ON jampraktikum.praktikum_id = praktikum.id_praktikum WHERE praktikum.id_praktikum = ? ",id_praktikum,function(err,data) {
				if(err) console.log(err);
				// mahasiswa not found
				if(data.length < 1)
					return res.send("Praktikum Not Found");
				res.send(data[0]);
			});
		});
	});

module.exports = router;