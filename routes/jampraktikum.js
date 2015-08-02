var express	= require('express');
var router 	= express.Router();

var auth = require('../auth');

router.route('/')
	.get(auth,function(req,res) {
		req.getConnection(function(err,conn) {
			var query = conn.query("SELECT * FROM praktikum LEFT JOIN jampraktikum ON praktikum.id_praktikum = jampraktikum.praktikum_id",function(err,data) {
				if(err) console.log(err);
				res.json(data);
			});
		});
	})

	.post(auth,function(req,res) {
		var dataJampraktikum = {
			praktikum_id	: req.body.praktikum_id,
			hari				: req.body.hari,
			mulai				: req.body.mulai,
			selesai			: req.body.selesai,
			ruangan			: req.body.ruangan
		};
		req.getConnection(function(err,conn){
			var query = conn.query("INSERT INTO jampraktikum set ? ",dataJampraktikum,function(err,data) {
				if(err) console.log(err);
				res.json({ success: true, message: "Data Created" });
			});
		});
	});

router.route('/:id_praktikum')
	.get(auth,function(req,res) {
		var id_praktikum = req.params.id_praktikum;
		req.getConnection(function(err,conn) {
			var query = conn.query("SELECT * FROM praktikum LEFT JOIN jampraktikum ON praktikum.id_praktikum = jampraktikum.praktikum_id WHERE praktikum.id_praktikum = ? ",id_praktikum,function(err,data) {
				if(err) console.log(err);
				// mahasiswa not found
				if(data.length < 1)
					return res.send("Praktikum Not Found");
				res.send(data[0]);
			});
		});
	});

router.route('/:id_jampraktikum')
	.put(auth,function(req,res) {
		var id_jampraktikum = req.params.id_jampraktikum;
		var dataJampraktikum = {
			hari				: req.body.hari,
			mulai				: req.body.mulai,
			selesai			: req.body.selesai,
			ruangan			: req.body.ruangan
		};
		req.getConnection(function(err,conn){
			var query = conn.query("UPDATE jampraktikum set ? WHERE id_jampraktikum = ? ",[dataJampraktikum,id_jampraktikum],function(err,data) {
				if(err) console.log(err);
				res.json({ success: true, message: "Data Updated" });
			});
		});
	})

	.delete(auth,function(req,res) {
		var id_jampraktikum = req.params.id_jampraktikum;
		req.getConnection(function(err,conn) {
			var query = conn.query("DELETE FROM jampraktikum WHERE id_jampraktikum = ? ",id_jampraktikum,function(err,data) {
				if(err) console.log(err);
				res.json({ success: true, message: "Data Deleted" });
			});
		});
	});

module.exports = router;