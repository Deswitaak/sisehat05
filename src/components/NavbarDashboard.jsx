import {
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";

import {
  useState,
  useRef,
  useEffect
} from "react";

import LogoutModal from "./LogoutModal";

export default function NavbarDashboard() {

  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const dropdownRef = useRef();

  // 🔥 AMBIL DATA USER
  const profileData = JSON.parse(
    localStorage.getItem("profileData")
  );

  // 🔥 FOTO PROFILE
const profilePhoto =
  localStorage.getItem("profilePhoto");

  // 🔥 USER REGISTER
  const userData = JSON.parse(
    localStorage.getItem("user")
  );

  const menu = [
    { name: "Beranda", path: "/beranda" },
    { name: "Asesmen", path: "/asesmen" },
    { name: "Perbandingan", path: "/perbandingan" },
    { name: "Rekomendasi", path: "/rekomendasi" },
    { name: "Eksplorasi", path: "/eksplorasi" },
  ];

  // 🔥 CLOSE DROPDOWN
  useEffect(() => {

    const handleClickOutside = (e) => {

      if (
        !dropdownRef.current?.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

  }, []);

  return (
    <>
      <nav className="flex justify-between items-center px-12 py-5 bg-white shadow-sm relative">

        {/* LOGO */}
        <h1 className="font-bold text-lg text-blue-900">
          SiSehat
        </h1>

        {/* MENU */}
        <div className="flex gap-4 md:gap-8 text-sm">

          {menu.map((item) => {

            const isActive =
              location.pathname.startsWith(item.path);

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
        <div
          className="flex items-center gap-4 relative"
          ref={dropdownRef}
        >

          {/* ⚙️ */}
          <button
            onClick={() => setOpen(!open)}
            className="text-xl hover:scale-110 transition"
          >
            ⚙️
          </button>

          {/* USER */}
<div
  onClick={() => navigate("/profil")}
  className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full cursor-pointer hover:bg-gray-200 transition"
>

  {/* NAMA */}
  <span className="text-sm font-medium">

    {profileData?.nama ||
      userData?.name ||
      "Pengguna"}

  </span>

  {/* FOTO */}
  {localStorage.getItem("profilePhoto") ? (

    <img
      src={localStorage.getItem("profilePhoto")}
      alt="profile"
      className="w-8 h-8 rounded-full object-cover"
    />

  ) : (

    <div className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center text-xs font-semibold">

      {(profileData?.nama ||
        userData?.name ||
        "U")
        .charAt(0)
        .toUpperCase()}

    </div>

  )}

</div>

          {/* DROPDOWN */}
          {open && (

            <div className="absolute right-0 top-14 w-64 bg-white rounded-2xl shadow-xl border p-4 z-50">

              {/* ACCOUNT */}
              <div className="mb-3">

                <p className="text-xs text-gray-400">
                  AKUN SAYA
                </p>

                <p className="text-sm font-semibold text-blue-900 mt-1">

                  {profileData?.nama ||
                    userData?.name ||
                    "Pengguna"}

                </p>

                <p className="text-sm text-gray-500 mt-1">

                  {userData?.email ||
                    "user@email.com"}

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

                {/* LOGOUT */}
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

      {/* MODAL */}
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