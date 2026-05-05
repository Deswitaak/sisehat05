import { useEffect } from "react";

export default function LogoutModal({ open, onClose, onConfirm }) {
  if (!open) return null;

  // 🔥 disable scroll saat modal buka
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* OVERLAY */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
      />

      {/* MODAL */}
      <div className="relative bg-white w-[400px] rounded-2xl shadow-xl p-6 text-center">

        {/* ICON */}
        <div className="w-16 h-16 bg-red-100 text-red-500 flex items-center justify-center rounded-xl mx-auto mb-4 text-2xl">
          🚪
        </div>

        {/* TITLE */}
        <h2 className="text-lg font-semibold text-gray-800">
          Yakin ingin keluar?
        </h2>

        {/* DESC */}
        <p className="text-sm text-gray-500 mt-2">
          Anda akan keluar dari sesi akun SiSehat Anda.
          Pastikan semua data analisis Anda telah tersimpan.
        </p>

        {/* BUTTON */}
        <div className="flex gap-4 mt-6">

          <button
            onClick={onClose}
            className="flex-1 border rounded-lg py-2 text-gray-700 hover:bg-gray-100"
          >
            Batal
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 text-white rounded-lg py-2 hover:bg-red-600"
          >
            Ya
          </button>

        </div>

      </div>
    </div>
  );
}