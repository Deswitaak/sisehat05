import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarDashboard from "../components/NavbarDashboard";

export default function Eksplorasi() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [jenis, setJenis] = useState("");
  const [selected, setSelected] = useState([]);

  const data = [
    {
      id: 1,
      nama: "Kopi Kenangan Rakyat",
      jenis: "Kuliner",
      provinsi: "Jawa Barat",
      skor: 85,
    },
    {
      id: 2,
      nama: "Batik Solo Jaya",
      jenis: "Manufaktur",
      provinsi: "Jawa Tengah",
      skor: 62,
    },
    {
      id: 3,
      nama: "Maju Jaya Sejahtera",
      jenis: "Agribisnis",
      provinsi: "Jawa Timur",
      skor: 92,
    },
    {
      id: 4,
      nama: "Digital Solusi Mandiri",
      jenis: "Jasa",
      provinsi: "DKI Jakarta",
      skor: 38,
    },
  ];

  const filtered = data.filter((item) => {
    return (
      item.nama.toLowerCase().includes(search.toLowerCase()) &&
      (provinsi ? item.provinsi === provinsi : true) &&
      (jenis ? item.jenis === jenis : true)
    );
  });

  const toggleSelect = (item) => {
    if (selected.find((s) => s.id === item.id)) {
      setSelected(selected.filter((s) => s.id !== item.id));
    } else {
      setSelected([...selected, item]);
    }
  };

  return (
    <div className="bg-[#f4f7fb] min-h-screen">
      <NavbarDashboard />

      <div className="px-16 py-10">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-blue-900">
          Eksplorasi UMKM
        </h1>
        <p className="text-gray-500 mt-2">
          Analisis dan eksplorasi data pelaku usaha
        </p>

        {/* FILTER */}
        <div className="bg-white p-4 rounded-xl shadow mt-6 flex gap-4">

          <input
            placeholder="Cari UMKM..."
            className="flex-1 border p-2 rounded-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border p-2 rounded-lg"
            onChange={(e) => setProvinsi(e.target.value)}
          >
            <option value="">Provinsi</option>
            <option>Jawa Barat</option>
            <option>Jawa Tengah</option>
            <option>Jawa Timur</option>
            <option>DKI Jakarta</option>
          </select>

          <select
            className="border p-2 rounded-lg"
            onChange={(e) => setJenis(e.target.value)}
          >
            <option value="">Jenis</option>
            <option>Kuliner</option>
            <option>Manufaktur</option>
            <option>Agribisnis</option>
            <option>Jasa</option>
          </select>

        </div>

        {/* TABLE */}
        <div className="bg-white mt-6 rounded-xl shadow overflow-hidden">

          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-400 text-xs">
              <tr>
                <th className="p-4 text-left">Nama UMKM</th>
                <th>Jenis</th>
                <th>Provinsi</th>
                <th>Skor</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-t text-center">

                  <td className="text-left p-4">
                    {item.nama}
                  </td>

                  <td>{item.jenis}</td>
                  <td>{item.provinsi}</td>

                  {/* SKOR */}
                  <td>
                    <span
                      className={
                        item.skor >= 80
                          ? "text-green-600"
                          : item.skor >= 60
                          ? "text-yellow-500"
                          : "text-red-500"
                      }
                    >
                      {item.skor}
                    </span>
                  </td>

                  {/* AKSI */}
                  <td className="flex justify-center gap-3">

                    {/* 🔍 LIHAT DETAIL */}
                    <button
                      onClick={() =>
                        navigate(`/umkm/${item.id}`, {
                          state: item,
                        })
                      }
                      className="text-blue-900 font-medium"
                    >
                      Lihat Detail
                    </button>

                    {/* 🔥 BANDINKAN */}
                    <button
                      onClick={() => toggleSelect(item)}
                      className="text-gray-500"
                    >
                      {selected.find((s) => s.id === item.id)
                        ? "Dipilih"
                        : "Bandingkan"}
                    </button>

                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 🔥 SELECTED BAR */}
        {selected.length > 0 && (
          <div className="mt-6 bg-blue-100 p-4 rounded-lg flex justify-between items-center">

            <p className="text-sm">
              {selected.length} UMKM dipilih
            </p>

            <button
              onClick={() =>
                navigate("/perbandingan", {
                  state: { compareData: selected },
                })
              }
              className="bg-blue-900 text-white px-4 py-2 rounded"
            >
              Bandingkan Sekarang
            </button>

          </div>
        )}

      </div>
    </div>
  );
}