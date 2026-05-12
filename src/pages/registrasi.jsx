import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";

export default function Registrasi() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // ✅ TAMBAHAN STATE
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  //  HANDLE CHANGE (TIDAK UBAH UI)
  const handleChange = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  // HANDLE REGISTER
const handleRegister = () => {

  if (!form.email || !form.password) {
    alert("Isi semua data!");
    return;
  }

  localStorage.setItem(
    "user",
    JSON.stringify(form)
  );

  //  SIMPAN NAMA USER
  localStorage.setItem(
    "profileData",
    JSON.stringify({
      nama: form.name
    })
  );

  alert("Registrasi berhasil, silakan login");

  navigate("/login");
};

  return (
    <div className="min-h-screen flex">

      {/* LEFT */}
      <div className="w-1/2 bg-gradient-to-br from-blue-950 to-blue-700 text-white p-12 flex flex-col justify-between">
        <div>
          <h1 className="font-bold text-lg">SiSehat</h1>
          <p className="text-sm mt-1 opacity-80">
            Enterprise Analytics & Growth Ecosystem
          </p>
        </div>

        <div>
          <h2 className="text-4xl font-bold leading-tight">
            Master your business vitality with precision.
          </h2>
          <p className="mt-4 text-gray-200">
            Join thousands of organizations using SiSehat to monitor performance,
            analyze risk, and optimize enterprise health through data-driven insights.
          </p>
        </div>

        <p className="text-sm opacity-70">
          © 2026 SiSehat Enterprise Suite • GDPR Compliant
        </p>
      </div>

      {/* RIGHT */}
      <div className="w-1/2 bg-gray-50 p-12 flex items-center">
        <div className="max-w-md w-full mx-auto">

          <div className="flex gap-6 border-b mb-6 text-sm font-medium">
            <Link to="/login" className="text-gray-400 hover:text-blue-900 pb-2">
              Login
            </Link>

            <span className="text-blue-900 border-b-2 border-blue-900 pb-2">
              Registration
            </span>
          </div>

          <h2 className="text-2xl font-bold">Join SiSehat Today</h2>
          <p className="text-gray-500 mt-1">
            Start your business health journey.
          </p>

          <div className="mt-6 space-y-4">

            {/* FULL NAME */}
            <div>
              <label className="text-xs text-gray-500">FULL NAME</label>
              <div className="flex items-center border rounded-lg px-3 mt-1 bg-white">
                <User size={18} className="text-gray-400" />
                <input
                  className="w-full p-2 ml-2 outline-none"
                  placeholder="John Doe"
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-xs text-gray-500">EMAIL ADDRESS</label>
              <div className="flex items-center border rounded-lg px-3 mt-1 bg-white">
                <Mail size={18} className="text-gray-400" />
                <input
                  className="w-full p-2 ml-2 outline-none"
                  placeholder="name@company.com"
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>
            </div>

            {/* PHONE */}
            <div>
              <label className="text-xs text-gray-500">WHATSAPP NUMBER</label>
              <div className="flex items-center border rounded-lg px-3 mt-1 bg-white">
                <Phone size={18} className="text-gray-400" />
                <input
                  className="w-full p-2 ml-2 outline-none"
                  placeholder="+62 812 3456 7890"
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-xs text-gray-500">PASSWORD</label>
              <div className="flex items-center border rounded-lg px-3 mt-1 bg-white">
                <Lock size={18} className="text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full p-2 ml-2 outline-none"
                  placeholder="••••••••"
                  onChange={(e) => handleChange("password", e.target.value)}
                />

                <button onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" />
              <span>I agree to Terms & Privacy Policy</span>
            </div>

            {/* ✅ HANYA TAMBAH onClick */}
            <button
              onClick={handleRegister}
              className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800"
            >
              Create Account
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}