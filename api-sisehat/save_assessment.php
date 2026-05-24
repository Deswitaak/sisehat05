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

if (isset($data['id_user']) && isset($data['total_score'])) {
    $id_user     = intval($data['id_user']);
    $total_score = floatval($data['total_score']);

    // Ambil nilai masing-masing faktor dari array frontend
    $ov = 0;
    $li = 0;
    $ir = 0;
    $ep = 0;
    $os = 0;
    $qw = 0;
    foreach ($data['factors'] as $f) {
        if ($f['name'] === 'OV') $ov = floatval($f['score']);
        if ($f['name'] === 'LI') $li = floatval($f['score']);
        if ($f['name'] === 'IR') $ir = floatval($f['score']);
        if ($f['name'] === 'EP') $ep = floatval($f['score']);
        if ($f['name'] === 'OS') $os = floatval($f['score']);
        if ($f['name'] === 'QW') $qw = floatval($f['score']);
    }

    // Klasifikasi Status berdasarkan Threshold
    if ($total_score >= 85) {
        $status = "Optimal";
    } elseif ($total_score >= 70) {
        $status = "Stabil";
    } else {
        $status = "Perlu Perhatian";
    }

    $query = "INSERT INTO asesmen (id_user, total_score, status, ov_score, li_score, ir_score, ep_score, os_score, qw_score) 
              VALUES ($id_user, $total_score, '$status', $ov, $li, $ir, $ep, $os, $qw)";

    if (mysqli_query($conn, $query)) {
        echo json_encode(["status" => "success", "message" => "Hasil asesmen berhasil direkam"]);
    } else {
        echo json_encode(["status" => "error", "message" => mysqli_error($conn)]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Data asesmen tidak lengkap"]);
}
