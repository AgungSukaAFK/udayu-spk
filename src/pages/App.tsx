import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button.tsx";

export default function App() {
  return (
    <>
      <Helmet>
        <title>UDAYU</title>
        <meta
          name="description"
          content="Aplikasi SPK untuk metode Profile Matching dan Weighted Product, membantu pengambilan keputusan secara objektif dan terstruktur."
        />
        <meta
          name="keywords"
          content="SPK, Profile Matching, Weighted Product, udayu-spk, pengambilan keputusan"
        />
        <link rel="canonical" href="https://udayu-spk.vercel.app/" />
      </Helmet>

      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-50 to-white px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Selamat Datang di{" "}
          <span className="text-sky-600 font-lexend">UDAYU</span> SPK
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-xl mb-8">
          Aplikasi Sistem Pendukung Keputusan (SPK) berbasis metode{" "}
          <strong>Profile Matching</strong> dan{" "}
          <strong>Weighted Product</strong> untuk membantu pemilihan terbaik
          secara objektif dan efisien.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <Link to="/profile-matching">
            <Button className="w-60 text-lg">Mulai Profile Matching</Button>
          </Link>
          <Link to="/weighted-product">
            <Button variant="outline" className="w-60 text-lg">
              Mulai Weighted Product
            </Button>
          </Link>
        </div>
      </main>
    </>
  );
}
