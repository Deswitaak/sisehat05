-- 1. TABEL USERS (Untuk Fitur Login/Register)
CREATE TABLE IF NOT EXISTS `users` (
  `id_user` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. TABEL USAHA (Untuk Simpan Profile Usaha)
CREATE TABLE IF NOT EXISTS `usaha` (
  `id_usaha` INT AUTO_INCREMENT PRIMARY KEY,
  `id_user` INT UNIQUE,
  `nama_usaha` VARCHAR(100) NOT NULL,
  `kategori` VARCHAR(50) NOT NULL, -- Contoh: Kuliner, Fashion, dll.
  `jenis_usaha` VARCHAR(100) NOT NULL,
  `lama_usaha` INT NOT NULL,
  `role` VARCHAR(50) NOT NULL,
  `jenis_kelamin` VARCHAR(20),
  `usia_pemilik` INT,
  FOREIGN KEY (`id_user`) REFERENCES `users`(`id_user`) ON DELETE CASCADE
);

-- 3. TABEL ASESMEN (Untuk Simpan Skor Akhir & Nilai Detail Faktor per Sesi)
CREATE TABLE IF NOT EXISTS `asesmen` (
  `id_asesmen` INT AUTO_INCREMENT PRIMARY KEY,
  `id_user` INT NOT NULL,
  `total_score` DECIMAL(5,2) NOT NULL,
  `status` VARCHAR(20) NOT NULL, -- Optimal, Stabil, Perlu Perhatian
  `ov_score` DECIMAL(5,2) NOT NULL, -- Faktor 1
  `li_score` DECIMAL(5,2) NOT NULL, -- Faktor 2
  `ir_score` DECIMAL(5,2) NOT NULL, -- Faktor 3
  `ep_score` DECIMAL(5,2) NOT NULL, -- Faktor 4
  `os_score` DECIMAL(5,2) NOT NULL, -- Faktor 5
  `qw_score` DECIMAL(5,2) NOT NULL, -- Faktor 6
  `tanggal_asesmen` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`id_user`) REFERENCES `users`(`id_user`) ON DELETE CASCADE
);