"use client";
import Partner from "../visit-patner/Partner";
import Footer from "./footer/Footer";
import Headers from "./header/Header";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-between overflow-hidden">
      
      {/* Background Video */}
      <div className="absolute inset-0 -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source
            src="/assets/World’s Best Airline 2025.mp4"
            type="video/mp4"
          />
        </video>

      </div>

      {/* Header */}
      <Headers />

      {/* Middle Section */}
      <section className="flex-1 flex items-center justify-between w-full text-white">
        <div>dsfdsfsfdsf</div>

        <div>
          <Partner />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}