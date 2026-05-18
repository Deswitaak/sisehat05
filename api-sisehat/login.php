<?php
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
}
