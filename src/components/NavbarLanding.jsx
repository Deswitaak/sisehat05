import { Link } from "react-router-dom";

export default function NavbarLanding() {
  return (
    <nav className="flex justify-between items-center px-12 py-5 bg-white shadow-sm">
      
      <h1 className="font-bold text-lg text-blue-900">SiSehat</h1>

      <div className="flex gap-8 text-sm text-gray-500">
        <span>Beranda</span>
        <span>Asesmen</span>
        <span>Perbandingan</span>
        <span>Rekomendasi</span>
        <span>Eksplorasi</span>
      </div>

      <div className="flex gap-4 items-center">
        <Link to="/login" className="text-gray-600">
          Masuk
        </Link>

        <Link
          to="/registrasi"
          className="bg-blue-900 text-white px-4 py-2 rounded-lg"
        >
          Daftar
        </Link>
      </div>

    </nav>
  );
}