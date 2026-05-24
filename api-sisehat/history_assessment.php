<?php
include 'config.php';

// Pastikan parameter id_user dikirim oleh frontend
if (!isset($_GET['id_user'])) {
    header('HTTP/1.1 400 Bad Request');
    echo json_encode(["status" => "error", "message" => "Parameter id_user tidak ditemukan"]);
    exit;
}

$id_user = intval($_GET['id_user']);

// Query mengambil semua riwayat asesmen user diurutkan dari yang paling baru
$query = "SELECT total_score, status, ov_score, li_score, ir_score, ep_score, os_score, qw_score, tanggal_asesmen 
          FROM asesmen 
          WHERE id_user = $id_user 
          ORDER BY tanggal_asesmen DESC";

$result = mysqli_query($conn, $query);
$history = [];

if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $history[] = [
            "total_score" => floatval($row['total_score']),
            "status" => $row['status'],
            "tanggal_asesmen" => $row['tanggal_asesmen'], // Mengembalikan format YYYY-MM-DD HH:MM:SS
            "factors" => [
                ["name" => "OV", "score" => floatval($row['ov_score'])],
                ["name" => "LI", "score" => floatval($row['li_score'])],
                ["name" => "IR", "score" => floatval($row['ir_score'])],
                ["name" => "EP", "score" => floatval($row['ep_score'])],
                ["name" => "OS", "score" => floatval($row['os_score'])],
                ["name" => "QW", "score" => floatval($row['qw_score'])]
            ]
        ];
    }
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($history);
} else {
    echo json_encode(["status" => "error", "message" => mysqli_error($conn)]);
}
