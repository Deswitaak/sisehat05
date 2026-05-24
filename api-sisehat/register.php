<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

/** @var \mysqli $conn */
include 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['username']) && isset($data['password'])) {
    $username = mysqli_real_escape_string($conn, $data['username']);
    $password = password_hash($data['password'], PASSWORD_BCRYPT);

    $checkUser = mysqli_query($conn, "SELECT * FROM users WHERE username = '$username'");
    if (mysqli_num_rows($checkUser) > 0) {
        echo json_encode(["status" => "error", "message" => "Username sudah terdaftar"]);
        exit;
    }

    $query = "INSERT INTO users (username, password) VALUES ('$username', '$password')";
    if (mysqli_query($conn, $query)) {
        echo json_encode(["status" => "success", "message" => "Registrasi berhasil"]);
    } else {
        echo json_encode(["status" => "error", "message" => mysqli_error($conn)]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Input data tidak lengkap"]);
}
