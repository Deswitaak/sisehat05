import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import LogoutModal from "./LogoutModal";

export default function NavbarDashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const dropdownRef = useRef();

  const menu = [
    { name: "Beranda", path: "/beranda" },
    { name: "Asesmen", path: "/asesmen" },
    { name: "Perbandingan", path: "/perbandingan" },
    { name: "Rekomendasi", path: "/rekomendasi" },
    { name: "Eksplorasi", path: "/eksplorasi" },
  ];

  // close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="flex justify-between items-center px-12 py-5 bg-white shadow-sm relative">

        {/* LOGO */}
        <h1 className="font-bold text-lg text-blue-900">SiSehat</h1>

        {/* MENU */}
        <div className="flex gap-8 text-sm">
          {menu.map((item) => {
            const isActive = location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`${
                  isActive
                    ? "text-blue-900 font-semibold"
                    : "text-gray-500 hover:text-blue-900"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4 relative" ref={dropdownRef}>

          {/* ⚙️ */}
          <button
            onClick={() => setOpen(!open)}
            className="text-xl hover:scale-110 transition"
          >
            ⚙️
          </button>

          {/* USER */}
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
            <span className="text-sm">Budi Santoso</span>
            <img
              src="https://i.pravatar.cc/40"
              className="w-8 h-8 rounded-full"
            />
          </div>

          {/* DROPDOWN */}
          {open && (
            <div className="absolute right-0 top-14 w-64 bg-white rounded-2xl shadow-xl border p-4 z-50">

              <div className="mb-3">
                <p className="text-xs text-gray-400">AKUN SAYA</p>
                <p className="text-sm text-gray-700">
                  budi.santoso@email.com
                </p>
              </div>

              <div className="border-t mb-2"></div>

              {/* MENU */}
              <div className="flex flex-col">

                <button
                  onClick={() => navigate("/profil")}
                  className="px-3 py-2 rounded-lg hover:bg-gray-100 text-left"
                >
                  👤 Edit Profil
                </button>

                <button
                  onClick={() => navigate("/settings")}
                  className="px-3 py-2 rounded-lg hover:bg-gray-100 text-left"
                >
                  ⚙️ Settings
                </button>

                {/* 🔥 LOGOUT */}
                <button
                  onClick={() => {
                    setShowLogout(true);
                    setOpen(false);
                  }}
                  className="px-3 py-2 rounded-lg hover:bg-red-50 text-left text-red-500"
                >
                  🚪 Keluar
                </button>

              </div>
            </div>
          )}
        </div>
      </nav>

      {/* 🔥 MODAL LOGOUT */}
      <LogoutModal
        open={showLogout}
        onClose={() => setShowLogout(false)}
        onConfirm={() => {
          localStorage.clear();
          navigate("/");
        }}
      />
    </>
  );
}