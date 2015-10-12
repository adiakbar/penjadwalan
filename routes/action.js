var express = require('express');
var router 	= express.Router();

var auth 	= require('../auth');
var connection = require('../connMysql');

router.route('/validate1')
	.get(function(req,res) {
		var rfid = req.query.rfid;
		var hari = req.query.hari;
		var tanggal = req.query.tanggal;
		var jam = req.query.jam;
		var ruangan = req.query.ruangan;
		var jmlPC = req.query.jmlPC;

		var a;
   	connection.query("SELECT * FROM mahasiswa WHERE rfid = ?",rfid,function(err,data) {
	   	if(err || data.length == 0) {
				res.json({ success: false, message: "Mahasiswa Tidak Ditemukan" })
			} else {
				// res.json(data[0]);
				setA(data[0].mahasiswa);
				showData();
				// res.json(data[0].mahasiswa);
			}
	   });

	   function setA(x){
	   	a = x;
	   }

	   function showData(){
	   	console.log(a);
	   }
	 //   connection.query("SELECT * FROM praktikum WHERE hari = ? OR tanggal = ? AND mulai <= ? AND selesai >= ? AND ruangan",[hari,tanggal,jam,jam,ruangan],function(err,dataPrk) {
		// 	if(err || data.length == 0) {
		// 		res.json({ success: false, message: "Praktikum Tidak Ditemukan" })
		// 	} else {
		// 		res.json(data[0]);
		// 	}
		// });
	});

router.route('/validate')
	.get(function(req,res) {
		var rfid = req.query.rfid;
		var hari = req.query.hari;
		var tanggal = req.query.tanggal;
		var jam = req.query.jam;
		var ruangan = req.query.ruangan;
		var jmlPC = req.query.jmlPC;

		connection.query("SELECT * FROM mahasiswa WHERE rfid = ?",rfid,function(err,dataMhs) {
	   	if(err || dataMhs.length == 0) {
				res.json({ success: false, message: "Mahasiswa Tidak Ditemukan" });
			} else {
				connection.query("SELECT * FROM praktikum WHERE hari = ? OR tanggal = ? AND mulai <= ? AND selesai >= ? AND ruangan",[hari,tanggal,jam,jam,ruangan],function(err,dataPrk) {
					if(dataPrk.length == 0) {
						if(jmlPC == 0) {
							res.json({ success: false, message: "PC Telah Penuh" });
						} else {
							res.json({ success: true, message: "Halo "+dataMhs[0].mahasiswa, data: dataMhs[0] });
						}
					} else {
						connection.query("SELECT * FROM detailpraktikum WHERE mahasiswa_id = ? AND praktikum_id = ?",[dataMhs[0].id_mahasiswa,dataPrk[0].id_praktikum],function(err,dataDetail) {
							if(err || dataDetail.length == 0) {
								res.json({ success: false, message: "Nama Anda Tidak \n Masuk di Jadwal" });
							} else {
								if(jmlPC == 0) {
									res.json({ success: false, message: "PC Telah Penuh" });
								} else {
									res.json({ success: true, message: "Halo "+dataMhs[0].mahasiswa, data: dataMhs[0] });
								}
							}	
						});
					}
				});
			}
	   });
	});

router.route('/cek-status-off')
	.get(function(req,res) {
		var rfid = req.query.rfid;
		var tanggal = req.query.tanggal;

		connection.query("SELECT * FROM log WHERE rfid = ? AND tanggal = ? AND kondisi = 'on'",[rfid,tanggal],function(err,data){
			if(!err && data.length >= 1) {
				res.json({ success: false, message: "RFID Sedang Aktif" })
			} else {
				res.json({ success: true, message: "RFID Tidak Aktif" })
			}
		});
	})

module.exports = router;