var express = require('express');
var router 	= express.Router();

var auth 	= require('../auth');
var connection = require('../connMysql');

router.route('/prodi/:id_prodi')
	.get(function(req,res) {
		var prodi_id = req.params.id_prodi;
		connection.query("SELECT * FROM praktikum WHERE prodi_id = ? AND keterangan = 'reguler'",prodi_id,function(err,data) {
			if(!err)
				res.json(data);
			else
				console.log(err);
		});
	})
	.post(function(req,res) {
		var dataPraktikum = {
			prodi_id		: req.params.id_prodi,
			praktikum 	: req.body.praktikum,
			kode			: req.body.kode,
			semester		: req.body.semester,
			dosen			: req.body.dosen,
			hari			: req.body.hari,
			mulai			: req.body.mulai, // buat 1 table lagi untuk mulai cek - 15 menit
			selesai		: req.body.selesai,
			ruangan		: req.body.ruangan
		};
		connection.query('INSERT INTO praktikum set ? ',dataPraktikum,function(err,data) {
			if(!err)
				res.json({ success: true, message: "Data Created" });
			else 
				console.log(err);
		});
	});


router.route('/id/:id')
	.get(function(req,res) {
		var id = req.params.id;
		connection.query('SELECT * FROM praktikum WHERE id_praktikum = ?',id,function(err,data) {
			if(!err)
				res.json(data[0]);
			else
				console.log(err);
		});
	});

router.route('/id/:id/reset')
	.get(function(req,res) {
		var id = req.params.id;
		connection.query('UPDATE praktikum SET hari = NULL, mulai = NULL, selesai = NULL, ruangan = NULL WHERE id_praktikum = ?',id,function(err,data) {
			if(!err)
				res.json({ success: true, message: "Data Updated" });
			else 
				console.log(err);
		})
	})

router.route('/kode/:kode')
	.get(auth,function(req,res) {
		var kode = req.params.kode;
		connection.query('SELECT * FROM praktikum WHERE kode = ?',id,function(err,data) {
			if(!err)
				res.json(data[0]);
			else
				console.log(err);
		});
	});


module.exports = router;