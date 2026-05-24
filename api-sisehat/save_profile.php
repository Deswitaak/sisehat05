<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

include 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id_user'])) {
    $id_user     = intval($data['id_user']);
    $nama_usaha  = mysqli_real_escape_string($conn, $data['nama_usaha']);
    $kategori    = mysqli_real_escape_string($conn, $data['kategori']);
    $jenis_usaha = mysqli_real_escape_string($conn, $data['jenis_usaha']);
    $lama_usaha  = intval($data['lama_usaha']);
    $role        = mysqli_real_escape_string($conn, $data['role']);

    $query = "INSERT INTO usaha (id_user, nama_usaha, kategori, jenis_usaha, lama_usaha, role) 
              VALUES ($id_user, '$nama_usaha', '$kategori', '$jenis_usaha', $lama_usaha, '$role')
              ON DUPLICATE KEY UPDATE 
              nama_usaha='$nama_usaha', kategori='$kategori', jenis_usaha='$jenis_usaha', lama_usaha=$lama_usaha, role='$role'";

    if (mysqli_query($conn, $query)) {
        echo json_encode(["status" => "success", "message" => "Profil usaha berhasil disimpan"]);
    } else {
        echo json_encode(["status" => "error", "message" => mysqli_error($conn)]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "ID User tidak valid"]);
}
