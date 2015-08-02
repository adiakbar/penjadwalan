drop database if exists penjadwalan;
create database penjadwalan;
	use penjadwalan;

	create table mahasiswa(
		id_mahasiswa integer primary key auto_increment,
		nama_mahasiswa varchar(50),
		nim varchar(50),
		rfid varchar(50)
	)engine=innodb;

	create table praktikum(
		id_praktikum integer primary key auto_increment,
		nama_praktikum varchar(100),
		kode varchar(50),
		semester integer,
		sks integer
	)engine=innodb;

	create table jampraktikum(
		id_jampraktikum integer primary key auto_increment,
		praktikum_id integer, 	-- tukar nama
		hari varchar(50),
		mulai varchar(50),
		selesai varchar(50),
		ruangan varchar(50)
	)engine=innodb;

	create table jadwalpraktikum(
		id_jadwal integer primary key auto_increment,
		mahasiswa_id integer, 	-- tukar nama
		jampraktikum_id integer	-- tukar nama
	)engine=innodb;


	alter table jampraktikum add foreign key (praktikum_id)
	references praktikum(id_praktikum)
	on delete cascade on update cascade;

	alter table jadwalpraktikum add foreign key (mahasiswa_id)
	references mahasiswa(id_mahasiswa)
	on delete cascade on update cascade;
	
	alter table jadwalpraktikum add foreign key (jampraktikum_id)
	references jampraktikum(id_jampraktikum)
	on delete cascade on update cascade;