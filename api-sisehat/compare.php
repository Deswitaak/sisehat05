<?php
include 'config.php';

// Menangkap parameter kategori usaha dari frontend (default ke 'Kuliner' jika kosong)
$kategori = isset($_GET['kategori']) ? mysqli_real_escape_string($conn, $_GET['kategori']) : 'Kuliner';

// Query agregasi SQL untuk menghitung rata-rata (AVG) skor industri
$query = "SELECT 
            AVG(a.total_score) AS avg_total,
            AVG(a.ov_score) AS avg_ov,
            AVG(a.li_score) AS avg_li,
            AVG(a.ir_score) AS avg_ir,
            AVG(a.ep_score) AS avg_ep,
            AVG(a.os_score) AS avg_os,
            AVG(a.qw_score) AS avg_qw
          FROM asesmen a
          INNER JOIN usaha u ON a.id_user = u.id_user
          WHERE u.kategori = '$kategori'";

$result = mysqli_query($conn, $query);

if ($result) {
    $row = mysqli_fetch_assoc($result);

    // Jika data kategori tersebut belum ada di DB, set default ke nilai 0 agar tidak null
    $response = [
        "kategori" => $kategori,
        "avg_total_score" => round(floatval($row['avg_total']), 2),
        "factors" => [
            ["name" => "OV", "score" => round(floatval($row['avg_ov']), 2)],
            ["name" => "LI", "score" => round(floatval($row['avg_li']), 2)],
            ["name" => "IR", "score" => round(floatval($row['avg_ir']), 2)],
            ["name" => "EP", "score" => round(floatval($row['avg_ep']), 2)],
            ["name" => "OS", "score" => round(floatval($row['avg_os']), 2)],
            ["name" => "QW", "score" => round(floatval($row['avg_qw']), 2)]
        ]
    ];

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($response);
} else {
    echo json_encode(["status" => "error", "message" => mysqli_error($conn)]);
}
