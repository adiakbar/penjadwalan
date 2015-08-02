var express = require('express');
var router 	= express.Router();

var auth 	= require('../auth');

router.route('/')
	.get(auth,function(req,res) {
		req.getConnection(function(err,conn) {
			var query = conn.query('SELECT * FROM praktikum', function(err, data) {
				if(err) console.log(err);
				res.json(data);
			});
		});
	})

	.post(auth,function(req,res) {
		var datapraktikum = {
			nama_praktikum : req.body.nama,
			kode 				: req.body.kode,
			semester 		: req.body.semester,
			sks 				: req.body.sks
		};
		req.getConnection(function(err,conn){
			if(err) return ("Tidak Terhubung");
			var query = conn.query("INSERT INTO praktikum set ? ",datapraktikum,function(err,data){
				if(err) console.log(err);
				res.json({ success: true, message: "Data Created" });
			});
		});
	});

router.route(':/id')
	.get(auth,function(req,res) {
		var id_praktikum = req.params.id;
		req.getConnection(function(err,conn){
			var query = conn.query("SELECT * FROM praktikum WHERE id_praktikum = ? LIMIT 1 ",id_praktikum,function(err,rows) {
				if(err) console.log(err);
				// praktikum not found
				if(data.length < 1)
					return res.send("Praktikum Not Found");
				res.send(data[0]);
			});
		});
	})

	.put(auth, function(req,res) {
		var id_praktikum = req.params.id;
		var datapraktikum = {
			nama_praktikum : req.body.nama,
			kode 				: req.body.kode,
			semester 		: req.body.semester,
			sks 				: req.body.sks
		};
		req.getConnection(function(err,conn){
			var query = conn.query("UPDATE praktikum set ? WHERE id_praktikum = ? ",[datapraktikum,id_praktikum],function(err,data) {
				if(err) console.log(err);
				res.json({ success: true, message: "Data Updated" });
			});
		});
	})

	.delete(auth,function(req,res) {
		var id_praktikum = req.params.id;
		req.getConnection(function(err,conn){
			if(err) return ("Tidak Terhubung");
			var query = conn.query("DELETE FROM praktikum WHERE id_praktikum = ? ",id_praktikum,function(err,data) {
				if(err) console.log(err);
				res.json({ success: true, message: "Data Deleted" });
			});
		});
	});

module.exports = router;