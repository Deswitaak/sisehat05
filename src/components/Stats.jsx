export default function Stats() {
  return (
    <section className="bg-blue-950 text-white py-16 px-12 grid grid-cols-4 text-center">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">500+</h1>
        <p className="text-sm text-gray-300">Perusahaan Aktif</p>
      </div>

      <div>
        <h1 className="text-2xl md:text-3xl font-bold">99.9%</h1>
        <p className="text-sm text-gray-300">Waktu Aktif Server</p>
      </div>

      <div>
        <h1 className="text-2xl md:text-3xl font-bold">24/7</h1>
        <p className="text-sm text-gray-300">Dukungan Teknis</p>
      </div>

      <div>
        <h1 className="text-2xl md:text-3xl font-bold">12M+</h1>
        <p className="text-sm text-gray-300">Data Terproses / Jam</p>
      </div>
    </section>
  );
}