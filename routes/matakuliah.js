var express = require('express');
var router 	= express.Router();

var auth 	= require('../auth');

router.route('/')
	.get(auth,function(req,res){
		res.send("ini untuk matakuliah");
	});

module.exports = router;