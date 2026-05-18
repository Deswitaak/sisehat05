import { useLocation, useNavigate } from "react-router-dom";
import NavbarDashboard from "../components/NavbarDashboard";

export default function Rekomendasi() {
  const location = useLocation();
  const navigate = useNavigate();

  // 🔥 ambil dari localStorage + state
  const saved = JSON.parse(localStorage.getItem("hasilAnalisis"));

  const factors = location.state?.factors || saved?.factors || [];
  const total = location.state?.total || saved?.total || 0;

  // ✅ FIX: return hanya jika benar-benar kosong
  if (!factors.length) {
    return (
      <div className="p-10">
        <p>Data tidak ditemukan. Silakan lakukan asesmen terlebih dahulu.</p>
        <button
          onClick={() => navigate("/asesmen")}
          className="mt-4 bg-blue-900 text-white px-4 py-2 rounded"
        >
          Ke Asesmen
        </button>
      </div>
    );
  }

  // 🔥 normalize biar aman
  const normalize = (text) => text.toLowerCase().trim();

  // 🔥 mapping rekomendasi
  const rekomendasiMap = {
    "organization values": [
      "Program Culture Hero",
      "Integrasi nilai ke KPI",
    ],
    "leader involvement": [
      "Town Hall Meeting",
      "Open Door Policy",
    ],
    "work environment": [
      "Survey kepuasan kerja",
      "Optimasi workspace",
    ],
    "institutional resources": [
      "Prioritaskan aset penting",
      "Inventarisasi rutin",
    ],
    "economics performance": [
      "Audit biaya operasional",
      "Dana darurat 3 bulan",
    ],
    "operational stability": [
      "Digitalisasi dokumen",
      "Quality control ketat",
    ],
  };

  const getStatus = (score) => {
    if (score >= 85) return "STRONG";
    if (score >= 70) return "STABLE";
    return "RISK";
  };

  return (
    <div className="bg-[#f4f7fb] min-h-screen">
      <NavbarDashboard />

      <div className="px-4 md:px-8 lg:px-16 py-6 md:py-10">

        {/* HEADER */}
        <div className="bg-white p-6 rounded-xl shadow flex justify-between">
          <div>
            <h1 className="text-2xl font-bold text-blue-900">
              Ringkasan Wawasan Bisnis
            </h1>
            <p className="text-gray-500 mt-2">
              Berikut rekomendasi berdasarkan performa Anda
            </p>
          </div>

          <div className="bg-blue-100 px-4 py-2 rounded-lg text-blue-900 font-semibold">
            Skor: {total}/100
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-3 gap-6 mt-8">

          {factors.map((item, i) => {
            const key = normalize(item.name);
            const recs = rekomendasiMap[key] || [];

            return (
              <div key={i} className="bg-white p-6 rounded-xl shadow border">

                <div className="flex justify-between mb-2">
                  <h3 className="font-semibold text-blue-900">
                    {item.name}
                  </h3>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {getStatus(item.score)}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mb-3">
                  Skor: {item.score}
                </p>

                <ul className="text-sm space-y-2 text-gray-600">
                  {recs.map((r, idx) => (
                    <li key={idx}>✔ {r}</li>
                  ))}
                </ul>

              </div>
            );
          })}

        </div>

      </div>
    </div>
  );
}