<?php
// Mengatur header CORS agar React lokal (Port 5173) bisa mengakses API XAMPP tanpa terblokir
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// =========================================================================
// KONFIGURASI DATABASE LOCAL (XAMPP) - AMAN UNTUK GITHUB
// =========================================================================
$host = "localhost";
$user = "root";
$pass = "";
$db   = "sisehat"; // Pastikan nama database di phpMyAdmin lokal kamu adalah 'sisehat'

// Eksekusi koneksi ke MySQL lokal
$conn = mysqli_connect($host, $user, $pass, $db);

// Validasi jika koneksi XAMPP mati
if (!$conn) {
    header('HTTP/1.1 500 Internal Server Error');
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode([
        "status" => "error",
        "message" => "Gagal terhubung ke MySQL lokal XAMPP. Pastikan Apache & MySQL di XAMPP Control Panel sudah dinyalakan: " . mysqli_connect_error()
    ]);
    exit;
}

// Set charset ke UTF-8 agar respon data tidak corrupt saat di-fetch React
mysqli_set_charset($conn, "utf8");
