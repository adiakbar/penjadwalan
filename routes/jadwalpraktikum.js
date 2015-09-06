var express = require('express');
var router  = express.Router();

var auth    = require('../auth');

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
			mahasiswa_id    : req.body.mahasiswa_id,
			jampraktikum_id : req.body.jampraktikum_id
		};
		req.getConnection(function(err,conn) {
			var query = conn.query("INSERT INTO jadwalpraktikum set ? ",dataJadwal,function(err,data) {
				if(err) console.log(err);
				res.json({ success: true, message: "Data Created" });
			});
		});
	})



router.route('/jampraktikum/:id')
	.get(auth,function(req,res) {
		var id_jampraktikum = req.params.id;
		req.getConnection(function(err,conn) {
			var query = conn.query("SELECT id_mahasiswa,nama_mahasiswa,nim,rfid,angkatan FROM jadwalpraktikum LEFT JOIN mahasiswa ON jadwalpraktikum.mahasiswa_id = mahasiswa.id_mahasiswa WHERE jadwalpraktikum.jampraktikum_id = ? ", id_jampraktikum, function(err,data) {
				if(err) console.log(err);
				if(data.length < 1)
					return res.send('0');
				res.send(data);
			});
		});
	});

router.route('/:idMahasiswa/:idJampraktikum')
	.delete(auth,function(req,res) {
		var mahasiswa_id = req.params.idMahasiswa;
		var jampraktikum_id = req.params.idJampraktikum;
		req.getConnection(function(err,conn) {
			var query = conn.query("DELETE FROM jadwalpraktikum WHERE mahasiswa_id = ? AND jampraktikum_id = ? ",[mahasiswa_id,jampraktikum_id],function(err,data){
				if(err) console.log(err);
				res.json({ success: true, message: "Data deleted" });
			});
		});
	});

// router.route('/mahasiswa')
// 	.get(auth, function(req,res) {
// 		var id_jampraktikum = req.params.id;
// 		req.getConnection(function(err,conn) {
// 			var query = conn.query("SELECT * FROM mahasiswa" , function(err,data) {
// 				if(err) console.log(err);
// 				res.send(data);
// 			});
// 		});
// 	});

module.exports = router;