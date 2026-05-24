<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

/** @var \mysqli $conn */
include 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['username']) && isset($data['password'])) {
    $username = mysqli_real_escape_string($conn, $data['username']);
    $password = $data['password'];

    $result = mysqli_query($conn, "SELECT * FROM users WHERE username = '$username'");
    if (mysqli_num_rows($result) === 1) {
        $row = mysqli_fetch_assoc($result);
        if (password_verify($password, $row['password'])) {
            echo json_encode([
                "status" => "success",
                "message" => "Login berhasil",
                "id_user" => intval($row['id_user']),
                "username" => $row['username']
            ]);
        } else {
            echo json_encode(["status" => "error", "message" => "Password salah"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Username tidak ditemukan"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Input data tidak lengkap"]);
}
