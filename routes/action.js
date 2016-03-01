var express = require('express');
var router 	= express.Router();

var auth 				= require('../auth');
var connection 	= require('../connMysql');

/* Proses validasi data sesuai dengan diagram blok validasi */
router.route('/validasi')
	.get(function(req,res) {
		var rfid 		= req.query.rfid;
		var hari	 	= req.query.hari;
		var tanggal = req.query.tanggal;
		var jam 		= req.query.jam;
		var ruangan = req.query.ruangan;
		var jmlPC 	= req.query.jmlPC;

		/* proses cek rfid ada ndak di table mahasiswa */
		connection.query("SELECT * FROM mahasiswa WHERE rfid = ?",rfid,function(err,dataMhs) {
	   	if(err || dataMhs.length == 0) {
				res.json({ success: false, message: "Mahasiswa Tidak Ditemukan" });
			} else {
				/* proses cek jadwal ada ndak praktikum pada waktu tersebut */
				connection.query("SELECT * FROM praktikum WHERE (hari = ? OR tanggal = ?) AND mulai_scan <= ? AND selesai >= ? AND ruangan = ?",[hari,tanggal,jam,jam,ruangan],function(err,dataPrk) {
					if(dataPrk.length == 0) {
						/* menghitung jumlah pc pada laboratorium tersebut kalau sekarang ndak ada praktikum */
						if(jmlPC == 0) {
							res.json({ success: false, message: "PC Telah Penuh" });
						} else {
							res.json({ success: true, message: "Halo "+dataMhs[0].mahasiswa, data: dataMhs[0] });
						}
					} else {
						/* proses cek mahasiswa terdaftar ndak pada praktikum tersebut */
						connection.query("SELECT * FROM detailpraktikum WHERE mahasiswa_id = ? AND praktikum_id = ?",[dataMhs[0].id_mahasiswa,dataPrk[0].id_praktikum],function(err,dataDetail) {
							if(err || dataDetail.length == 0) {
								res.json({ success: false, message: "Nama Anda Tidak \n Masuk di Jadwal" });
							} else {
								/* menghitung jumlah pc laboratorium tersebut pada praktikum */
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

/* Proses validasi data ketika ada yang melakukan scan 2x */
router.route('/cek-status-off')
	.get(function(req,res) {
		var rfid 		= req.query.rfid;
		var tanggal = req.query.tanggal;

		connection.query("SELECT * FROM log WHERE rfid = ? AND tanggal = ? AND kondisi = 'on'",[rfid,tanggal],function(err,data){
			if(!err && data.length >= 1) {
				res.json({ success: false, message: "RFID Sedang Aktif" })
			} else {
				res.json({ success: true, message: "RFID Tidak Aktif" })
			}
		});
	});

/* Proses untuk mendapatkan data jadwal untuk diletakkan di monitoring */
router.route('/cek-jadwal')
	.get(function(req,res) {
		var jam 		= req.query.jam;
		var hari 		= req.query.hari;
		var tanggal 	= req.query.tanggal;
		var ruangan 	= req.query.ruangan;

		connection.query("SELECT * FROM praktikum WHERE (hari = ? OR tanggal = ?) AND mulai_scan <= ? AND selesai >= ? AND ruangan = ?",[hari,tanggal,jam,jam,ruangan],function(err,data){
			if(err || data.length == 0) {
				res.json({ success: false, praktikum: "Tidak Ada Jadwal" })
			} else {
				res.json(data[0]);
			}
		});
	});

/* Data status di sistem monitoring (GET,POST,PUT) */
router.route('/status')
	/* data status pada table log dimana tiap laboratorium hanya menampilkan 3 data */
	.get(function(req,res) {
		/* INI MASIH SALAH KARENA MASIH QUERY DI SEMUA RUANGAN TABLE LOG LIMIT 3 */
		connection.query("SELECT * FROM log WHERE kondisi = 'on' ORDER BY id DESC LIMIT 6",function(err,data){
			if(err){
				console.log(err)
			}else{
				connection.query("SELECT ruangan, komputer, COUNT(*) AS jumlah_pemakaian FROM `log` GROUP BY ruangan, komputer ORDER BY ruangan, komputer",function(err,dataJml) {
					var allData = {data:data, dataJml:dataJml};
					// res.json(dataJml);
					res.json(allData);
				});
			}
		});
	})
	/* Insert data ke table log untuk kondisi ON aplikasi monitoring */
	.post(function(req,res) {
		var dataLog = {
			mahasiswa 	: req.body.mahasiswa,
			rfid		: req.body.rfid,
			tanggal		: req.body.tanggal,
			ruangan		: req.body.ruangan,
			komputer	: req.body.komputer,
			mulai		: req.body.mulai,
			selesai		: req.body.selesai,
			ruangan		: req.body.ruangan,
			kondisi		: req.body.kondisi
		};
		connection.query("INSERT INTO log SET ?",dataLog,function(err,data) {
			if(!err)
				res.json({ success: true, message: "Data Created" });
			else
				console.log(err);
		});
	})
	/* Update data ke table log untuk kondisi OFF aplikasi monitoring */
	.put(function(req,res) {
		var dataLog = {
			mahasiswa 	: req.body.mahasiswa,
			rfid		: req.body.rfid,
			tanggal		: req.body.tanggal,
			ruangan		: req.body.ruangan,
			komputer	: req.body.komputer,
			mulai		: req.body.mulai,
			selesai		: req.body.selesai,
			ruangan		: req.body.ruangan,
			kondisi		: req.body.kondisi
		};
		connection.query("UPDATE log SET ? WHERE rfid = ? AND tanggal = ?",[dataLog,dataLog.rfid,dataLog.tanggal],function(err,data) {
			if(!err)
				res.json({ success: true, message: "Data Updated" });
			else
				console.log(err);
		});
	});

router.route('/log')
	.get(function(req,res) {
		var rfid 		= req.query.rfid;
		var ruangan 	= req.query.ruangan;
		// var tanggal 	= req.query.tanggal;

		connection.query("SELECT * FROM log WHERE rfid = ? AND ruangan = ?",[rfid,ruangan],function(err,data) {
			if(!err)
				res.json(data);
			else
				console.log(err);
		});
	});

module.exports = router;