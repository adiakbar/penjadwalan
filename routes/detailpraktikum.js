var express = require('express');
var router  = express.Router();

var auth    	= require('../auth');
var connection	= require('../connMysql');

router.route('/')
	.post(function(req,res) {
		var dataJadwal = {
			mahasiswa_id : req.body.mahasiswa_id,
			praktikum_id : req.body.praktikum_id
		};
		connection.query('INSERT INTO detailpraktikum set ? ',dataJadwal,function(err,data) {
			if(!err)
				res.json({ success: true, message: "Data Created" });
			else 
				console.log(err);
		});
	});

router.route('/praktikum/id/:id_praktikum')
	.get(function(req,res) {
		var praktikum_id = req.params.id_praktikum;
		connection.query('SELECT * FROM mahasiswa LEFT JOIN (SELECT * FROM detailpraktikum WHERE praktikum_id=?) t2 on t2.mahasiswa_id = mahasiswa.id_mahasiswa WHERE mahasiswa.prodi_id = 1',praktikum_id,function(err,data) {
			if(!err)
				res.json(data);
			else
				console.log(err);
		});
	});

router.route('/mahasiswa/id/:id_mahasiswa')
	.get(function(req,res) {
		var mahasiswa_id = req.params.id_mahasiswa;
		connection.query("SELECT * FROM detailpraktikum LEFT JOIN praktikum on detailpraktikum.praktikum_id = praktikum.id_praktikum WHERE detailpraktikum.mahasiswa_id = ?",mahasiswa_id,function(err,data) {
			if(!err)
				res.json(data);
			else
				console.log(err);
		})
	})

router.route('/:id_praktikum/:id_mahasiswa')
	.delete(function(req,res) {
		var mahasiswa_id = req.params.id_mahasiswa;
		var praktikum_id = req.params.id_praktikum;
		connection.query("DELETE FROM detailpraktikum WHERE mahasiswa_id = ? AND praktikum_id = ?",[mahasiswa_id,praktikum_id],function(err,data) {
			if(!err)
				res.json({ success: true, message: "Data Deleted" });
			else
				console.log(err);
		});
	});



module.exports = router;