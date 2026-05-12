import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import NavbarDashboard from "../components/NavbarDashboard";
import { useEffect } from "react";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js";

import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip
);

export default function Hasil() {
  const location = useLocation();
  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);

  const data = location.state?.factors || [];
  const total = location.state?.total || 0;
  useEffect(() => {
  if (data.length) {
    const payload = {
      factors: data,
      total: total,
    };

    localStorage.setItem("hasilAnalisis", JSON.stringify(payload));
  }
}, [data, total]);

  // 🔥 ranking
  const sorted = [...data].sort((a, b) => b.score - a.score);
  const highest = sorted[0];
  const second = sorted[1];
  const third = sorted[2];
  const lowest = sorted[sorted.length - 1];

  // 🔥 chart config
  const chartData = {
    labels: data.map((d) => d.name),
    datasets: [
      {
        data: data.map((d) => d.score / 20),
        backgroundColor: "rgba(59,130,246,0.2)",
        borderColor: "#163456",
        pointBackgroundColor: "#163456",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: { legend: { display: false } },
    scales: {
      r: {
        min: 0,
        max: 5,
        ticks: { stepSize: 1 },
      },
    },
  };

  const getStatus = (score) => {
    if (score >= 85) return "OPTIMAL";
    if (score >= 70) return "STABIL";
    return "PERLU PERHATIAN";
  };

  return (
    <div className="bg-[#f4f7fb] min-h-screen">
      <NavbarDashboard />

      <div className="px-4 md:px-8 lg:px-16 py-6 md:py-10">

        {/* HEADER */}
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-400">Asesmen › Hasil Analisis</p>
            <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mt-2">
              Hasil Kesehatan Bisnis Anda
            </h1>
            <p className="text-gray-500 mt-2">
              Laporan berdasarkan 6 metrik utama
            </p>
          </div>

          {/* SCORE */}
          <div className="bg-white p-6 rounded-xl shadow w-[220px]">
            <p className="text-xs text-gray-400">CURRENT SCORE</p>

            <div className="flex justify-between items-center mt-2">
              <h2 className="text-4xl font-bold text-blue-900">
                {total}
                <span className="text-sm text-gray-400">/100</span>
              </h2>

              <div className="text-xs text-gray-500">
                <p className="font-semibold text-blue-900">
                  Stable Performance
                </p>
                <p>Meningkat 4.2%</p>
              </div>
            </div>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-3 gap-6 mt-8">

          {/* CHART */}
          <div className="col-span-2 bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-blue-900 mb-4">
              Organizational Spider Chart
            </h3>

            <div className="flex justify-center">
              <Radar data={chartData} options={options} />
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-6">

            {/* SUMMARY */}
            <div className="bg-[#2f436e] text-white p-6 rounded-xl shadow">
              <h3 className="font-semibold mb-4">Summary Insight</h3>

              <p className="text-sm opacity-90 leading-relaxed">
                Analisis menunjukkan kekuatan signifikan pada pilar{" "}
                <b>{highest?.name}</b> dan Stability.
                Disarankan untuk meningkatkan faktor{" "}
                <b>{lowest?.name}</b>.
              </p>

              <button className="mt-6 w-full border border-white/30 py-3 rounded-lg text-sm hover:bg-white/10">
                UNDUH LAPORAN PDF
              </button>
            </div>

            {/* METRIK */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold mb-4 text-blue-900">
                Metrik Teratas
              </h3>

              {[highest, second, third].map((item, i) => (
                <div key={i} className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item?.name}</span>
                    <span>{item?.score}/100</span>
                  </div>

                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div
                      className="bg-blue-900 h-2 rounded-full"
                      style={{ width: `${item?.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white mt-8 rounded-xl shadow overflow-hidden">

          <div className="flex justify-between items-center px-6 py-4 border-b">
            <h3 className="font-semibold text-blue-900">
              Rincian Skor Faktor Organisasi
            </h3>
          </div>

          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-400 text-xs">
              <tr>
                <th className="text-left p-4">Faktor</th>
                <th>Status</th>
                <th>Skor</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, i) => (
                <tr key={i} className="border-t text-center">
                  <td className="text-left p-4 font-medium">
                    {item.name}
                  </td>
                  <td>{getStatus(item.score)}</td>
                  <td className="font-semibold text-blue-900">
                    {item.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* BUTTON */}
        <div className="flex justify-end gap-4 mt-8">

          {/* 🔥 BATAL (POPUP) */}
          <button
            onClick={() => setShowConfirm(true)}
            className="px-6 py-3 border rounded-lg text-red-500"
          >
            Batal
          </button>

          <button
       onClick={() => {
  const payload = {
    factors: data,
    total: total,
  };

  // 🔥 simpan ke localStorage
  localStorage.setItem("hasilAnalisis", JSON.stringify(payload));

  navigate("/perbandingan", {
    state: payload,
  });
}}
            className="px-6 py-3 bg-blue-900 text-white rounded-lg"
          >
            Simpan Data
          </button>

        </div>

      </div>

      {/* ================= POPUP ================= */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-white w-[420px] rounded-xl p-8 text-center shadow-xl">

            {/* ICON */}
            <div className="w-16 h-16 bg-yellow-100 mx-auto rounded-xl flex items-center justify-center relative">
              <span className="text-2xl">⚠️</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                !
              </span>
            </div>

            <h2 className="text-xl font-semibold text-blue-900 mt-6">
              Konfirmasi Pembatalan
            </h2>

            <p className="text-gray-500 mt-3 text-sm">
              Apakah Anda yakin ingin membatalkan? Data yang sudah diisi akan hilang permanen.
            </p>

            <div className="mt-6 space-y-3">

              {/* YA */}
              <button
                onClick={() => {
                  setShowConfirm(false);
                  navigate("/asesmen");
                }}
                className="w-full bg-red-600 text-white py-3 rounded-lg"
              >
                Ya, batal
              </button>

              {/* TIDAK */}
              <button
                onClick={() => setShowConfirm(false)}
                className="w-full border py-3 rounded-lg text-gray-600"
              >
                Tidak
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}