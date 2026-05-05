import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { User, Briefcase, Calendar, Users } from "lucide-react";

export default function Profil() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    localStorage.setItem("profileComplete", "true");
    navigate("/profil-selesai");
  };

  return (
    <div className="bg-[#f4f7fb] min-h-screen flex flex-col">
      <Navbar active="profileSelesai" />

      <div className="px-16 py-10 flex-1">

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-blue-900">
          Lengkapi Profil Usaha
        </h1>

        <p className="text-gray-500 mt-2">
          Informasi ini akan membantu kami menyesuaikan analisis kesehatan usaha Anda.
        </p>

        {/* CARD */}
        <div className="bg-white rounded-xl border mt-8 shadow-sm">

          {/* HEADER */}
          <div className="flex items-center gap-4 p-6 border-b">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Briefcase className="text-blue-900" size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-blue-900">
                Detail Identitas Usaha
              </h2>
              <p className="text-sm text-gray-500">
                Pastikan data yang dimasukkan adalah data terbaru.
              </p>
            </div>
          </div>

          {/* FORM */}
          <div className="p-6 grid grid-cols-2 gap-6">

            <div>
              <label className="text-sm font-medium">Nama Usaha</label>
              <div className="flex items-center border rounded-lg px-3 mt-1 bg-gray-50">
                <User size={16} className="text-gray-400" />
                <input className="w-full p-2 ml-2 outline-none bg-transparent" placeholder="Toko Anda" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Jenis Usaha</label>
              <input className="w-full p-2 mt-1 border rounded-lg bg-gray-50" placeholder="Retail / Jasa / dll" />
            </div>

            <div>
              <label className="text-sm font-medium">Lama Usaha (Tahun)</label>
              <div className="flex items-center border rounded-lg px-3 mt-1 bg-gray-50">
                <Calendar size={16} className="text-gray-400" />
                <input className="w-full p-2 ml-2 outline-none bg-transparent" placeholder="5" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Usia Pemilik</label>
              <div className="flex items-center border rounded-lg px-3 mt-1 bg-gray-50">
                <Users size={16} className="text-gray-400" />
                <input className="w-full p-2 ml-2 outline-none bg-transparent" placeholder="30" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Posisi</label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2">
                  <input type="radio" name="posisi" defaultChecked />
                  Pemilik
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="posisi" />
                  Karyawan
                </label>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Jenis Kelamin</label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2">
                  <input type="radio" name="jk" defaultChecked />
                  Perempuan
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="jk" />
                  Laki-laki
                </label>
              </div>
            </div>

          </div>

          {/* FOOTER */}
          <div className="flex justify-between items-center border-t p-6">

            <p className="text-xs text-gray-400">
              🔒 Data Anda tersimpan dengan aman sesuai kebijakan privasi.
            </p>

            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/beranda")}
                className="text-gray-500 hover:text-gray-700"
              >
                Batal
              </button>

              <button
                onClick={handleSubmit}
                className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition"
              >
                Simpan & Lanjut
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}