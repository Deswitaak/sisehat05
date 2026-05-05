import { useLocation, useNavigate } from "react-router-dom";
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

export default function DetailUMKM() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;

  // ❌ fallback kalau user refresh
  if (!data) {
    return (
      <div className="p-10">
        <p>Data UMKM tidak ditemukan</p>
        <button
          onClick={() => navigate("/eksplorasi")}
          className="mt-4 bg-blue-900 text-white px-4 py-2 rounded"
        >
          Kembali ke Eksplorasi
        </button>
      </div>
    );
  }

  // 🔥 dummy faktor (bisa nanti dari backend)
  const factors = [
    { name: "Organization Values", score: 85 },
    { name: "Leader Involvement", score: 80 },
    { name: "Institutional Resources", score: 55 },
    { name: "Economics Performance", score: 72 },
    { name: "Operational Stability", score: 90 },
    { name: "Work Environment", score: 68 },
  ];

  // 🔥 cari terbaik & terlemah
  const strongest = factors.reduce((a, b) =>
    a.score > b.score ? a : b
  );

  const weakest = factors.reduce((a, b) =>
    a.score < b.score ? a : b
  );

  // 🔥 chart
  const chartData = {
    labels: factors.map((f) => f.name),
    datasets: [
      {
        label: data.nama,
        data: factors.map((f) => f.score),
        backgroundColor: "rgba(59,130,246,0.2)",
        borderColor: "#163456",
      },
    ],
  };

  const avgScore = Math.round(
    factors.reduce((acc, f) => acc + f.score, 0) / factors.length
  );

  return (
    <div className="bg-[#f4f7fb] min-h-screen">
      <NavbarDashboard />

      <div className="px-16 py-10">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-blue-900">
          Analisis Maturitas Bisnis
        </h1>
        <p className="text-gray-500 mt-2">
          Detail profil kesehatan organisasi berdasarkan 6 parameter strategis
        </p>

        {/* GRID */}
        <div className="grid grid-cols-3 gap-6 mt-8">

          {/* LEFT PROFILE */}
          <div className="bg-white p-6 rounded-xl shadow">

            <div className="text-center">
              <div className="w-20 h-20 bg-gray-200 rounded-xl mx-auto mb-3"></div>
              <h2 className="font-semibold text-lg">{data.nama}</h2>

              <span className="text-xs bg-blue-100 px-2 py-1 rounded">
                Verified Merchant
              </span>
            </div>

            <div className="mt-6 space-y-2 text-sm">
              <p><b>Jenis Usaha:</b> {data.jenis}</p>
              <p><b>Provinsi:</b> {data.provinsi}</p>
              <p><b>Lama Usaha:</b> 4 Tahun</p>
              <p><b>Skala:</b> Mikro</p>
            </div>

            {/* 🔥 BUTTON COMPARE */}
            <button
              onClick={() =>
                navigate("/perbandingan", {
                  state: { compareData: [data] },
                })
              }
              className="mt-6 w-full bg-blue-900 text-white py-3 rounded-lg"
            >
              Bandingkan dengan Saya
            </button>

          </div>

          {/* RIGHT CHART */}
          <div className="col-span-2 bg-white p-6 rounded-xl shadow">

            <h3 className="font-semibold text-blue-900 mb-4">
              Profil 6 Faktor Organisasi
            </h3>

            <Radar data={chartData} />

            {/* INSIGHT */}
            <div className="grid grid-cols-3 gap-4 mt-6 text-sm">

              <div className="bg-gray-100 p-3 rounded">
                <p className="text-xs text-gray-400">Kekuatan Utama</p>
                <p className="font-semibold">{strongest.name}</p>
              </div>

              <div className="bg-gray-100 p-3 rounded">
                <p className="text-xs text-gray-400">Area Pengembangan</p>
                <p className="font-semibold">{weakest.name}</p>
              </div>

              <div className="bg-gray-100 p-3 rounded">
                <p className="text-xs text-gray-400">Status</p>
                <p className="font-semibold">
                  {avgScore >= 80 ? "Kuat" : avgScore >= 65 ? "Stabil" : "Risiko"}
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* BOTTOM */}
        <div className="grid grid-cols-3 gap-6 mt-8">

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-2">Tren Pertumbuhan</h3>
            <div className="h-24 bg-gray-100 rounded"></div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-2">Skor Rata-rata</h3>
            <p className="text-3xl font-bold text-blue-900">{avgScore}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-2">Sertifikasi</h3>
            <ul className="text-sm list-disc ml-4">
              <li>Halal Indonesia</li>
              <li>P-IRT Dinas Kesehatan</li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}