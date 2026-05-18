<?php
// Header agar Front End (React) bisa mengakses API ini
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$host = "localhost";
$user = "root";
$pass = "";
$db   = "sisehat";

$conn = mysqli_connect($host, $user, $pass, $db);

if (!$conn) {
    die("Koneksi ke database sisehat gagal: " . mysqli_connect_error());
}
