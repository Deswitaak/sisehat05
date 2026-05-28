import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditProfil() {

  const navigate = useNavigate();

  // 🔥 AMBIL DATA
  const savedData = JSON.parse(
    localStorage.getItem("profileData")
  );

  // 🔥 FORM
  const [formData, setFormData] = useState({

    nama:
      savedData?.nama || "",

    namaUsaha:
      savedData?.namaUsaha || "",

    jenisUsaha:
      savedData?.jenisUsaha || "",

    kategori:
      savedData?.kategori || "",

    lamaUsaha:
      savedData?.lamaUsaha || "",

    usia:
      savedData?.usia || "",

    gender:
      savedData?.gender || "Perempuan",

    role:
      savedData?.role || "",

  });

  // 🔥 HANDLE INPUT
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔥 HANDLE ROLE
  const handleRole = (role) => {

    setFormData({
      ...formData,
      role,
    });
  };

  // 🔥 SIMPAN
  const handleSubmit = () => {

    localStorage.setItem(
      "profileData",
      JSON.stringify(formData)
    );

    alert("Profil berhasil diperbarui");

    // 🔥 FORCE REFRESH
    window.location.href = "/beranda";
  };

  return (
    <div className="bg-[#f4f7fb] min-h-screen px-4 md:px-8 lg:px-16 py-6 md:py-10">

      {/* HEADER */}
      <h1 className="text-2xl md:text-3xl font-bold text-blue-900">
        Edit Profil
      </h1>

      <p className="text-gray-500 mt-2">
        Kelola informasi akun dan profil usaha Anda.
      </p>

      {/* CARD */}
      <div className="bg-white rounded-2xl border shadow-sm mt-8 p-8">

        {/* FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* NAMA */}
          <div>

            <label className="text-sm font-medium">
              Nama Pengguna
            </label>

            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-xl bg-gray-50"
            />

          </div>

          {/* NAMA USAHA */}
          <div>

            <label className="text-sm font-medium">
              Nama Usaha
            </label>

            <input
              type="text"
              name="namaUsaha"
              value={formData.namaUsaha}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-xl bg-gray-50"
            />

          </div>

          {/* JENIS */}
          <div>

            <label className="text-sm font-medium">
              Jenis Usaha
            </label>

            <input
              type="text"
              name="jenisUsaha"
              value={formData.jenisUsaha}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-xl bg-gray-50"
            />

          </div>

          {/* KATEGORI */}
          <div>

            <label className="text-sm font-medium">
              Kategori Usaha
            </label>

            <select
              name="kategori"
              value={formData.kategori}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-xl bg-gray-50"
            >

              <option value="">
                Pilih Kategori
              </option>

              <option value="Kuliner">
                Kuliner
              </option>

              <option value="Fashion">
                Fashion
              </option>

              <option value="Retail">
                Retail
              </option>

              <option value="Jasa">
                Jasa
              </option>

              <option value="Teknologi">
                Teknologi
              </option>

            </select>

          </div>

          {/* LAMA */}
          <div>

            <label className="text-sm font-medium">
              Lama Usaha
            </label>

            <input
              type="number"
              name="lamaUsaha"
              value={formData.lamaUsaha}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-xl bg-gray-50"
            />

          </div>

          {/* USIA */}
          <div>

            <label className="text-sm font-medium">
              Usia
            </label>

            <input
              type="number"
              name="usia"
              value={formData.usia}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-xl bg-gray-50"
            />

          </div>

          {/* GENDER */}
          <div>

            <label className="text-sm font-medium">
              Gender
            </label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-xl bg-gray-50"
            >

              <option value="Perempuan">
                Perempuan
              </option>

              <option value="Laki-laki">
                Laki-laki
              </option>

            </select>

          </div>

          {/* ROLE */}
          <div>

            <label className="text-sm font-medium">
              Posisi
            </label>

            <div className="flex gap-4 mt-3">

              <button
                type="button"
                onClick={() =>
                  handleRole("Pemilik")
                }
                className={`px-5 py-2 rounded-xl border transition ${
                  formData.role === "Pemilik"
                    ? "bg-blue-900 text-white"
                    : "bg-white"
                }`}
              >
                Pemilik
              </button>

              <button
                type="button"
                onClick={() =>
                  handleRole("Karyawan")
                }
                className={`px-5 py-2 rounded-xl border transition ${
                  formData.role === "Karyawan"
                    ? "bg-green-600 text-white"
                    : "bg-white"
                }`}
              >
                Karyawan
              </button>

            </div>

          </div>

        </div>

        {/* FOOTER */}
        <div className="flex justify-between items-center mt-10 pt-6 border-t">

          <p className="text-xs text-gray-400">
            🔒 Data profile tersimpan aman.
          </p>

          <div className="flex gap-4">

            <button
              onClick={() =>
                navigate("/beranda")
              }
              className="text-gray-500"
            >
              Batal
            </button>

            <button
              onClick={handleSubmit}
              className="bg-blue-900 text-white px-6 py-3 rounded-xl"
            >
              Simpan Perubahan
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}