<?php
$host = "localhost";
$user = "root";
$pass = "";
$db   = "sisehat"; // ⚠️ PASTIKAN nama database ini sama persis dengan yang di phpMyAdmin

$conn = mysqli_connect($host, $user, $pass, $db);

if (!$conn) {
    die(json_encode(["status" => "error", "message" => "Koneksi database gagal: " . mysqli_connect_error()]));
}
