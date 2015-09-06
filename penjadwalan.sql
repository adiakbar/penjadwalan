-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 06, 2015 at 01:37 
-- Server version: 5.6.16
-- PHP Version: 5.5.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `penjadwalan`
--

-- --------------------------------------------------------

--
-- Table structure for table `jadwalpraktikum`
--

CREATE TABLE IF NOT EXISTS `jadwalpraktikum` (
  `id_jadwal` int(11) NOT NULL AUTO_INCREMENT,
  `mahasiswa_id` int(11) DEFAULT NULL,
  `jampraktikum_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_jadwal`),
  KEY `mahasiswa_id` (`mahasiswa_id`),
  KEY `jampraktikum_id` (`jampraktikum_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `jadwalpraktikum`
--

INSERT INTO `jadwalpraktikum` (`id_jadwal`, `mahasiswa_id`, `jampraktikum_id`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 1, 2),
(4, 3, 2);

-- --------------------------------------------------------

--
-- Table structure for table `jampraktikum`
--

CREATE TABLE IF NOT EXISTS `jampraktikum` (
  `id_jampraktikum` int(11) NOT NULL AUTO_INCREMENT,
  `praktikum_id` int(11) DEFAULT NULL,
  `hari` varchar(50) DEFAULT NULL,
  `mulai` varchar(50) DEFAULT NULL,
  `selesai` varchar(50) DEFAULT NULL,
  `ruangan` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_jampraktikum`),
  KEY `praktikum_id` (`praktikum_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `jampraktikum`
--

INSERT INTO `jampraktikum` (`id_jampraktikum`, `praktikum_id`, `hari`, `mulai`, `selesai`, `ruangan`) VALUES
(1, 1, 'Senin', '10.00', '11.00', 'Laboratorium A'),
(2, 2, 'Selasa', '09.30', '10.45', 'Laboratorium A'),
(3, 4, 'Senin', '09:00', '10:00', 'Laboratorium B');

-- --------------------------------------------------------

--
-- Table structure for table `mahasiswa`
--

CREATE TABLE IF NOT EXISTS `mahasiswa` (
  `id_mahasiswa` int(11) NOT NULL AUTO_INCREMENT,
  `nama_mahasiswa` varchar(50) DEFAULT NULL,
  `nim` varchar(50) DEFAULT NULL,
  `rfid` varchar(50) DEFAULT NULL,
  `angkatan` varchar(50) NOT NULL,
  PRIMARY KEY (`id_mahasiswa`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `mahasiswa`
--

INSERT INTO `mahasiswa` (`id_mahasiswa`, `nama_mahasiswa`, `nim`, `rfid`, `angkatan`) VALUES
(1, 'M. Adi Akbar', 'K11110016', '12345', '2010'),
(2, 'Rizki Samsul', 'K11110021', '53465465', '2010'),
(3, 'Budiman', 'K1111', '2324343', '2010'),
(4, 'Alvin Antonious', 'K1111', '56547634', '2010'),
(5, 'M. Reza Noviansyah', 'K1111', '76573434', '2010');

-- --------------------------------------------------------

--
-- Table structure for table `praktikum`
--

CREATE TABLE IF NOT EXISTS `praktikum` (
  `id_praktikum` int(11) NOT NULL AUTO_INCREMENT,
  `nama_praktikum` varchar(100) DEFAULT NULL,
  `kode` varchar(50) DEFAULT NULL,
  `semester` varchar(50) DEFAULT NULL,
  `sks` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_praktikum`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `praktikum`
--

INSERT INTO `praktikum` (`id_praktikum`, `nama_praktikum`, `kode`, `semester`, `sks`) VALUES
(1, 'Algoritma Pemrograman', '3298472', 'Semester 1', '1 SKS'),
(2, 'Struktur Data', '34235', 'Semester 1', '1 SKS'),
(3, 'Mikrokontroller', '42342', 'Semester 5', '1 SKS'),
(4, 'Mikroprosesor', '2345345', 'Semester 5', '1 SKS'),
(5, 'PLC', '498320', 'Semester 7', '1 SKS');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `jadwalpraktikum`
--
ALTER TABLE `jadwalpraktikum`
  ADD CONSTRAINT `jadwalpraktikum_ibfk_1` FOREIGN KEY (`mahasiswa_id`) REFERENCES `mahasiswa` (`id_mahasiswa`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `jadwalpraktikum_ibfk_2` FOREIGN KEY (`jampraktikum_id`) REFERENCES `jampraktikum` (`id_jampraktikum`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `jampraktikum`
--
ALTER TABLE `jampraktikum`
  ADD CONSTRAINT `jampraktikum_ibfk_1` FOREIGN KEY (`praktikum_id`) REFERENCES `praktikum` (`id_praktikum`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
