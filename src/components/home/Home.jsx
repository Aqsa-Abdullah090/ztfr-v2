"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchVisitor, loadVisitor } from "@/store/features/visitorSlice";
import Header from "@/components/home/header/Header";
import Footer from "@/components/home/footer/Footer";
import SidePopup from "@/components/SidePopup";
import CountryFlagsSidebar from "@/components/country-sidebar/CountrySidebar";
import { countriesData } from "@/lib/countries_data";

export default function Home() {
  const dispatch = useDispatch();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isRegionPanelOpen, setIsRegionPanelOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);

  // Redux telemetry connection
  const visitorState = useSelector((state) => state.visitor);
  const visitorData = visitorState?.data;

  // 1. Initial Load Matrix
  useEffect(() => {
    dispatch(loadVisitor()); // Instant local storage load
    dispatch(fetchVisitor()); // Background dynamic fetch
  }, [dispatch]);

  // 2. Heavy-Duty Synchronization Loop
  useEffect(() => {
    // Priority 1: User Explicit Selection (LocalStorage Locked Preference)
    const savedRegion = localStorage.getItem('activeRegion');
    if (savedRegion) {
      try {
        const parsed = JSON.parse(savedRegion);
        if (parsed && parsed.id) {
          setSelectedRegion(parsed);
          return; 
        }
      } catch (e) {
        console.error("Active region storage parse error:", e);
      }
    }

    // Priority 2: Extracting From Visitor Data (Redux State)
    if (visitorData) {
      const apiCountryCode = visitorData?.countryCode || 
                            visitorData?.country_code || 
                            visitorData?.country?.country_code || 
                            visitorData?.country?.code ||
                            visitorData?.geo?.country_code;

      const dynamicFlagUrl = visitorData?.country?.flag_url || visitorData?.flag_url || visitorData?.flag;
      const apiCountryName = visitorData?.country_name || visitorData?.country?.country_name || visitorData?.country;

      if (apiCountryCode) {
        const cleanApiCode = String(apiCountryCode).trim().toLowerCase();

        // Check local array 'value' field (like 'pk', 'in') as priority matching keys
        const matchedCountry = countriesData.find((c) => {
          const localCode = c.value || c.country_code || c.code || c.id;
          return localCode && String(localCode).trim().toLowerCase() === cleanApiCode;
        });

        if (matchedCountry) {
          setSelectedRegion({
            id: matchedCountry.id,
            country_name: matchedCountry.country_name,
            country_flag: dynamicFlagUrl || matchedCountry.country_flag
          });
          return;
        }
      }

      // ULTIMATE FALLBACK: Agar English Name ya Asset verification matches mil jayein
      if (apiCountryName && typeof apiCountryName === 'string') {
        const cleanApiName = apiCountryName.trim().toLowerCase();
        const matchedByName = countriesData.find((c) => {
          const localName = String(c.country_name).trim().toLowerCase();
          const localFlagPath = String(c.country_flag).trim().toLowerCase();
          return localName === cleanApiName || localFlagPath.includes(cleanApiName);
        });

        if (matchedByName) {
          setSelectedRegion({
            id: matchedByName.id,
            country_name: matchedByName.country_name,
            country_flag: dynamicFlagUrl || matchedByName.country_flag
          });
          return;
        }
      }

      // EXTRA EMERGENCY SAFEGUARD
      if (dynamicFlagUrl) {
        const fallbackId = apiCountryCode ? String(apiCountryCode).trim().toLowerCase() : 'dynamic-api-node';
        setSelectedRegion({
          id: fallbackId, 
          country_name: typeof apiCountryName === 'string' ? apiCountryName : 'Detected Region',
          country_flag: dynamicFlagUrl
        });
      }
    }
  }, [visitorData]);

  const handleRegionSelect = (region) => {
    const updatedRegion = {
      id: region.id,
      country_name: region.country_name,
      country_flag: region.country_flag || region.country_emoji,
    };
    setSelectedRegion(updatedRegion);
    localStorage.setItem("activeRegion", JSON.stringify(updatedRegion));
  };

  return (
    <main className="relative h-screen w-full overflow-hidden text-white flex flex-col justify-between bg-transparent">
      
      {/* 🔥 Video Background Container */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          {/* Apni video ka path yahan public folder ke mutabik set karein */}
          <source src="/assets/World’s Best Airline 2025.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Dark overlay taake video ke upar text sahi se read ho sake */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      </div>

      <div className="pl-16 md:pl-20 z-10">
        <Header
          onFlagClick={() => setIsRegionPanelOpen(true)}
          selectedRegion={selectedRegion}
          isSidebarOpen={isRegionPanelOpen}
        />
      </div>

      <section className="relative flex-1 flex flex-col items-center justify-center px-6 pl-20 md:pl-24 text-center z-10">
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

      <div className="pl-16 md:pl-20">
        <Footer />
      </div>

      <SidePopup
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        title="UPLOAD FILES"
      />

      <CountryFlagsSidebar
        isOpen={isRegionPanelOpen}
        onClose={() => setIsRegionPanelOpen(false)}
        activeRegionId={selectedRegion?.id}
        selectedRegion={selectedRegion}
        onSelectRegion={handleRegionSelect}
      />
    </main>
  );
}