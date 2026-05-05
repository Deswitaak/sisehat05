import { useState } from "react";
import NavbarDashboard from "../components/NavbarDashboard";
import { useNavigate } from "react-router-dom";


export default function Asesmen() {
const navigate = useNavigate();
  const sections = [
    {
      title: "Organizational Values",
      scale: [1,2,3,4,5],
      questions: [
        "Saya tidak ragu untuk menyampaikan kesulitan kerja kepada atasan atau tim.",
        "Terdapat suasana kekeluargaan dalam lingkungan kerja.",
        "Semangat kerja karyawan di tempat ini tinggi.",
        "Karyawan saling membantu satu sama lain.",
        "Terdapat rasa saling percaya antar karyawan.",
        "Kerja sama tim berjalan dengan baik.",
        "Karyawan saling menghargai satu sama lain.",
        "Saya memandang pekerjaan sebagai bentuk ibadah.",
        "Usaha memiliki modal kerja yang memadai.",
      ]
    },
    {
      title: "Leader Involvement",
      scale: [1,2,3,4,5],
      questions: [
        "Pemimpin memiliki kedekatan secara personal dengan karyawan.",
        "Pemimpin menjadi teladan bagi karyawan.",
        "Pemimpin terbuka terhadap ide atau masukan dari karyawan.",
        "Pemimpin terlibat langsung dalam operasional usaha.",
        "Pemimpin terlibat dalam pelatihan karyawan baru.",
        "Pemimpin memperlakukan karyawan secara adil.",
      ]
    },
    {
      title: "Institutional Resources",
      scale: [1,2,3],
      questions: [
        "Usaha memiliki Nomor Induk Berusaha (NIB).",
        "Usaha mendapatkan bantuan pendanaan dari pemerintah.",
        "Usaha berpartisipasi dalam kegiatan pemerintah.",
        "Usaha menjalin kerja sama dengan pelaku usaha lain.",
        "Usaha memanfaatkan pemasaran digital.",
        "Usaha memiliki sumber keuangan yang jelas.",
      ]
    },
    {
      title: "Operational Stability",
      scale: [1,2,3,4,5],
      questions: [
        "Gaji karyawan dibayarkan tepat waktu.",
        "Peralatan usaha memadai.",
        "Ketersediaan bahan baku stabil.",
        "Permintaan produk stabil.",
        "Hubungan dengan pelanggan jangka panjang.",
      ]
    },
    {
      title: "Quality of Workplace",
      scale: [1,2,3,4,5],
      questions: [
        "Risiko kecelakaan kerja rendah.",
        "Jam kerja sesuai.",
        "Beban kerja wajar.",
        "Lingkungan kerja nyaman.",
        "Absensi karyawan rendah.",
      ]
    },
    {
      title: "Economic Performance",
      scale: [1,2,3,4,5],
      questions: [
        "Jangkauan pasar berkembang.",
        "Penjualan meningkat.",
        "Utang terkendali.",
        "Arus kas berjalan baik.",
      ]
    },
  ];

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const current = sections[step];

  const handleSelect = (qIndex, value) => {
    setAnswers({
      ...answers,
      [`${step}-${qIndex}`]: value,
    });
  };

  const totalQuestions = sections.reduce((acc, s) => acc + s.questions.length, 0);
  const answered = Object.keys(answers).length;
  const progress = Math.round((answered / totalQuestions) * 100);

  return (
    <div className="bg-[#f4f7fb] min-h-screen flex flex-col">

      <NavbarDashboard />

      <div className="px-16 py-10 flex-1">

        <h1 className="text-2xl font-bold text-blue-900">
          Asesmen Profil 6 Faktor Organisasi
        </h1>

        <p className="text-gray-500 mt-2">
          Lengkapi kuesioner untuk analisis bisnis Anda.
        </p>

        {/* PROGRESS */}
        <div className="bg-white p-6 rounded-xl mt-6 shadow-sm">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Progress</span>
            <span>{answered}/{totalQuestions}</span>
          </div>

          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div
              className="bg-blue-900 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-xl mt-8 shadow-sm overflow-hidden">

          <div className="bg-blue-900 text-white px-6 py-4 font-semibold">
            {step + 1}. {current.title}
          </div>

          <div className="p-6 space-y-8">

            {current.questions.map((q, i) => (
              <div key={i}>
                <p className="text-sm text-blue-900 mb-3">{q}</p>

                <div className="flex justify-between items-center text-xs text-gray-400">

                  <span>
                    {current.scale.length === 3 ? "TIDAK" : "SANGAT TIDAK SETUJU"}
                  </span>

                  <div className="flex gap-3">
                    {current.scale.map((num) => (
                      <button
                        key={num}
                        onClick={() => handleSelect(i, num)}
                        className={`w-10 h-10 border rounded-md 
                          ${
                            answers[`${step}-${i}`] === num
                              ? "bg-blue-900 text-white"
                              : "hover:bg-gray-100"
                          }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>

                  <span>
                    {current.scale.length === 3 ? "YA" : "SANGAT SETUJU"}
                  </span>

                </div>
              </div>
            ))}

          </div>
        </div>

        {/* NAV BUTTON */}
        <div className="flex justify-center gap-6 mt-10">

          <button
            disabled={step === 0}
            onClick={() => setStep(step - 1)}
            className="px-6 py-3 border rounded-lg text-gray-600 disabled:opacity-30"
          >
            Sebelumnya
          </button>

          <button
  onClick={() => {
    if (step < sections.length - 1) {
      setStep(step + 1);
    } else {

      // 🔥 HITUNG SKOR
      const result = sections.map((section, sIndex) => {
        let total = 0;

        section.questions.forEach((_, qIndex) => {
          const val = answers[`${sIndex}-${qIndex}`] || 0;
          total += val;
        });

        const max = section.scale.length === 3 ? 3 : 5;
        const score = (total / (section.questions.length * max)) * 100;

        return {
          name: section.title,
          score: Math.round(score),
        };
      });

      const avg =
        result.reduce((acc, r) => acc + r.score, 0) / result.length;

      navigate("/hasil", {
        state: {
          factors: result,
          total: Math.round(avg),
        },
      });
    }
  }}
  className="px-8 py-3 bg-blue-900 text-white rounded-lg"
>
  {step === sections.length - 1 ? "Selesai" : "Selanjutnya"}
</button>

        </div>

      </div>
    </div>
  );
}