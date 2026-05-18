<?php
include 'config.php';

// Ambil data JSON dari Front End
$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    $user_id = $data['user_id'];

    // 1. Logika Perhitungan Skor (Contoh Sederhana)
    // Di sini kamu bisa memasukkan rumus algoritma prediksi yang telah ditentukan
    $skor_values = $data['q1'] + $data['q2']; // Contoh perhitungan sederhana
    $skor_leader = $data['q3'] + $data['q4'];
    $skor_resources = $data['q5'] * 0.5;
    $skor_operational = $data['q6'] * 0.8;
    $skor_workplace = $data['q7'] + 5;
    $skor_economic = $data['q8'] * 1.2;

    // 2. Simpan ke Tabel Assessment
    $query = "INSERT INTO assessment (user_id, skor_values, skor_leader, skor_resources, skor_operational, skor_workplace, skor_economic) 
              VALUES ('$user_id', '$skor_values', '$skor_leader', '$skor_resources', '$skor_operational', '$skor_workplace', '$skor_economic')";

    if (mysqli_query($conn, $query)) {
        echo json_encode([
            "status" => "success",
            "message" => "Prediksi berhasil dihitung dan disimpan",
            "results" => [
                "values" => $skor_values,
                "leader" => $skor_leader,
                "resources" => $skor_resources,
                "operational" => $skor_operational,
                "workplace" => $skor_workplace,
                "economic" => $skor_economic
            ]
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => mysqli_error($conn)]);
    }
}
