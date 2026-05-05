import heroImg from "../assets/Container.png";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="flex justify-between items-center px-12 py-20 bg-[#eef2f7]">
      
      {/* LEFT */}
      <div className="max-w-xl">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
          STRATEGI BERBASIS DATA
        </span>

        <h1 className="text-5xl font-bold text-blue-900 mt-6 leading-tight">
          Kendalikan <br />
          <span className="text-gray-500">Pertumbuhan</span> <br />
          Bisnis Anda.
        </h1>

        <p className="text-gray-600 mt-6">
          SiSehat Analytics menyederhanakan data operasional kompleks menjadi
          wawasan strategis yang mendorong efisiensi dan laba maksimal.
        </p>

        {/* BUTTON */}
        <div className="flex gap-4 mt-8">

          {/* BUTTON KE REGISTER */}
          <Link to="/registrasi">
            <button className="bg-blue-900 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-800 transition">
              Mulai Sekarang →
            </button>
          </Link>

        </div>
      </div>

      {/* RIGHT IMAGE */}
      <img
        src={heroImg}
        alt="hero"
        className="w-[450px] rounded-2xl shadow-lg"
      />
      
    </section>
  );
}