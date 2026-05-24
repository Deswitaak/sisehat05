<?php
// 1. Header CORS wajib di paling atas agar React bisa akses
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Tangani Preflight Request dari browser
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

/** @var mysqli $conn */
include 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    $email = $data['email'];
    $password = $data['password'];

    $query = "SELECT * FROM users WHERE email = '$email'";
    $result = mysqli_query($conn, $query);
    $user = mysqli_fetch_assoc($result);

    if ($user && password_verify($password, $user['password'])) {
        // Login sukses, kirim data user (kecuali password) ke Frontend
        unset($user['password']);
        echo json_encode(["status" => "success", "user" => $user]);
    } else {
        echo json_encode(["status" => "error", "message" => "Email atau password salah"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Data input kosong"]);
}
