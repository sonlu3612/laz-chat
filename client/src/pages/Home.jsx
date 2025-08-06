import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between">

      <header className="p-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Laz</h1>
        <nav>
          <button className="bg-white text-black py-3 px-6 rounded-full hover:bg-gray-200  
          mr-4 cursor-pointer" onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button
            className="bg-white text-black px-6 py-3 rounded-full hover:bg-gray-200 cursor-pointer"
          >
            Download
          </button>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-5xl font-bold mb-6">Chào mừng đến với Laz</h2>
        <p className="text-lg max-w-xl text-gray-300 mb-8">
          Laz là nền tảng chat hiện đại, nhanh chóng và riêng tư. Trò chuyện thoải mái, không giới hạn, ở bất kỳ đâu.
        </p>
      </main>

    </div>
  );
};

export default Home;
