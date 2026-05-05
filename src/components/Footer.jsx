export default function Footer() {
  return (
    <footer className="bg-gray-100 px-12 py-10">
      <div className="max-w-7xl mx-auto flex justify-between items-start">

        {/* LEFT */}
        <div>
          <h1 className="font-bold text-blue-900 text-lg">SiSehat</h1>

          <p className="text-gray-500 mt-3 max-w-sm text-sm">
            Platform analisis bisnis terdepan untuk transformasi digital berkelanjutan.
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col items-end text-sm text-gray-500 gap-3">
          <div className="flex gap-6">
            <span className="hover:text-blue-900 cursor-pointer">Privasi</span>
            <span className="hover:text-blue-900 cursor-pointer">Syarat & Ketentuan</span>
            <span className="hover:text-blue-900 cursor-pointer">Kontak</span>
          </div>

          <p className="text-xs text-gray-400">
            © 2026 SiSehat Analytics. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}