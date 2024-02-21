-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 21, 2024 at 07:58 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inventaris`
--

-- --------------------------------------------------------

--
-- Table structure for table `barang`
--

CREATE TABLE `barang` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `stok_min` float DEFAULT 0,
  `stok_max` float DEFAULT 0,
  `qty` float DEFAULT 0,
  `createf_at` datetime NOT NULL DEFAULT current_timestamp(),
  `update_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `barang`
--

INSERT INTO `barang` (`id`, `name`, `stok_min`, `stok_max`, `qty`, `createf_at`, `update_at`) VALUES
(1, 'Pensil', 15, 100, 69, '2024-02-21 21:24:46', '2024-02-22 00:36:30'),
(2, 'Buku', 50, 200, 46, '2024-02-21 21:27:23', '2024-02-22 01:05:56');

-- --------------------------------------------------------

--
-- Table structure for table `stok`
--

CREATE TABLE `stok` (
  `id` int(11) NOT NULL,
  `tanggal` date NOT NULL,
  `no_po` text DEFAULT NULL,
  `id_barang` int(11) NOT NULL,
  `masuk` float DEFAULT 0,
  `keluar` float DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `update_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stok`
--

INSERT INTO `stok` (`id`, `tanggal`, `no_po`, `id_barang`, `masuk`, `keluar`, `created_at`, `update_at`) VALUES
(1, '2024-02-21', 'sds', 1, 50, 0, '2024-02-21 22:45:37', '2024-02-21 22:45:37'),
(3, '2024-02-21', 'dfdf', 1, 24, 0, '2024-02-21 23:40:07', '2024-02-21 23:40:07'),
(4, '2024-02-21', 'xz', 2, 46, 0, '2024-02-21 23:40:27', '2024-02-21 23:40:27'),
(7, '2024-02-22', 'wewe', 1, 0, 5, '2024-02-22 00:36:30', '2024-02-22 00:36:30');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `id_level` int(11) NOT NULL DEFAULT 3,
  `username` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `fullname` varchar(100) DEFAULT 'NULL',
  `pwd` varchar(100) DEFAULT NULL,
  `flag_active` tinyint(1) UNSIGNED NOT NULL DEFAULT 1 COMMENT '0:blocked 1:active ',
  `tgl_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updater` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `id_level`, `username`, `email`, `fullname`, `pwd`, `flag_active`, `tgl_update`, `updater`) VALUES
(1, 1, 'admin', 'wfransm@gmail.com', 'Admin', '123', 1, '2024-02-21 18:47:49', '1'),
(14, 2, 'staff', NULL, 'NULL', '123', 1, '2024-02-21 18:48:04', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users_level`
--

CREATE TABLE `users_level` (
  `id` int(5) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `last_chg_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_chg_user` int(5) NOT NULL COMMENT 'user terakhir pengubah record',
  `is_active` tinyint(1) NOT NULL DEFAULT 1 COMMENT 'status aktif 1 atau dimatikan 0(hapus)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users_level`
--

INSERT INTO `users_level` (`id`, `nama`, `last_chg_time`, `last_chg_user`, `is_active`) VALUES
(1, 'Admin', '2020-09-25 19:09:36', 1, 1),
(2, 'Staff gudang', '2020-09-26 01:42:00', 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `barang`
--
ALTER TABLE `barang`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stok`
--
ALTER TABLE `stok`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `users_level`
--
ALTER TABLE `users_level`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `barang`
--
ALTER TABLE `barang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `stok`
--
ALTER TABLE `stok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `users_level`
--
ALTER TABLE `users_level`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
