import { useState, useEffect } from "react";
import NavbarDashboard from "../components/NavbarDashboard";
import { useNavigate } from "react-router-dom";


import {
  Radar,
  Bar
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function Beranda() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // 🔥 DATA DASHBOARD (SAMA HTML LU)
  const data = {
    factors: [
      { code: "IR", value: 1.79 },
      { code: "LI", value: 2.95 },
      { code: "QW", value: 3.31 },
      { code: "OV", value: 3.49 },
      { code: "OS", value: 2.39 },
      { code: "EP", value: 1.81 },
    ],
    distribution: [2525, 4993, 2968, 4494],
    rankingTop: [
      { id: 15, total: 3.85 },
      { id: 57, total: 3.82 },
      { id: 48, total: 3.72 },
    ],
    rankingBottom: [
      { id: 94, total: 1.56 },
      { id: 196, total: 1.68 },
      { id: 240, total: 1.69 },
    ],
  };

  const values = data.factors.map((f) => f.value);

  const total = values.reduce((a, b) => a + b, 0);
  const avg = total / values.length;
  const score = ((total * 100) / 30).toFixed(1);

  const min = Math.min(...values);
  const max = Math.max(...values);

  const variance =
    values.reduce((sum, v) => sum + Math.pow(v - avg, 2), 0) / values.length;
  const std = Math.sqrt(variance).toFixed(2);

  const highest = data.factors.find((f) => f.value === max);
  const lowest = data.factors.find((f) => f.value === min);

  // 🔥 STATUS
  const getStatus = (v) => {
    if (v >= 3.25) return ["Optimal", "bg-green-100 text-green-700"];
    if (v >= 2.25) return ["Stabil", "bg-blue-100 text-blue-700"];
    return ["Perlu Perhatian", "bg-red-100 text-red-600"];
  };

  // 🔥 RADAR
  const radarData = {
    labels: data.factors.map((f) => f.code),
    datasets: [
      {
        data: values,
        backgroundColor: "rgba(59,130,246,0.2)",
        borderColor: "#163456",
        pointBackgroundColor: "#163456",
      },
    ],
  };

  // 🔥 BAR
  const barData = {
    labels: ["1-2", "2-3", "3-4", "4-5"],
    datasets: [
      {
        data: data.distribution,
        backgroundColor: "#163456",
      },
    ],
  };

  // 🔥 BUTTON
  useEffect(() => {
  localStorage.removeItem("profileComplete");
}, []);
 const handleStart = () => {
  console.log("CLICK START");

  const isComplete = localStorage.getItem("profileComplete");

  console.log("STATUS:", isComplete);

  if (isComplete === "true") {
    navigate("/asesmen"); // ✅ bukan profile
  } else {
    setShowModal(true);
  }
};
  return (
    <div className="bg-[#f4f7fb] min-h-screen">

      <NavbarDashboard />
      

      {/* ================= MODAL ================= */}
      {showModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
    <div className="bg-white rounded-xl w-[420px] p-8 text-center shadow-xl">

      <h2 className="text-lg font-semibold text-blue-900">
        Profil UMKM Belum Lengkap
      </h2>

      <p className="text-gray-500 mt-3 text-sm">
        Harap lengkapi profil sebelum memulai asesmen.
      </p>

      <button
        onClick={() => navigate("/profile")}
        className="w-full mt-6 bg-blue-900 text-white py-3 rounded-lg"
      >
        Lengkapi Profil →
      </button>

      <button
        onClick={() => setShowModal(false)}
        className="text-gray-400 mt-4 text-sm"
      >
        Nanti Saja
      </button>

    </div>
  </div>
)}

      {/* ================= CONTENT ================= */}
      <div className="px-16 py-10">

        <h1 className="text-3xl font-bold text-blue-900">
          Selamat Datang, Budi Santoso
        </h1>
            <p className="text-sm text-gray-400">
  Data Analisis Kesehatan UMKM di Jakarta dan Jawa Barat
</p>

        {/* GRID */}
        <div className="grid grid-cols-3 gap-6 mt-6">

          {/* RADAR */}
          <div className="col-span-2 bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-4">
              Radar Chart 6 Faktor Strategis
            </h3>
            <Radar data={radarData} />
          </div>

          {/* SIDE */}
          <div className="flex flex-col gap-4">

            {/* SCORE */}
            <div className="bg-[#163456] text-white p-6 rounded-xl">
              <p>Skor Keseluruhan</p>
              <h2 className="text-4xl font-bold">{score}/100</h2>
              <p className="text-green-300 text-sm mt-2">
                +4.2% dari sebelumnya
              </p>
            </div>

            {/* INSIGHT */}
            <div className="bg-white p-5 rounded-xl shadow text-sm">
              Faktor tertinggi <b>{highest.code}</b> ({max.toFixed(2)}),
              terendah <b>{lowest.code}</b> ({min.toFixed(2)})
            </div>

            {/* STAT */}
            <div className="bg-white p-5 rounded-xl shadow text-sm space-y-1">
              <p>Mean: {avg.toFixed(2)}</p>
              <p>Min: {min.toFixed(2)}</p>
              <p>Max: {max.toFixed(2)}</p>
              <p>Std Dev: {std}</p>
            </div>

          </div>
        </div>

        {/* SMALL BOX */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-4 rounded-xl text-center shadow">
            <p className="text-gray-400 text-sm">Rata-rata</p>
            <p className="text-xl font-bold">{avg.toFixed(2)}</p>
          </div>

          <div className="bg-white p-4 rounded-xl text-center shadow">
            <p className="text-gray-400 text-sm">Tertinggi</p>
            <p className="text-xl font-bold">{highest.code}</p>
          </div>

          <div className="bg-white p-4 rounded-xl text-center shadow">
            <p className="text-gray-400 text-sm">Terendah</p>
            <p className="text-xl font-bold">{lowest.code}</p>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white mt-6 rounded-xl shadow p-6">
          <h3 className="font-semibold mb-4">Rincian Faktor</h3>

          <table className="w-full text-sm">
            <thead className="border-b text-gray-400">
              <tr>
                <th>Faktor</th>
                <th>Status</th>
                <th>Skor</th>
              </tr>
            </thead>

            <tbody>
              {data.factors.map((f, i) => {
                const s = getStatus(f.value);
                return (
                  <tr key={i} className="border-b text-center">
                    <td className="text-left py-3">{f.code}</td>
                    <td>
                      <span className={`px-2 py-1 rounded ${s[1]}`}>
                        {s[0]}
                      </span>
                    </td>
                    <td>{(f.value * 20).toFixed(1)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* BOTTOM */}
        <div className="grid grid-cols-2 gap-6 mt-6">

          {/* BAR */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-4">Distribusi Nilai</h3>
            <Bar data={barData} />
          </div>

          {/* RANK */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-2">Top 3</h3>

            {data.rankingTop.map((r, i) => (
              <div key={i} className="flex justify-between py-2 border-b">
                <span>🥇 ID {r.id}</span>
                <b>{r.total}</b>
              </div>
            ))}

            <h3 className="font-semibold mt-4 mb-2">Bottom 3</h3>

            {data.rankingBottom.map((r, i) => (
              <div key={i} className="flex justify-between py-2 border-b">
                <span>⚠️ ID {r.id}</span>
                <b>{r.total}</b>
              </div>
            ))}
          </div>

        </div>

        {/* BUTTON */}
        <div className="text-center mt-10">
          <button
            onClick={handleStart}
            className="bg-blue-900 text-white px-6 py-3 rounded-lg"
          >
            Mulai Asesmen Baru
          </button>
        </div>

      </div>
    </div>
  );
}