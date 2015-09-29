var express = require('express');
var router 	= express.Router();

var auth 	= require('../auth');
var connection = require('../connMysql');

router.route('/prodi/:id_prodi')
	.get(auth,function(req,res) {
		var prodi_id = req.params.id_prodi;
		connection.query('SELECT * FROM praktikum WHERE prodi_id = ?',prodi_id,function(err,data) {
			if(!err)
				res.json(data);
			else
				console.log("Check Your Query");
		});
	});

router.route('/id/:id')
	.get(auth,function(req,res) {
		var id = req.params.id;
		connection.query('SELECT * FROM praktikum WHERE id = ?',id,function(err,data) {
			if(!err)
				res.json(data[0]);
			else
				console.log("Check Your Query");
		});
	});

route.route('/kode/:kode')
	.get(auth,function(req,res))

module.exports = router;