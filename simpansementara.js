router.route('/:id')
	.get(auth,function(req,res) {
		var id_mahasiswa = req.params.id;
		req.getConnection(function(err,conn) {
			var query = conn.query("SELECT * FROM mahasiswa WHERE id_mahasiswa = ? LIMIT 1 ",id_mahasiswa,function(err,data) {
				if(err) console.log(err);
				// mahasiswa not found
				if(data.length < 1)
					return res.send("Mahasiswa Not Found");
				res.send(data[0]);
			});
		});
	})

	.put(auth,function(req,res) {
		var id_mahasiswa = req.params.id;
		var dataMahasiswa = {
			rfid 	: req.body.rfid,
			nama 	: req.body.nama,
			nim 	: req.body.nim
		};
		req.getConnection(function(err,conn) {
			var query = conn.query("UPDATE mahasiswa set ? WHERE id_mahasiswa = ? ",[dataMahasiswa,id_mahasiswa],function(err,data) {
				if(err) console.log(err);
				res.json({ success: true, message: "Data Updated" });
			});
		});
	})

	.delete(auth,function(req,res) {
		var id_mahasiswa = req.params.id;
		req.getConnection(function(err,conn){
			var query = conn.query("DELETE FROM mahasiswa WHERE id_mahasiswa = ? ",id_mahasiswa,function(err,data) {
				if(err) console.log(err);
				res.json({ success: true, message: "Data Deleted" });
			});
		});
	});




.post(auth,function(req,res) {
		var dataMahasiswa = {
			nama_mahasiswa	: req.body.nama,
			nim		: req.body.nim,
			rfid		: req.body.rfid,
			angkatan	: req.body.angkatan
		};
		req.getConnection(function(err,conn) {
			var query = conn.query("INSERT INTO mahasiswa set ? ",dataMahasiswa,function(err,data){
				if(err) console.log(err);
				res.json({ success: true, message: "Data Created" });
			});
		});
	});




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


router.route('/')
	.get(auth,function(req,res) {
		req.getConnection(function(err,conn) {
			var query = conn.query("SELECT * FROM jadwalpraktikum LEFT JOIN mahasiswa ON jadwalpraktikum.mahasiswa_id = mahasiswa.id_mahasiswa LEFT JOIN jampraktikum ON jadwalpraktikum.jampraktikum_id = jampraktikum.id_jampraktikum LEFT JOIN praktikum ON jampraktikum.praktikum_id = praktikum.id_praktikum",function(err,data) {
				if(err) console.log(err);
				res.json(data);
			});
		});
	})

	.post(auth,function(req,res) {
		var dataJadwal = {
			mahasiswa_id    : req.body.mahasiswa_id,
			jampraktikum_id : req.body.jampraktikum_id
		};
		req.getConnection(function(err,conn) {
			var query = conn.query("INSERT INTO jadwalpraktikum set ? ",dataJadwal,function(err,data) {
				if(err) console.log(err);
				res.json({ success: true, message: "Data Created" });
			});
		});
	})



router.route('/jampraktikum/:id')
	.get(auth,function(req,res) {
		var id_jampraktikum = req.params.id;
		req.getConnection(function(err,conn) {
			var query = conn.query("SELECT id_mahasiswa,nama_mahasiswa,nim,rfid,angkatan FROM jadwalpraktikum LEFT JOIN mahasiswa ON jadwalpraktikum.mahasiswa_id = mahasiswa.id_mahasiswa WHERE jadwalpraktikum.jampraktikum_id = ? ", id_jampraktikum, function(err,data) {
				if(err) console.log(err);
				if(data.length < 1)
					return res.send('0');
				res.send(data);
			});
		});
	});

router.route('/:idMahasiswa/:idJampraktikum')
	.delete(auth,function(req,res) {
		var mahasiswa_id = req.params.idMahasiswa;
		var jampraktikum_id = req.params.idJampraktikum;
		req.getConnection(function(err,conn) {
			var query = conn.query("DELETE FROM jadwalpraktikum WHERE mahasiswa_id = ? AND jampraktikum_id = ? ",[mahasiswa_id,jampraktikum_id],function(err,data){
				if(err) console.log(err);
				res.json({ success: true, message: "Data deleted" });
			});
		});
	});