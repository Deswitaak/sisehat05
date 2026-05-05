import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // ✅ TAMBAHAN STATE (TIDAK NGARUH KE UI)
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // ✅ HANDLE LOGIN
  const handleLogin = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Belum ada akun, silakan registrasi dulu");
      return;
    }

    if (form.email === user.email && form.password === user.password) {
      localStorage.setItem("isLogin", "true");
      navigate("/beranda");
    } else {
      alert("Email atau password salah");
    }
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
            Welcome Back to Your Control Center.
          </h2>
          <p className="mt-4 text-gray-200">
            Monitor, analyze, and elevate your business performance with precision.
          </p>
        </div>

        <p className="text-sm opacity-70">
          © 2026 SiSehat Enterprise Suite • Secure Access
        </p>
      </div>

      {/* RIGHT */}
      <div className="w-1/2 bg-gray-50 p-12 flex items-center">
        <div className="max-w-md w-full mx-auto">

          {/* TAB */}
          <div className="flex gap-6 border-b mb-6 text-sm font-medium">

            <span className="text-blue-900 border-b-2 border-blue-900 pb-2">
              Login
            </span>

            <Link
              to="/registrasi"
              className="text-gray-400 hover:text-blue-900 pb-2"
            >
              Registration
            </Link>
          </div>

          <h2 className="text-2xl font-bold">Welcome Back</h2>
          <p className="text-gray-500 mt-1">
            Login to continue your journey.
          </p>

          {/* FORM */}
          <div className="mt-6 space-y-4">

            {/* EMAIL */}
            <div>
              <label className="text-xs text-gray-500">EMAIL ADDRESS</label>
              <div className="flex items-center border rounded-lg px-3 mt-1 bg-white">
                <Mail size={18} className="text-gray-400" />
                <input
                  className="w-full p-2 ml-2 outline-none"
                  placeholder="name@company.com"
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
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
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />

                <button onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* BUTTON (CUMA DITAMBAH onClick) */}
            <button
              onClick={handleLogin}
              className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800"
            >
              Login
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}