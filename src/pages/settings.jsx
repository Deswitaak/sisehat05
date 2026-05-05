export default function Settings() {
  return (
    <div className="bg-[#f4f7fb] min-h-screen px-16 py-10">

      <h1 className="text-3xl font-bold text-blue-900 text-center">
        Pengaturan Akun
      </h1>

      <p className="text-center text-gray-500 mt-2">
        Kelola preferensi keamanan dan aplikasi Anda di sini.
      </p>

      <div className="grid grid-cols-2 gap-8 mt-10">

        {/* PASSWORD */}
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h2 className="font-semibold text-blue-900 mb-4">
            🔒 Ubah Kata Sandi
          </h2>

          <input
            type="password"
            placeholder="Kata sandi saat ini"
            className="w-full border p-3 rounded-lg mb-4"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="password"
              placeholder="Kata sandi baru"
              className="border p-3 rounded-lg"
            />
            <input
              type="password"
              placeholder="Konfirmasi"
              className="border p-3 rounded-lg"
            />
          </div>

          <button className="mt-6 bg-blue-900 text-white px-6 py-2 rounded-lg">
            Simpan Perubahan
          </button>
        </div>

        {/* PREFERENSI */}
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h2 className="font-semibold text-blue-900 mb-4">
            ⚙️ Preferensi
          </h2>

          <div className="flex justify-between items-center mb-4">
            <span>Notifikasi Email</span>
            <input type="checkbox" defaultChecked />
          </div>

          <div className="flex justify-between items-center mb-4">
            <span>Penyebaran Data</span>
            <input type="checkbox" />
          </div>

          <div className="flex justify-between items-center">
            <span>Mode Analitik Tinggi</span>
            <input type="checkbox" defaultChecked />
          </div>
        </div>

      </div>
    </div>
  );
}