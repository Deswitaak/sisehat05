import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NavbarDashboard from "../components/NavbarDashboard";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function Perbandingan() {
  const location = useLocation();
  const navigate = useNavigate();

  // 🔥 ambil data (state + localStorage)
  const saved = JSON.parse(localStorage.getItem("hasilAnalisis"));

  const factors = location.state?.factors || saved?.factors || [];
  const total = location.state?.total || saved?.total || 0;
  const compareData = location.state?.compareData || [];

  // 🔥 redirect kalau kosong
  useEffect(() => {
    if (!factors.length) {
      navigate("/asesmen");
    }
  }, [factors, navigate]);

  // 🔥 data industri dummy
  const industri = factors.map((f) => ({
    ...f,
    avg: Math.max(60, f.score - 10),
  }));

  // 🔥 chart
  const chartData = {
    labels: factors.map((f) => f.name),
    datasets: [
      {
        label: "Hasil Anda",
        data: factors.map((f) => f.score),
        backgroundColor: "rgba(59,130,246,0.2)",
        borderColor: "#163456",
      },
      {
        label: "Rata-rata Industri",
        data: industri.map((f) => f.avg),
        borderColor: "#9ca3af",
        borderDash: [5, 5],
      },
    ],
  };

  const options = {
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: { stepSize: 20 },
      },
    },
  };

  return (
    <div className="bg-[#f4f7fb] min-h-screen">
      <NavbarDashboard />

      <div className="px-16 py-10">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-blue-900">
          Perbandingan Asesmen Bisnis
        </h1>
        <p className="text-gray-500 mt-2">
          Analisis performa bisnis Anda dibandingkan dengan standar industri
        </p>

        {/* TOP FILTER */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-xs text-gray-400 mb-2">Pilih Asesmen</p>
            <select className="w-full border p-2 rounded-lg">
              <option>Asesmen Terakhir</option>
            </select>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-xs text-gray-400 mb-2">Bandingkan Industri</p>
            <select className="w-full border p-2 rounded-lg">
              <option>UMKM Nasional</option>
            </select>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-3 gap-6 mt-8">

          {/* CHART */}
          <div className="col-span-2 bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-blue-900 mb-4">
              Visualisasi 6 Faktor Strategis
            </h3>
            <Radar data={chartData} options={options} />
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-6">

            {/* INSIGHT */}
            <div className="bg-blue-900 text-white p-6 rounded-xl">
              <h3 className="font-semibold mb-2">Wawasan Perbandingan</h3>
              <p className="text-sm">
                Performa bisnis Anda cukup baik, beberapa faktor masih bisa ditingkatkan.
              </p>
            </div>

            {/* SCORE */}
            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-sm text-gray-400">Skor Anda</p>
              <h2 className="text-2xl font-bold text-blue-900">
                {total}/100
              </h2>
            </div>

          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white mt-8 rounded-xl shadow overflow-hidden">

          <div className="px-6 py-4 border-b flex justify-between">
            <h3 className="font-semibold text-blue-900">
              Rincian Perbandingan Per Faktor
            </h3>
          </div>

          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-400 text-xs">
              <tr>
                <th className="p-4 text-left">Faktor</th>
                <th>Hasil Anda</th>
                <th>Industri</th>
                <th>Delta</th>
              </tr>
            </thead>

            <tbody>
              {factors.map((item, i) => {
                const avg = industri[i].avg;
                const delta = item.score - avg;

                return (
                  <tr key={i} className="border-t text-center">
                    <td className="text-left p-4">{item.name}</td>
                    <td>{item.score}</td>
                    <td>{avg}</td>
                    <td
                      className={
                        delta >= 0
                          ? "text-green-600 font-semibold"
                          : "text-red-500 font-semibold"
                      }
                    >
                      {delta >= 0 ? "+" : ""}
                      {delta}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* BUTTON */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() =>
              navigate("/rekomendasi", {
                state: { factors, total },
              })
            }
            className="bg-blue-900 text-white px-6 py-3 rounded-lg shadow"
          >
            Lihat Rekomendasi Perbaikan
          </button>
        </div>

      </div>
    </div>
  );
}