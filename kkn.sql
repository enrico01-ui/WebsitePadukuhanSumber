-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 16, 2026 at 09:58 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sumber`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `galeris`
--

CREATE TABLE `galeris` (
  `id` int(11) NOT NULL,
  `gambar` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `nama` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `galeris`
--

INSERT INTO `galeris` (`id`, `gambar`, `created_at`, `updated_at`, `nama`) VALUES
(2, 'gereja1.jpg', '2025-07-23 03:03:08', '2025-07-23 03:03:08', 'gereja kristen'),
(3, 'pura.jpg', '2025-07-25 09:18:46', '2025-07-25 09:18:46', 'Pura'),
(4, 'gereja2.jpg', '2025-07-25 09:18:46', '2025-07-25 09:18:46', 'Gereja Bukit Zaitun'),
(5, 'masjid.jpg', '2025-07-25 09:18:46', '2025-07-25 09:18:46', 'Masjid Al-Ikhlas'),
(6, '1753442233_simbol_sumber.jpg', '2025-07-25 04:17:13', '2025-07-25 04:17:13', 'Simbol Sumber');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `laporans`
--

CREATE TABLE `laporans` (
  `id` int(11) NOT NULL,
  `nama_laporan` varchar(255) NOT NULL,
  `file` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_07_08_063331_create_personal_access_tokens_table', 1),
(5, '2025_07_08_064539_create_sites_table', 1),
(6, '2025_07_08_064539_create_umkms_table', 1),
(7, '2025_07_08_064540_create_products_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `potensis`
--

CREATE TABLE `potensis` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `deskripsi` varchar(255) NOT NULL,
  `penanggung_jawab` varchar(255) NOT NULL,
  `gambar` varchar(255) NOT NULL,
  `jenis` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `potensis`
--

INSERT INTO `potensis` (`id`, `nama`, `deskripsi`, `penanggung_jawab`, `gambar`, `jenis`, `created_at`, `updated_at`) VALUES
(1, 'Kesenian Jatilan', 'Pertunjukan tradisional kuda lumping yang menggambarkan ketangkasan prajurit dengan iringan musik gamelan.', 'Pak Mayanto', 'jatilan.jpg', 'Tarian', '2025-07-12 06:50:16', '2025-07-12 06:50:16'),
(2, 'Doger \"Turonggo Jati Manunggal\"', 'Tarian rakyat khas Jawa yang menggambarkan semangat gotong royong dan kebersamaan masyarakat.', 'Ari Irfanto', 'doger.jpg', 'Tarian', '2025-07-12 06:50:16', '2025-07-12 06:50:16'),
(3, 'Reog \"Pangestu Mergo Budaya\"', 'Seni pertunjukan tradisional yang memadukan tari, musik, dan akrobatik dengan topeng kepala singa dan bulu merak.', 'Pak Teguh', 'reog.jpg', 'Tarian', '2025-07-12 06:50:16', '2025-07-12 06:50:16');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `umkm_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `description` text DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `umkm_id`, `name`, `price`, `description`, `image_url`, `created_at`, `updated_at`) VALUES
(37, 6, 'Asbak Bentuk Hewan', 0.00, 'Asbak yang dapat berbentuk ikan, kura-kura, dll', 'asbak.jpg', '2025-07-26 12:01:07', '2025-07-26 12:01:07'),
(39, 15, 'Sapi Ternak', 0.00, 'Sapi Ternak Gunung Kidul.', 'sapi_ternak.jpeg', '2025-07-26 12:01:07', '2025-07-26 12:01:07'),
(40, 52, 'Layanan Angkut', 0.00, 'Jasa angkut barang antar daerah', 'jasa_angkut.jpeg', '2025-07-26 12:01:07', '2025-07-26 12:01:07'),
(41, 53, 'Ikan Laut Segar', 0.00, 'Berbagai macam ikan laut', 'ikan.jpg', '2025-07-26 12:01:07', '2025-07-26 12:01:07'),
(42, 28, 'Layanan Transfer Tunai', 0.00, 'Jasa transfer tunai via BRI Link.', 'bri_link.jpg', '2025-07-26 12:01:07', '2025-07-26 12:01:07'),
(43, 54, 'Jahit Baju Seragam', 0.00, 'Jasa jahit seragam sekolah atau kerja.', 'jahit_baju.jpg', '2025-07-26 12:01:07', '2025-07-26 12:01:07'),
(44, 55, 'Dekorasi Pernikahan', 0.00, 'Dekorasi lengkap acara pernikahan.', 'dekorasi_nikah.jpg', '2025-07-26 12:01:07', '2025-07-26 12:01:07'),
(45, 56, 'Lemari Jati 2 Pintu', 0.00, 'Lemari jati cocok untuk kamar tidur.', 'lemari_jati.jpg', '2025-07-26 12:01:07', '2025-07-26 12:01:07'),
(46, 57, 'Sapi Qurban', 0.00, 'Sapi sehat cocok untuk qurban.', 'sapi_qurban.jpg', '2025-07-26 12:01:07', '2025-07-26 12:01:07'),
(47, 58, 'Peternakan Sapi', 0.00, 'Peternakan Sapi Rt 6', 'sapi.jpg', '2025-07-26 12:01:07', '2025-07-26 12:01:07');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('0XKJLoXCOusdVoyQe5utehGs8Bzmh4wgZ4BONJZD', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQVZaZ0VWMURIOVBwUEVub0hNVThKTDg3cERqM0NHQkJzMVlmYzFjRCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDY6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9nYW1iYXIva3Vyc2lfbnlhbnRhaS5qcGciO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1753180119),
('2nvGDzaBEUYlg5PZnILjPdc8gKIcujjHQ0pT86wO', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQ0hJZ0JTMHlWT0VnOWh3dFpHTFByRTNOMUwzZDBnRlMzcmtIT3loVSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wZGYvc2ltYm9sX3N1bWJlci5qcGciO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1753260368),
('4Vi8l9w27EAlsS2sHGOi5ft3tWARFA0NSCDA2bnt', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoieENiaDU5Y3U1bTlrYnJaM3dTVjc4WEczbXhGQmdSeVBucFV1TXpBcCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wZGYvZ2VyZWphMS5qcGciO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1753260367),
('5ArPMjAdXTorTGdnGuunOp8L2EYU3GbZYHsu8YEZ', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiY3hUdHpXZWxnUlFDNXo1SGFEZFFDTlRFWDFnb2NJaWZYWmRTaEJYSyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wZGYvc2ltYm9sX3N1bWJlci5qcGciO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1753261243),
('69ngQxv5BDBcpgsuLSUyjCMmQ0GcH1aUhFCK5vZq', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiOFU5TnlveExGQ2VtY0F4enhsdjRkVFFLdWowa2N2aldYQXA5Rkp0dCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDI6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9nYW1iYXIva3Vyc2lfbnlhbnRhaSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753174362),
('6HUZSVZJSKOQAdkZVOzpOURYtzesWmKQ6zbJyttc', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRWdZbDduME1SRHhIbGRWVHdZcjUydTdhaHYzeUhWcjYzVGpLUVI0eiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NjA6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wZGYvU0tSSVBTSV9GYXRpbWFoX0FyaWFfVXRhbWktbWluLnBkZiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753426832),
('6kbYpBSMbNWwZQtoMb9Vm3H4COOaqbvq1JUEYD1m', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoieDBOcWdUUnpDMW1wanliUjRVMXF0OVpmemlDbTlvNWRiRmFjeFpzQiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDY6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9nYW1iYXIva3Vyc2lfbnlhbnRhaS5qcGciO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1753174909),
('aoppncofRRvOdkoHxT1VEurX3SAVKFSwq6SowrpB', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVk1hU29RalMweTdoOU9NUkUxREI0dnVIRDFNVzBzMlFtamhrUTQ5RiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wZGYvZ2VyZWphMS5qcGciO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1753260368),
('aPrXrOd6RmcqFnC3u9QwIjtnxYQGOGZi6seFrJ9a', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiT3pSbmxMWnFzemtzYlJBN1dESkhpb2dRY1pUT0pnVzQxbndaaVd5NSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wZGYvc2ltYm9sX3N1bWJlci5qcGciO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1753261832),
('BgjlWXXKaIX84mohN580GoKxJXMZvtjrLajx4Gd6', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUU5oZEJSOTU3T1p1MzhhUlhibkwxNnFtMjBUTmNZNElEcVE5TFJqcSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wZGYvZ2VyZWphMS5qcGciO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1753261244),
('bvHgb7ocoPi2pgCd8XrG0yUkQOSS9gBUwi3idRyI', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVUJKZEVRTFFwZmRnb0FSWWdrdE9tNmJFVFg5b3pzdUFaRDhIWkVqVCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wZGYvc2ltYm9sX3N1bWJlci5qcGciO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1753260367),
('BxIgfnrjxMz14USNmXxm7zVIjELWsftMuvTOJg1n', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMDFraXdnTTlMMmswSGF5ZElaZENWdmUxU0NuZXRsSmhYZWpRUGc4ZyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wZGYvc2ltYm9sX3N1bWJlci5qcGciO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1753261251),
('CCOgGMDCzkgXpoXvPSIEoQLPGZPurAzFACorU06q', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTE9lZDhYTzRNcGhRbnRlcWxJQlBzRDhFNUdiOHE0VG9ra0pzSGZpRiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDI6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9nYW1iYXIva3Vyc2lfbnlhbnRhaSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753174097),
('CZBoQYkEoG6HUB2cpZzCQ527KxYf9qopHqabsfuw', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiYjh4bFppM3BrcE9YVGEzOTFpWDhWSXVNWlRqYWVwUnZGbzRJOVNZMSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wZGYvc2ltYm9sX3N1bWJlci5qcGciO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1753260397),
('F1X5TSpyzKOAVLrpKTP6HidCgSR3YuuM8FLtrXfJ', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiV1JWUVc3Wjl2czJqMk1TMmV6ZUFzSjdGUTR5MnBzb3N1OVhVVHNZViI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wZGYvc2ltYm9sX3N1bWJlci5qcGciO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1753260083),
('f5YpNvXVz8sOCxoxCe21K6pYuLkAayV1T6aLpbNM', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQ3YyQ2RiYkxEaUZ0aWFyUEUwY2J4NnFHYk92WjRlemc0SWRwZTRqSiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wZGYvZ2VyZWphMS5qcGciO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1753260316),
('FTjSu5mVLAxoSQTnNPX2AGNrT7f1ppfYmZOt222l', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSGNYTkRTc1lVTUhyY2Rwa0FucDhlWXExTkxiVE91VUlYWURvWUdFWCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wZGYvc2ltYm9sX3N1bWJlci5qcGciO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1753260703),
('GPaoay0ccc38mrjfVel4evR2NReAyVOK95PUT8qZ', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSjdYSHg1RDFuWHBISDNLRldFNmJOWXFhVlh3VUJFTktLWHoxQm1JMSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wZGYvZ2VyZWphMS5qcGciO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1753262412),
('JwtgAQBoufWMduUs64hvedzI4xZpwAuJdSn8YCc8', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiR3dTZmpwbms4UUJ4RHRadzVYS1NaaFJkUTllTURFNnJOYU16TTlxOSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wZGYvc2ltYm9sX3N1bWJlci5qcGciO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1753262413),
('maZKYVrcicm5pNP1o7Sjk0ANWwOJA8xWY8YPaiGu', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoieW5hYzk0T2FvUDFEcnpkT1V4OFVraUpIZFUxbXJDbTVRc3I1MDJYYiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wZGYvc2ltYm9sX3N1bWJlci5qcGciO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1753260317),
('mSVfgx60iX6KpEDMjtcLvX78XJOb7CZVxdiTTXau', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibE9CQ3JSOHYxQlBSREROYnYxMlR4V1FRZXp1OHF1OXVGZW1lUTBPRCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDI6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9nYW1iYXIva3Vyc2lfbnlhbnRhaSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753174557),
('nWoGIn8kH6cdm3lcN4emVlsTMCz2bgO7UGhVLv8v', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidTBwaGQ3RlFZS2NBT3piZXZ5U1U4VFZPV3pWZGNhaEsxMFlCTnNOMSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wZGYvc2ltYm9sX3N1bWJlci5qcGciO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1753260318),
('OuR0WmwTw9SrisC7d56WBt8XaBI8ubhD2qD5S0nK', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicmdxV3JseVplcGxwaVE4eXdwSXRCZDBrR2hNdjNtUXhReEk0Y3JYYSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDI6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9nYW1iYXIva3Vyc2lfbnlhbnRhaSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753174210),
('ovrZp7XtyTN8reDxaYoO0tFF5mw0T7RmcwJwEXcG', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWU1QS09jRVg2S3lOSHljemMyRzRydGVlYU5aSmVxekxIZGRiOFpNZSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NTg6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wZGYvTW9kdWxfUGVuZ29wZXJhc2lhbl9Lb21wdXRlci5wZGYiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1753432794),
('oxRUlp5sM5qvZhPbhiSGm8yUgFiSRdZcI3ha5utL', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSXptTTgyZGpVQVdhSE9TSFJSM25HZkpQVVBjNHR3bkMwYXNOMWlUVCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wZGYvZ2VyZWphMS5qcGciO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1753260168),
('P9X7RNA7NzxXTk7CWKyZNOI6QJWzs8iQFbIBzuh1', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoid2Jnb2lVNWtNNFcyaGNJYmVkZTRvWXdhRUc2T2E4ZVBoaXg3Q3dMZCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wZGYvZ2VyZWphMS5qcGciO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1753261251),
('pjf4iboXWaBC9wUnnj1Jhs7VrhcvTVSvEYUZTfA4', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiM0FFaVlYSE8wSUVGengxZGl2QWtGTWxpRTFBRzZ6eVVZdWlXeXM0eCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NjA6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wZGYvU0tSSVBTSV9GYXRpbWFoX0FyaWFfVXRhbWktbWluLnBkZiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753259945),
('Pp07MuQHkUn0MHHRdzAcc02INQ7q3bHTLlgQ6467', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQTBSYkZGRkFldk02dHhHQnNWRUFPZ2d6WHVDV1AzeFRaRUJCZEhjVCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wZGYvZ2VyZWphMS5qcGciO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1753260197),
('r4NCSFVO25qtKmuev5uWxOJDP11cyXPThWpSWwoW', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRlV2MTNDT3Y2Zzh5aVdXNG1BYnZvQWQxN0l6em9ZYW81SlBPUkxZWCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wZGYvc2ltYm9sX3N1bWJlci5qcGciO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1753261832),
('RH4dSGyy68sAU8mlYM8aKTq5d0u7YxHK0dFCq7km', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQ0tHb0dRelIxT0JBQzk4a3lzamEyd0JNY0lleHZQMWJOMXhnMlQzQiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wZGYvc2ltYm9sX3N1bWJlci5qcGciO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1753261251),
('RNxO5n1bjktKwiDlQ2Fw6y07UHzx2wuXVoW52VU4', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSXZ4V3R3dEswQzd2Ym5NVEFVRWNMWlhMT3dNbkFQR05NbENRUkRYQyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wZGYvZ2VyZWphMS5qcGciO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1753260083),
('spTofUFWtt6kwaTWE1hVfqNyIfGYxJKzPpVOM5Py', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUk9sM2pUSDh6eTE4bzk2MnRIYWxOdVgyRWdjT1NRa0NnVVd5OGNnYSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wZGYvc2ltYm9sX3N1bWJlci5qcGciO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1753260315),
('tINAvo8buNIunccPJvjf8IJOAeXU0peq8sDs8rzu', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWlRMQXYwVjVXTndlNW1OR3V4Wk5tQ0pNampDTGhRVkNVT0N3MUFDWiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NjA6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wZGYvU0tSSVBTSV9GYXRpbWFoX0FyaWFfVXRhbWktbWluLnBkZiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753426835),
('Tr802R7m27fevQjgMSwVGOi3RH7Bn3BayrAt96JQ', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoielRSOVBjS3N2QklkUjZyamU5Z1VSYzMxejFwNndYOTM4M01ISk85RiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wZGYvc2ltYm9sX3N1bWJlci5qcGciO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1753260197),
('tvaI4NAGh8nPZIvApxo6eWuJMXNm7qpsTXlpT0Ux', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVW44SGJHMG9aM1lsZDZucGVVQ0NJNlUwTFdtTm9BaEN5WFB1RDR5UyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9nYW1iYXIvdW5kZWZpbmVkIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1753173915),
('tvBXYxCr76LIAB0KO5702oR64iYQVdY1oF8RWu0n', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoic051Uk9ob1pPSzhJQVNNbWlGalF4cXpTUFgzRDlxMXJ5VGQ2bWk5byI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDY6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9nYW1iYXIvW29iamVjdCUyME9iamVjdF0iO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1753174093),
('tvWmEKwOi5CjScS0wNFWJxTmXyLwuRfVo2PTByQo', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUmFoUzVWYW1WaHRmREY0V3F1TjlGWE02OENudkJiZ21CMUlJMXI0ayI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wZGYvc2ltYm9sX3N1bWJlci5qcGciO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1753260397),
('U0TGNinQaIJFn3BDXpx8v2nDfZFL5L1dVY7WNYQW', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRm9PVTllWVJKSzBxOUt2NVNJQm9mRkh3MGNlOWl2b1F2VWZLUlBzeiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wZGYvZ2VyZWphMS5qcGciO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1753260318),
('u7Tns1A5khTj7HwosTUSmBqL63fysanGdrZifSd4', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSFpTOWVEVnZBdkNCRGc5OVh5V3JEd09Pa0llVk5rVFV4OFRlejBwdSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wZGYvZ2VyZWphMS5qcGciO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1753261244),
('UwfpUnPTEzG9MRaP6ydQawUBoRB3fgw8KJ9dDNxG', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoia3NFOVdTdlIyZlJ3QVBscVV6cTk2VGp3VEprRVdWOTduTGV0YXZ6cSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NTg6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wZGYvTW9kdWxfUGVuZ29wZXJhc2lhbl9Lb21wdXRlci5wZGYiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1753528863),
('V9bOuW1gnThTjxqfxOyWfk5iPR2W6WQk6Zrwgtus', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZ3ZmMkNlWDFDMjYzVzh1SlRuRDRZUFl4MElrT1YyQ0d4STJTWmc1YiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wZGYvc2ltYm9sX3N1bWJlci5qcGciO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1753260168),
('voQmD1jSGOGlqAGaCI9bnzg72KIzRNFzL6iFpoxQ', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQUxkVGxUa1l5U2QwNHZ1RmR1azE1UTFhUUM4V3pWZVpNM2d1b1J3NCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wZGYvc2ltYm9sX3N1bWJlci5qcGciO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1753262412),
('Ws83MIUkYoybtZKOJH8b3E501mFBQdVOsPBPSvum', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiN055QXRQOFJROGdET09yZGZsdTdYUTFrOGdMOUxJN0VWRnZ1aWhXRSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9nYW1iYXIvdW5kZWZpbmVkIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1753174060),
('y0E2OouAuBRQ4NRTn5Vh1PaeMwtFedcUJceFVeZt', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiS2h1RUNyQVRCVWVObUlUN0RnbW5GV3pGdWdiYU42S2RaajhnTUp5ZyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDY6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9nYW1iYXIva3Vyc2lfbnlhbnRhaS5qcGciO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1753174975),
('YyxDcFDiLH9UOlcCuJOn77xOlNqAM7ClCmpHng9c', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWEMwQXpzOHliakU2Qjl0bkdSQ015cUFiWHlhejZzMGhMc2s5YlBGcyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wZGYvZ2VyZWphMS5qcGciO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1753261251),
('zjdJftbZA9lLhRWilORVANxPCvQ5QnKsplJb8Xur', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiV1MxeEgwYzdDTUJkNnVWd3lYdEhFdmZLQ28weWN0SEhnWTYwUktKaSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDI6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9nYW1iYXIva3Vyc2lfbnlhbnRhaSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1753174449);

