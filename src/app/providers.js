'use client';

import { Provider, useSelector } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import store from "@/store";

import VisitorUser from "@/components/startup/VisitorUser";
import Loading from "@/components/startup/Loading";
import ProtectedRoute from "@/components/primitives/ProtectedRoute";
import IPBlockProvider from "@/components/primitives/ip-block/IPBlockProvider";

import "swiper/css";

import i18n from "@/components/primitives/I18n"; // 🔥 IMPORTANT (adjust path if needed)

const queryClient = new QueryClient();

function ProvidersContent({ children }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  const { status, data } = useSelector((state) => state.visitor);
  const language = data?.country?.language;

  const supportedLanguages = [
    "en","PK","FR","IT","DE","ES","PT","NL","NO","DK","SE",
    "PL","BG","CZ","TR","AE","CN","IL","JP","KP","TH","PH","IN"
  ];

  // ---------------- LANGUAGE HANDLING ----------------
  useEffect(() => {
    if (!data) return;

    const storedLanguage = localStorage.getItem("language");

    if (!storedLanguage && language) {
      // Map full language names → codes
      const map = {
        "БЪЛГАРСКИ": "BG",
        "PORTUGUÊS": "PT",
        "DANSK": "DK",
        "⽇本語": "JP",
        "TAGALOG": "PH",
        "FRANÇAIS": "FR",
        "NEDERLANDS": "NL",
        "DEUTSCH": "DE",
        "SVENSKA": "SE",
        "िहंदी": "IN",
        "POLSKI": "PL",
        "العربية": "AE",
        "ESPAÑOL": "ES",
        "ITALIANO": "IT",
        "עִברִית": "IL",
        "NORSK": "NO",
        "แบบไทย": "TH",
        "普通话": "CN",
        "ČESKY": "CZ",
        "한국어": "KP",
        "TÜRKÇE": "TR",
        "Bangla": "BG",
        "ENGLISH": "en",
      };

      const detected = map[language] || "en";
      i18n.changeLanguage(detected);
      localStorage.setItem("language", detected);
    } else if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, [status, data]);

  // ---------------- SCROLL RESET ----------------
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "tween" }}
        >
          <VisitorUser loading={loading} setLoading={setLoading} />
          <Loading loading={loading} setLoading={setLoading} />

          <IPBlockProvider>
            <ProtectedRoute>
              {children}
            </ProtectedRoute>
          </IPBlockProvider>
        </motion.div>
      </AnimatePresence>
    </QueryClientProvider>
  );
}

// ✅ FINAL WRAPPER
export function Providers({ children }) {
  return (
    <Provider store={store}>
      <ProvidersContent>{children}</ProvidersContent>
    </Provider>
  );
}