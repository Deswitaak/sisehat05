import {
  useLocation,
  useNavigate
} from "react-router-dom";

import NavbarDashboard from "../components/NavbarDashboard";

import {
  Radar
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

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

  // 🔥 FALLBACK
  if (!data) {
    return (
      <div className="bg-[#f4f7fb] min-h-screen flex items-center justify-center">

        <div className="bg-white p-10 rounded-2xl shadow text-center">

          <h1 className="text-2xl font-bold text-blue-900">
            Data UMKM Tidak Ditemukan
          </h1>

          <button
            onClick={() => navigate("/eksplorasi")}
            className="mt-6 bg-blue-900 text-white px-5 py-2 rounded-xl"
          >
            Kembali ke Eksplorasi
          </button>

        </div>

      </div>
    );
  }

  // 🔥 RADAR
  const radarData = {

    labels: [
      "OV",
      "LI",
      "IR",
      "OS",
      "QW",
      "EP",
    ],

    datasets: [
      {
        label: data.nama,

        data: [
          data.ov,
          data.li,
          data.ir,
          data.os,
          data.qw,
          data.ep,
        ],

        backgroundColor:
          "rgba(37,99,235,0.2)",

        borderColor:
          "#1d4ed8",

        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        min: 0,
        max: 5,

        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  // 🔥 STATUS
  const getStatus = (value) => {

    if (value >= 4)
      return {
        label: "Sangat Baik",
        color:
          "bg-green-100 text-green-700",
      };

    if (value >= 3)
      return {
        label: "Baik",
        color:
          "bg-blue-100 text-blue-700",
      };

    return {
      label: "Perlu Perbaikan",
      color:
        "bg-red-100 text-red-600",
    };
  };

  const faktorData = [

    {
      name: "Organizational Values",
      value: data.ov,
    },

    {
      name: "Leader Involvement",
      value: data.li,
    },

    {
      name: "Institutional Resources",
      value: data.ir,
    },

    {
      name: "Operational Stability",
      value: data.os,
    },

    {
      name: "Workplace Quality",
      value: data.qw,
    },

    {
      name: "Economic Performance",
      value: data.ep,
    },
  ];

  return (
    <div className="bg-[#f4f7fb] min-h-screen">

      <NavbarDashboard />

      <div className="px-4 md:px-8 lg:px-16 py-6 md:py-10">

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-blue-900 font-medium"
        >
          ← Kembali
        </button>

        {/* HEADER */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border">

          <div className="flex justify-between items-start">

            <div>

              <h1 className="text-2xl md:text-3xl font-bold text-blue-900">
                {data.nama}
              </h1>

              <p className="text-gray-500 mt-2">
                Detail kesehatan organisasi UMKM
                berdasarkan hasil asesmen statistik.
              </p>

            </div>

            <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
              data.skor >= 110
                ? "bg-green-100 text-green-700"
                : data.skor >= 90
                ? "bg-blue-100 text-blue-700"
                : "bg-red-100 text-red-600"
            }`}>

              {data.jenis}

            </div>

          </div>

          {/* SCORE */}
          <div className="grid grid-cols-3 gap-6 mt-8">

            <div className="bg-[#f4f7fb] p-5 rounded-xl">

              <p className="text-sm text-gray-400">
                Total Score
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mt-2">
                {data.skor}
              </h2>

            </div>

            <div className="bg-[#f4f7fb] p-5 rounded-xl">

              <p className="text-sm text-gray-400">
                Status UMKM
              </p>

              <h2 className="text-xl font-bold text-blue-900 mt-2">
                {data.jenis}
              </h2>

            </div>

            <div className="bg-[#f4f7fb] p-5 rounded-xl">

              <p className="text-sm text-gray-400">
                ID Responden
              </p>

              <h2 className="text-2xl font-bold text-blue-900 mt-2">
                #{data.id}
              </h2>

            </div>

          </div>

          {/* RADAR */}
          <div className="mt-12">

            <h2 className="text-xl font-semibold text-blue-900 mb-6">

              Visualisasi 6 Faktor Strategis

            </h2>

            <Radar
              data={radarData}
              options={options}
            />

          </div>

        </div>

        {/* CARD FAKTOR */}
        <div className="grid grid-cols-3 gap-6 mt-8">

          {faktorData.map((item, i) => (

            <div
              key={i}
              className="bg-white rounded-2xl shadow-sm border p-6"
            >

              <p className="text-sm text-gray-400">

                {item.name}

              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mt-3">

                {item.value.toFixed(1)}

              </h2>

              <div className="mt-4">

                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  getStatus(item.value).color
                }`}>

                  {getStatus(item.value).label}

                </span>

              </div>

            </div>

          ))}

        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden mt-10">

          <div className="px-6 py-5 border-b">

            <h2 className="font-semibold text-blue-900">

              Detail Analisis Faktor

            </h2>

          </div>

          <table className="w-full text-sm">

            <thead className="bg-gray-50 text-gray-500">

              <tr>

                <th className="p-4 text-left">
                  Faktor
                </th>

                <th>
                  Nilai
                </th>

                <th>
                  Status
                </th>

                <th>
                  Insight
                </th>

              </tr>

            </thead>

            <tbody>

              {faktorData.map((item, i) => {

                const status =
                  getStatus(item.value);

                return (

                  <tr
                    key={i}
                    className="border-t text-center"
                  >

                    <td className="p-4 text-left">

                      {item.name}

                    </td>

                    <td className="font-semibold">

                      {item.value.toFixed(1)}

                    </td>

                    <td>

                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}>

                        {status.label}

                      </span>

                    </td>

                    <td className="text-gray-500">

                      {item.value >= 4
                        ? "Performa sangat optimal"
                        : item.value >= 3
                        ? "Performa cukup baik"
                        : "Membutuhkan peningkatan"}

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}