-- --------------------------------------------------------

--
-- Table structure for table `sites`
--

CREATE TABLE `sites` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `year_established` int(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sites`
--

INSERT INTO `sites` (`id`, `name`, `type`, `description`, `image_url`, `year_established`, `location`, `created_at`, `updated_at`) VALUES
(1, 'Sendang Sumber Ur', 'Religi', 'Sumber mata air alami yang dipercaya masyarakat sebagai tempat keramat dan sumber kehidupan sejak zaman nenek moyang.', 'https://images.unsplash.com/photo-1564491414126-6a5f1648c89d?w=800&h=400&fit=crop', 1800, 'Padukuhan Sumber, Gunungkidul', '2025-07-10 09:10:33', '2025-07-10 09:10:33'),
(2, 'Petilasan Ki Ageng Wonolelo', 'Religi', 'Tempat semedi tokoh penyebar agama Islam di wilayah Gunungkidul yang masih dijaga kesuciannya.', 'https://images.unsplash.com/photo-1532274402917-5aadf881bdfd?w=800&h=400&fit=crop', 1700, 'Padukuhan Sumber, Gunungkidul', '2025-07-10 09:10:33', '2025-07-10 09:10:33'),
(3, 'Pohon Jati Keramat', 'Budaya', 'Pohon jati tua berusia ratusan tahun yang dipercaya sebagai penjaga desa dan sering digunakan untuk ritual adat.', 'https://images.unsplash.com/photo-1603052875723-5fce740b94d6?w=800&h=400&fit=crop', 1850, 'Padukuhan Sumber, Gunungkidul', '2025-07-10 09:10:33', '2025-07-10 09:10:33'),
(4, 'Gubug Perintis Kemerdekaan', 'Sejarah', 'Gubug sederhana tempat berkumpul para pejuang desa saat masa penjajahan Jepang.', 'https://images.unsplash.com/photo-1549388604-817d15aa0110?w=800&h=400&fit=crop', 1942, 'Padukuhan Sumber, Gunungkidul', '2025-07-10 09:10:33', '2025-07-10 09:10:33'),
(5, 'Padepokan Seni Sumber Laras', 'Budaya', 'Tempat latihan seni tari dan karawitan tradisional yang aktif sejak 1980-an, berperan dalam pelestarian budaya lokal.', 'https://images.unsplash.com/photo-1585499585184-0b9dd01b08fe?w=800&h=400&fit=crop', 1982, 'Padukuhan Sumber, Gunungkidul', '2025-07-10 09:10:33', '2025-07-10 09:10:33');

-- --------------------------------------------------------

--
-- Table structure for table `umkms`
--

CREATE TABLE `umkms` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `owner_name` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `umkms`
--

INSERT INTO `umkms` (`id`, `name`, `owner_name`, `contact`, `address`, `description`, `created_at`, `updated_at`) VALUES
(6, 'Usaha Mebel dan Toko Bangunan', 'Andreas Sardi', '6281359616218', 'RT 01', 'Mebel dan toko bangunan', '2025-07-21 06:50:51', '2025-07-21 01:51:14'),
(7, 'Ayam Potong & Service Elektronik', 'Taguh S.Pd.C', NULL, 'RT 01', 'Ayam potong, servis elektronik, kulkas, mesin cuci, freezer showcase', '2025-07-21 06:50:51', '2025-07-21 06:50:51'),
(8, 'Servis Elektronik', 'Imanuel Mulyo', NULL, 'RT 01', 'Servis elektronik', '2025-07-21 06:50:51', '2025-07-21 06:50:51'),
(9, 'Warung Kelontong & Toko Pertanian', 'Wasi\'iyem', NULL, 'RT 01', 'Warung kelontong dan toko pertanian', '2025-07-21 06:50:51', '2025-07-21 06:50:51'),
(10, 'Warung Kelontong', 'Sutiah', NULL, 'RT 01', 'Kelontong', '2025-07-21 06:50:51', '2025-07-21 06:50:51'),
(11, 'Toko Bangunan & Jasa Angkut', 'Sukardiyono', NULL, 'RT 01', 'Toko bangunan dan jasa angkut', '2025-07-21 06:50:51', '2025-07-21 06:50:51'),
(12, 'Gorengan, Roti, Dawet, Es Teh', 'Karsiyem', NULL, 'RT 01', 'Gorengan, roti, dawet, es teh', '2025-07-21 06:50:51', '2025-07-21 06:50:51'),
(13, 'Mebel & Furniture', 'Ngatino', '6285600839782', 'RT 01', 'Mebel dan furniture', '2025-07-21 06:50:51', '2025-07-21 06:50:51'),
(14, 'Bengkel Sepeda Motor', 'Suharno', NULL, 'RT 01', 'Bengkel sepeda motor', '2025-07-21 06:50:51', '2025-07-21 06:50:51'),
(15, 'Peternakan Sapi', 'Bayu Irwanto', '6281915499327 ', 'RT 01', 'Peternakan sapi', '2025-07-21 06:50:51', '2025-07-21 06:50:51'),
(16, 'Angkutan & Jasa Angkut', 'Sutiman', NULL, 'RT 01', 'Jasa angkut', '2025-07-21 06:50:51', '2025-07-21 06:50:51'),
(17, 'Kelontong & Perdagangan Ikan', 'Rapi', NULL, 'RT 02', 'Kelontong dan perdagangan ikan', '2025-07-21 06:50:51', '2025-07-21 06:50:51'),
(18, 'Batikrum Rumahan', 'Bejo', NULL, 'RT 02', 'Batikrum', '2025-07-21 06:50:51', '2025-07-21 06:50:51'),
(19, 'Kelontong', 'Ngadiyem', NULL, 'RT 02', 'Kelontong', '2025-07-21 06:50:51', '2025-07-21 06:50:51'),
(20, 'Las dan Cat', 'Daniel Alpha Santoso', NULL, 'RT 02', 'Las dan cat', '2025-07-21 06:50:51', '2025-07-21 06:50:51'),
(21, 'Kelontong dan Pulangnya', 'Narto Wiyono', NULL, 'RT 02', 'Kelontong dan usaha lainnya', '2025-07-21 06:50:51', '2025-07-21 06:50:51'),
(22, 'Kelontong', 'Rita Lestari', NULL, 'RT 03', 'Kelontong', '2025-07-21 06:50:51', '2025-07-21 06:50:51'),
(23, 'Penjahit Batik', 'Ngadiman', NULL, 'RT 03', 'Penjahit batik', '2025-07-21 06:50:51', '2025-07-21 06:50:51'),
(24, 'Jasa Angkut', 'Sumardi', NULL, 'RT 03', 'Jasa angkut', '2025-07-21 06:50:51', '2025-07-21 06:50:51'),
(25, 'Kelontong', 'Supiniyem', NULL, 'RT 03', 'Kelontong', '2025-07-21 06:50:51', '2025-07-21 06:50:51'),
(26, 'Pom Bensin', 'Sukirno', NULL, 'RT 03', 'Pom bensin', '2025-07-21 06:50:51', '2025-07-21 06:50:51'),
(27, 'Jasa Campursari', 'Suyanti', NULL, 'RT 03', 'Campursari', '2025-07-21 06:50:51', '2025-07-21 06:50:51'),
(28, 'Agen BRI Link', 'Herman Raharjo', '6285786876768', 'RT 03', 'Agen BRI Link', '2025-07-21 06:50:51', '2025-07-21 06:50:51'),
(29, 'Angkutan & Laundry', 'Dwi Arianto', NULL, 'RT 03', 'Angkutan dan laundry', '2025-07-21 06:50:51', '2025-07-21 06:50:51'),
(30, 'Fotocopy', 'Jeni Arianto', NULL, 'RT 03', 'Fotokopi', '2025-07-21 06:50:51', '2025-07-21 06:50:51'),
(31, 'Jasa Lelono', 'Marsidi', NULL, 'RT 03', 'Jasa lelono', '2025-07-21 06:50:51', '2025-07-21 06:50:51'),
(32, 'Sanitasi', 'Noftiani', NULL, 'RT 03', 'Sanitasi', '2025-07-21 06:50:51', '2025-07-21 06:50:51'),
(33, 'Sanitasi', 'Susianto', NULL, 'RT 03', 'Sanitasi', '2025-07-21 06:50:51', '2025-07-21 06:50:51'),
(35, 'Kelontong', 'Triwo Samin', NULL, 'RT 03', 'Kelontong', '2025-07-21 06:50:51', '2025-07-21 06:50:51'),
(36, 'Kelontong, Sewa Angkut, Pelaminan', 'Kriyoko', NULL, 'RT 04', 'Kelontong, jasa angkut dan pelaminan', '2025-07-21 06:50:51', '2025-07-21 06:50:51'),
(37, 'Angkringan', 'Heri Subroto', NULL, 'RT 04', 'Angkringan', '2025-07-21 06:50:51', '2025-07-21 06:50:51'),
(38, 'Pedagang Pisang', 'Sardiyanto', NULL, 'RT 04', 'Pedagang pisang', '2025-07-21 06:50:51', '2025-07-21 06:50:51'),
(39, 'Jasa Gergaji', 'Saruk Susanto', NULL, 'RT 05', 'Jasa gergaji', '2025-07-21 06:50:51', '2025-07-21 06:50:51'),
(40, 'Kelontong', 'Salem', NULL, 'RT 05', 'Kelontong', '2025-07-21 06:50:51', '2025-07-21 06:50:51'),
(41, 'Pengrajin Kayu Balsa', 'Trihono', NULL, 'RT 05', 'Pengrajin kayu balsa', '2025-07-21 06:50:51', '2025-07-21 06:50:51'),
(42, 'Sound System dan Jasa Las', 'Yosef Tri Prakoso', NULL, 'RT 05', 'Sound system dan jasa las', '2025-07-21 06:50:51', '2025-07-21 06:50:51'),
(44, 'Kelontong', 'Sumantri', NULL, 'RT 06', 'Kelontong', '2025-07-21 06:50:51', '2025-07-21 06:50:51'),
(46, 'Kelontong', 'Suparjo', NULL, 'RT 06', 'Kelontong', '2025-07-21 06:50:51', '2025-07-21 06:50:51'),
(47, 'Jahit', 'Edi Yulianto', NULL, 'RT 06', 'Jahit', '2025-07-21 06:50:51', '2025-07-21 06:50:51'),
(48, 'Jahit & Jasa Angkut', 'Maryani', NULL, 'RT 06', 'Jahit dan jasa angkut', '2025-07-21 06:50:51', '2025-07-21 06:50:51'),
(49, 'Kelontong', 'Iten Dwi Supriono', NULL, 'RT 06', 'Kelontong', '2025-07-21 06:50:51', '2025-07-21 06:50:51'),
(50, 'Penjual Ikan', 'Sumanto', NULL, 'RT 06', 'Penjual ikan', '2025-07-21 06:50:51', '2025-07-21 06:50:51'),
(52, 'Jual beli sapi & Jasa Angkut', 'Supama', '6281226477919', 'RT 1', NULL, '2025-07-26 11:42:00', '2025-07-26 11:42:00'),
(53, 'Kelontong dan Pedagang Ikan', 'Paidi', '6282135426458', 'RT 2', NULL, '2025-07-26 11:42:00', '2025-07-26 11:42:00'),
(54, 'Jahit', 'Nofianto', '6282243229234', 'RT 3', NULL, '2025-07-26 11:42:00', '2025-07-26 11:42:00'),
(55, 'Jasa Dekorasi', 'Karyoto', '6285742406037', 'RT 3', NULL, '2025-07-26 11:42:00', '2025-07-26 11:42:00'),
(56, 'Mebel', 'Sasmorejo', '6285700285950', 'RT 6', 'Mebel', '2025-07-26 11:42:00', '2025-07-26 11:42:00'),
(57, 'Jual beli sapi dan kambing', 'Adi Wiyono', '6285600423613', 'RT 6', NULL, '2025-07-26 11:42:00', '2025-07-26 11:42:00'),
(58, 'Jual Beli Kayu dan Mebel', 'Jamiyo', '6285600423613', 'RT 6', 'Jual beli kayu dan mebel', '2025-07-26 11:42:00', '2025-07-26 11:42:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `galeris`
--
ALTER TABLE `galeris`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `laporans`
--
ALTER TABLE `laporans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `potensis`
--
ALTER TABLE `potensis`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_umkm_id_foreign` (`umkm_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `sites`
--
ALTER TABLE `sites`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `umkms`
--
ALTER TABLE `umkms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `galeris`
--
ALTER TABLE `galeris`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `laporans`
--
ALTER TABLE `laporans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `potensis`
--
ALTER TABLE `potensis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `sites`
--
ALTER TABLE `sites`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `umkms`
--
ALTER TABLE `umkms`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_umkm_id_foreign` FOREIGN KEY (`umkm_id`) REFERENCES `umkms` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
