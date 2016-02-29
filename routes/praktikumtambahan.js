var express = require('express');
var router 	= express.Router();

var auth 	= require('../auth');
var connection = require('../connMysql');

router.route('/prodi/:id_prodi')
	.get(function(req,res) {
		var prodi_id = req.params.id_prodi;
		connection.query("SELECT * FROM praktikum WHERE prodi_id = ? AND keterangan = 'tambahan' ORDER BY id_praktikum = 'DESC'",prodi_id,function(err,data) {
			if(!err)
				res.json(data);
			else
				console.log(err);
		});
	})
	.post(auth, function(req,res) {
		var dataPraktikum = {
			prodi_id		: req.params.id_prodi,
			praktikum 	: req.body.praktikum,
			dosen				: req.body.dosen,
			tanggal			: req.body.tanggal,
			mulai				: req.body.mulai,
			mulai_scan	: req.body.mulai_scan,
			selesai			: req.body.selesai,
			ruangan			: req.body.ruangan,
			keterangan	: 'tambahan'
		};
		connection.query("INSERT INTO praktikum set ?",dataPraktikum,function(err,data) {
			if(!err)
				res.json({ success: true, message: "Data Created" });
			else
				console.log(err);
		});
	});

router.route('/id/:id_praktikum')
	.get(auth, function(req,res) {
		var id = req.params.id_praktikum;
		connection.query("SELECT * FROM praktikum WHERE id_praktikum = ? AND keterangan = 'tambahan'",id,function(err,data) {
			if(!err)
				res.json(data[0]);
			else
				console.log(err);
		});
	})
	.put(auth, function(req,res) {
		var id = req.params.id_praktikum;
		var dataPraktikum = {
			praktikum 	: req.body.praktikum,
			dosen				: req.body.dosen,
			tanggal			: req.body.tanggal,
			mulai				: req.body.mulai,
			mulai_scan	: req.body.mulai_scan,
			selesai			: req.body.selesai,
			ruangan			: req.body.ruangan
		};
		connection.query("UPDATE praktikum SET ? WHERE id_praktikum = ?",[dataPraktikum,id],function(err,data) {
			if(!err)
				res.json({ success: true, message: "Data Updated" });
			else
				console.log(err);
		});
	})
	.delete(auth, function(req,res) {
		var id = req.params.id_praktikum;
		connection.query("DELETE FROM praktikum WHERE id_praktikum = ? AND keterangan = 'tambahan'",id,function(err,data) {
			if(!err)
				res.json({ success: true, message: "Data Deleted" });
			else
				console.log(err);
		});
	});

module.exports = router;