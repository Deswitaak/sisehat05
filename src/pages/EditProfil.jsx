import { useNavigate } from "react-router-dom";

export default function EditProfil() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    localStorage.setItem("profileComplete", "true");
    navigate("/beranda");
  };

  return (
    <div className="bg-[#f4f7fb] min-h-screen px-16 py-10">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-blue-900">
        Edit Profil
      </h1>

      <p className="text-gray-500 mt-2">
        Kelola informasi akun dan profil usaha Anda di ekosistem SiSehat.
      </p>

      {/* CARD */}
      <div className="bg-white rounded-xl border shadow-sm mt-8 p-8">

        {/* FORM */}
        <div className="grid grid-cols-2 gap-6">

          {/* NAMA */}
          <div>
            <label className="text-sm font-medium">Nama Usaha</label>
            <input
              className="w-full mt-1 p-3 border rounded-lg bg-gray-50"
              defaultValue="Toko Doa Ibu"
            />
          </div>

          {/* JENIS */}
          <div>
            <label className="text-sm font-medium">Jenis Usaha</label>
            <input
              className="w-full mt-1 p-3 border rounded-lg bg-gray-50"
              defaultValue="Perdagangan / Retail"
            />
          </div>

          {/* LAMA */}
          <div>
            <label className="text-sm font-medium">Lama Usaha (Tahun)</label>
            <input
              className="w-full mt-1 p-3 border rounded-lg bg-gray-50"
              placeholder="Contoh: 5"
            />
          </div>

          {/* USIA */}
          <div>
            <label className="text-sm font-medium">Usia Pemilik</label>
            <input
              className="w-full mt-1 p-3 border rounded-lg bg-gray-50"
              placeholder="Contoh: 34"
            />
          </div>

          {/* POSISI */}
          <div>
            <label className="text-sm font-medium">Posisi</label>
            <div className="flex gap-6 mt-2">
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

          {/* JK */}
          <div>
            <label className="text-sm font-medium">Jenis Kelamin</label>
            <div className="flex gap-6 mt-2">
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
        <div className="flex justify-between items-center mt-8 pt-6 border-t">

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
              className="bg-blue-900 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-800 transition"
            >
              Simpan & Lanjut →
            </button>
          </div>

        </div>
      </div>

      {/* FOOT NOTE */}
      <div className="flex justify-center gap-6 mt-6 text-sm text-gray-400">
        <span>🔐 Data Terenkripsi</span>
        <span>⏱ Riwayat Perubahan</span>
      </div>

    </div>
  );
}