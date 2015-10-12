var express = require('express');
var router 	= express.Router();

var auth 	= require('../auth');
var connection = require('../connMysql');

router.route('/prodi/:id_prodi')
	.get(function(req,res) {
		var prodi_id = req.params.id_prodi;
		connection.query("SELECT * FROM praktikum WHERE prodi_id = ? AND keterangan = 'tambahan'",prodi_id,function(err,data) {
			if(!err)
				res.json(data);
			else
				console.log(err);
		});
	})

module.exports = router;