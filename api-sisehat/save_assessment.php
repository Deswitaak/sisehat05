<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

/** @var \mysqli $conn */
include 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id_user']) && isset($data['total_score'])) {
    $id_user     = intval($data['id_user']);
    $total_score = floatval($data['total_score']);

    $ov = 0;
    $li = 0;
    $ir = 0;
    $ep = 0;
    $os = 0;
    $qw = 0;
    if (isset($data['factors']) && is_array($data['factors'])) {
        foreach ($data['factors'] as $f) {
            if ($f['name'] === 'OV') $ov = floatval($f['score']);
            if ($f['name'] === 'LI') $li = floatval($f['score']);
            if ($f['name'] === 'IR') $ir = floatval($f['score']);
            if ($f['name'] === 'EP') $ep = floatval($f['score']);
            if ($f['name'] === 'OS') $os = floatval($f['score']);
            if ($f['name'] === 'QW') $qw = floatval($f['score']);
        }
    }

    // Penentuan otomatis status berdasar threshold tim frontend
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
        echo json_encode(["status" => "success", "message" => "Hasil asesmen berhasil disimpan"]);
    } else {
        echo json_encode(["status" => "error", "message" => mysqli_error($conn)]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Data hasil asesmen tidak lengkap"]);
}
