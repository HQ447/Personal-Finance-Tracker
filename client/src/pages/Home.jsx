import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="flex flex-col w-full">
      <Navbar />
      <div className="px-20 py-10 min-h-[60vh]">This is Body</div>
      <Footer />
    </div>
  );
}

export default Home;
