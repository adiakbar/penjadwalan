drop database if exists penjadwalan;
create database penjadwalan;
	use penjadwalan;

	create table mahasiswa(
		id_mhs integer primary key auto_increment,
		nama_mhs varchar(50),
		nim varchar(50),
		rfid varchar(50)
	)engine=innodb;

	create table matakuliah(
		id_matkul integer primary key auto_increment,
		nama_matkul varchar(50),
		kode varchar(50)
	)engine=innodb;

	create table jamkuliah(
		id_jamkul integer primary key auto_increment,
		matkul_id integer,
		hari varchar(50),
		mulai varchar(50),
		selesai varchar(50),
		ruangan varchar(50)
	)engine=innodb;

	create table jadwalkuliah(
		id_jadwal integer primary key auto_increment,
		mhs_id integer,
		jamkul_id integer
	)engine=innodb;


	alter table jamkuliah add foreign key (matkul_id)
	references matakuliah(id_matkul)
	on delete cascade on update cascade;

	alter table jadwalkuliah add foreign key (mhs_id)
	references mahasiswa(id_mhs)
	on delete cascade on update cascade;
	
	alter table jadwalkuliah add foreign key (jamkul_id)
	references jamkuliah(id_jamkul)
	on delete cascade on update cascade;