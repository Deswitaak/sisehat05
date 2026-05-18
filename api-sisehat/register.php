<?php
include 'config.php';

// Mengambil data JSON yang dikirim oleh React
$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    $full_name = $data['full_name'];
    $email = $data['email'];
    $whatsapp = $data['whatsapp_number'];
    $password = password_hash($data['password'], PASSWORD_DEFAULT); // Enkripsi password

    $query = "INSERT INTO users (full_name, email, whatsapp_number, password) 
              VALUES ('$full_name', '$email', '$whatsapp', '$password')";

    if (mysqli_query($conn, $query)) {
        echo json_encode(["status" => "success", "message" => "User berhasil didaftarkan"]);
    } else {
        echo json_encode(["status" => "error", "message" => mysqli_error($conn)]);
    }
}
