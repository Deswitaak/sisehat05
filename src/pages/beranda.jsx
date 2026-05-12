import { useState } from "react";
import NavbarDashboard from "../components/NavbarDashboard";
import { useNavigate } from "react-router-dom";

import rawData from "../data/raw_data.json";

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
  const profileData = JSON.parse(
  localStorage.getItem("profileData")
);

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // 🔥 TOTAL RESPONDEN
  const totalUMKM = rawData.length;

  // 🔥 HITUNG RATA-RATA
  const average = (keys) => {
    let total = 0;

    rawData.forEach((item) => {
      keys.forEach((key) => {
        total += Number(item[key]);
      });
    });

    return (
      total /
      (rawData.length * keys.length)
    ).toFixed(2);
  };

  // 🔥 DATA DASHBOARD DARI JSON ASLI
  const data = {
    factors: [
      {
        code: "OV",
        value: Number(
          average([
            "OH1",
            "OH2",
            "OH3",
            "OH4",
            "OH5",
            "OH6",
            "OH7",
            "OH8",
            "OH9",
          ])
        ),
      },

      {
        code: "LI",
        value: Number(
          average([
            "OH10",
            "OH11",
            "OH12",
            "OH13",
            "OH14",
            "OH15",
          ])
        ),
      },

      {
        code: "IR",
        value: Number(
          average([
            "OH16",
            "OH17",
            "OH18",
            "OH19",
            "OH20",
            "OH21",
          ])
        ),
      },

      {
        code: "OS",
        value: Number(
          average([
            "OH22",
            "OH23",
            "OH24",
            "OH25",
            "OH26",
          ])
        ),
      },

      {
        code: "QW",
        value: Number(
          average([
            "OH27",
            "OH28",
            "OH29",
            "OH30",
            "OH31",
          ])
        ),
      },

      {
        code: "EP",
        value: Number(
          average([
            "OH32",
            "OH33",
            "OH34",
            "OH35",
          ])
        ),
      },
    ],

    // 🔥 DISTRIBUSI SEMENTARA
    distribution: [25, 49, 29, 44],

    // 🔥 TOP 3
rankingTop: [...rawData]
  .sort((a, b) => b.TOTAL - a.TOTAL)
  .slice(0, 3),

// 🔥 BOTTOM 3
rankingBottom: [...rawData]
  .sort((a, b) => a.TOTAL - b.TOTAL)
  .slice(0, 3),
  };

  // 🔥 VALUES
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
        borderWidth: 2,
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
const handleStart = () => {

  const isComplete =
    localStorage.getItem("profileComplete");

  console.log(
    "PROFILE COMPLETE:",
    isComplete
  );

  if (isComplete === "true") {

    navigate("/asesmen");

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
      <div className="px-4 md:px-8 lg:px-16 py-6 md:py-10">

        {/* HEADER */}
        <h1 className="text-2xl md:text-3xl font-bold">
  Halo, {profileData?.nama || "Pengguna"}
</h1>

        <p className="text-sm text-gray-400 mt-1">
          Dataset {totalUMKM} Responden UMKM di Jakarta dan Jawa Barat
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

              <h2 className="text-4xl font-bold">
                {score}/100
              </h2>

              <p className="text-green-300 text-sm mt-2">
                +4.2% dari sebelumnya
              </p>

            </div>

            {/* INSIGHT */}
            <div className="bg-white p-5 rounded-xl shadow text-sm">

              Faktor tertinggi{" "}
              <b>{highest.code}</b>{" "}
              ({max.toFixed(2)}),
              terendah{" "}
              <b>{lowest.code}</b>{" "}
              ({min.toFixed(2)})

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
        <div className="grid grid-cols-4 gap-4 mt-6">

          <div className="bg-white p-4 rounded-xl text-center shadow">

            <p className="text-gray-400 text-sm">
              Total Responden
            </p>

            <p className="text-xl font-bold">
              {totalUMKM}
            </p>

          </div>

          <div className="bg-white p-4 rounded-xl text-center shadow">

            <p className="text-gray-400 text-sm">
              Rata-rata
            </p>

            <p className="text-xl font-bold">
              {avg.toFixed(2)}
            </p>

          </div>

          <div className="bg-white p-4 rounded-xl text-center shadow">

            <p className="text-gray-400 text-sm">
              Tertinggi
            </p>

            <p className="text-xl font-bold">
              {highest.code}
            </p>

          </div>

          <div className="bg-white p-4 rounded-xl text-center shadow">

            <p className="text-gray-400 text-sm">
              Terendah
            </p>

            <p className="text-xl font-bold">
              {lowest.code}
            </p>

          </div>

        </div>

        {/* TABLE */}
        <div className="bg-white mt-6 rounded-xl shadow p-6">

          <h3 className="font-semibold mb-4">
            Rincian Faktor
          </h3>

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
                  <tr
                    key={i}
                    className="border-b text-center"
                  >

                    <td className="text-left py-3">
                      {f.code}
                    </td>

                    <td>
                      <span
                        className={`px-2 py-1 rounded ${s[1]}`}
                      >
                        {s[0]}
                      </span>
                    </td>

                    <td>
                      {(f.value * 20).toFixed(1)}
                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>

        {/* BOTTOM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

          {/* BAR */}
          <div className="bg-white p-6 rounded-xl shadow">

            <h3 className="font-semibold mb-4">
              Distribusi Nilai
            </h3>

            <Bar data={barData} />

          </div>

          {/* RANK */}
          <div className="bg-white p-6 rounded-xl shadow">

            <h3 className="font-semibold mb-2">
              Top 3
            </h3>

            {data.rankingTop.map((r, i) => (
              <div
                key={i}
                className="flex justify-between py-2 border-b"
              >
                <span>🥇 UMKM {r.ID}</span>
                <b>{r.TOTAL}</b>
              </div>
            ))}

            <h3 className="font-semibold mt-4 mb-2">
              Bottom 3
            </h3>

            {data.rankingBottom.map((r, i) => (
              <div
                key={i}
                className="flex justify-between py-2 border-b"
              >
                <span>⚠️ UMKM {r.ID}</span>
                <b>{r.TOTAL}</b>
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