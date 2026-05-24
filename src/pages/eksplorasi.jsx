import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarDashboard from "../components/NavbarDashboard";
import rawData from "../data/raw_data.json";

export default function Eksplorasi() {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  // 🔥 FORMAT DATA ASLI
  const data = rawData.map((item) => ({

    id: item.ID,

    nama: `UMKM ${item.ID}`,

    jenis:
      item.TOTAL >= 110
        ? "Sangat Sehat"
        : item.TOTAL >= 90
        ? "Sehat"
        : "Perlu Perhatian",

    skor: item.TOTAL,

    ov:
      (
        item.OH1 +
        item.OH2 +
        item.OH3 +
        item.OH4 +
        item.OH5
      ) / 5,

    li:
      (
        item.OH6 +
        item.OH7 +
        item.OH8 +
        item.OH9 +
        item.OH10
      ) / 5,

    ir:
      (
        item.OH11 +
        item.OH12 +
        item.OH13 +
        item.OH14 +
        item.OH15
      ) / 5,

    os:
      (
        item.OH16 +
        item.OH17 +
        item.OH18 +
        item.OH19 +
        item.OH20
      ) / 5,

    qw:
      (
        item.OH21 +
        item.OH22 +
        item.OH23 +
        item.OH24 +
        item.OH25
      ) / 5,

    ep:
      (
        item.OH26 +
        item.OH27 +
        item.OH28 +
        item.OH29 +
        item.OH30
      ) / 5,
  }));

  // 🔥 FILTER
  const filtered = data.filter((item) =>
    item.nama
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#f4f7fb] min-h-screen">

      <NavbarDashboard />

      <div className="px-4 md:px-8 lg:px-16 py-6 md:py-10">

        {/* TITLE */}
        <h1 className="text-2xl md:text-3xl font-bold text-blue-900">
          Eksplorasi Data UMKM
        </h1>

        <p className="text-gray-500 mt-2">
          Analisis kesehatan organisasi
          berdasarkan data 428 responden.
        </p>

        {/* SEARCH */}
        <div className="mt-8">

          <input
            type="text"
            placeholder="Cari UMKM..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full p-4 rounded-xl border outline-none"
          />

        </div>

        {/* GRID */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mt-8">

  {/* HEADER */}
  <div className="grid grid-cols-6 bg-blue-900 text-white text-sm font-semibold px-6 py-4">

    <div>ID</div>
    <div>Nama UMKM</div>
    <div>Status</div>
    <div>Score</div>
    <div>Faktor Tertinggi</div>
    <div className="text-center">Aksi</div>

  </div>

  {/* DATA */}
  {filtered.map((item, index) => {

    const highest = Math.max(
      item.ov,
      item.li,
      item.ir,
      item.os,
      item.qw,
      item.ep
    );

    return (

      <div
        key={item.id}
        className="grid grid-cols-6 px-6 py-5 border-b items-center text-sm hover:bg-gray-50 transition"
      >

        <div className="font-semibold">
          #{item.id}
        </div>

        <div>

          <p className="font-semibold text-blue-900">
            {item.nama}
          </p>

          <p className="text-xs text-gray-400 mt-1">
            Data responden UMKM
          </p>

        </div>

        <div>

          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            item.skor >= 110
              ? "bg-green-100 text-green-700"
              : item.skor >= 90
              ? "bg-blue-100 text-blue-700"
              : "bg-red-100 text-red-600"
          }`}>

            {item.jenis}

          </span>

        </div>

        <div className="font-bold text-blue-900">
          {item.skor}
        </div>

        <div>

          {highest === item.ov && "OV"}
          {highest === item.li && "LI"}
          {highest === item.ir && "IR"}
          {highest === item.os && "OS"}
          {highest === item.qw && "QW"}
          {highest === item.ep && "EP"}

        </div>

        <div className="flex gap-3 justify-center">

          <button
            onClick={() =>
              navigate("/detailumkm", {
                state: item,
              })
            }
            className="bg-blue-900 text-white px-4 py-2 rounded-lg text-xs"
          >
            Detail
          </button>

          <button
            onClick={() =>
              navigate("/perbandingan", {
                state: item,
              })
            }
            className="border border-blue-900 text-blue-900 px-4 py-2 rounded-lg text-xs"
          >
            Bandingkan
          </button>

        </div>

      </div>
    );
  })}

</div>

      </div>

    </div>
  );
}