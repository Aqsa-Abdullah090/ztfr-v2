'use client';
import "./globals.css"
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SidePopup from '@/components/SidePopup';
import CountryFlagsSidePopup from '@/components/CountryFlagsSidePopup';

export default function Home() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isRegionPanelOpen, setIsRegionPanelOpen] = useState(false);
  
  const [selectedRegion, setSelectedRegion] = useState({
    id: 1,
    country_name: 'UK',
    country_flag: '🇬🇧'
  });

  useEffect(() => {
    const savedRegion = localStorage.getItem('activeRegion');
    if (savedRegion) {
      try {
        setSelectedRegion(JSON.parse(savedRegion));
      } catch (e) {
        console.error("Error parsing localStorage region:", e);
      }
    }
  }, []);

  const handleRegionSelect = (region) => {
    const updatedRegion = {
      id: region.id,
      country_name: region.country_name,
      country_flag: region.country_flag || region.country_emoji
    };
    setSelectedRegion(updatedRegion);
    localStorage.setItem('activeRegion', JSON.stringify(updatedRegion));
  };

  return (
    <main className="relative h-screen w-full overflow-hidden text-white flex flex-col justify-between bg-transparent">
      
      {/* 1. CINEMATIC BACKGROUND LAYER */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/assets/14.jpeg"
          alt="Background image"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      </div>

      {/* 2. TOP HEADER UTILITY */}
      <div className="pl-16 md:pl-20 z-10">
        {/* Yahan isSidebarOpen prop pass kiya hai */}
        <Header 
          onFlagClick={() => setIsRegionPanelOpen(true)} 
          selectedRegion={selectedRegion}
          isSidebarOpen={isRegionPanelOpen} 
        />
      </div>

      {/* 3. CENTRAL WORKSPACE SCREEN */}
      <section className="relative flex-1 flex flex-col items-center justify-center px-6 pl-20 md:pl-24 text-center z-10 transition-all duration-300">
        <div className="max-w-3xl w-full p-8 space-y-6">
          <div className="space-y-4 select-none">
            <p className="text-[11px] font-bold tracking-[0.3em] text-white/50 uppercase font-mono">
              SYSTEM INTERFACE ACTIVE
            </p>
            <h1 className="text-sm md:text-base font-medium tracking-[0.15em] text-slate-200 max-w-xl mx-auto uppercase leading-relaxed font-sans">
              UPLOAD FILES OR FOLDERS BY DROPPING THEM ANYWHERE IN THIS WINDOW
            </h1>
          </div>

          <div className="pt-4">
            <button
              onClick={() => setIsPanelOpen(true)}
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur-md px-6 py-2.5 text-xs font-semibold tracking-widest uppercase transition-all active:scale-95"
            >
              Open Transfer Panel
            </button>
          </div>
        </div>
      </section>

      {/* 4. BASE FOOTER SYSTEM METRICS */}
      <div className="pl-16 md:pl-20 transition-all duration-300">
        <Footer />
      </div>

      {/* 5. SLIDE-OUT FILE TRANSFER MANAGER */}
      <SidePopup 
        isOpen={isPanelOpen} 
        onClose={() => setIsPanelOpen(false)} 
        onOpen={() => setIsPanelOpen(true)} 
        title="UPLOAD FILES"
      />

      {/* 6. COUNTRY FLAGS SIDE POPUP */}
      <CountryFlagsSidePopup 
        isOpen={isRegionPanelOpen} 
        onClose={() => setIsRegionPanelOpen(false)} 
        activeRegionId={selectedRegion.id}
        onSelectRegion={handleRegionSelect}
      />
    </main>
  );
}