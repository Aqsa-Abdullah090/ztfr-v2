"use client";

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
import i18n from "@/components/primitives/I18n";

const queryClient = new QueryClient();

function ProvidersContent({ children }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  const { status, data } = useSelector((state) => state.visitor);
  const language = data?.country?.language;

  // ---------------- LANGUAGE HANDLING ----------------
  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");

    // Case 1: Agar user ne manually change kiya hai ya pehle se cache store hai
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage.toLowerCase());
      return;
    }

    // Case 2: Agar local storage empty hai, to visitor location IP language backup run hoga
    if (!storedLanguage && language) {
      const map = {
        "БЪЛГАРСКИ": "bg",
        "PORTUGUÊS": "pt",
        "DANSK": "dk",
        "⽇本語": "jp",
        "TAGALOG": "ph",
        "FRANÇAIS": "fr",
        "NEDERLANDS": "nl",
        "DEUTSCH": "de",
        "SVENSKA": "se",
        "िहंदी": "in",
        "POLSKI": "pl",
        "العربية": "ae",
        "ESPAÑOL": "es",
        "ITALIANO": "it",
        "עִברִیت": "il",
        "NORSK": "no",
        "แบบไทย": "th",
        "普通话": "cn",
        "ČESKY": "cz",
        "한국어": "kp",
        "TÜRKÇE": "tr",
        "BANGLA": "bg",
        "ENGLISH": "en",
      };

      const detected = map[String(language).toUpperCase()] || "en";
      i18n.changeLanguage(detected);
      localStorage.setItem("language", detected);
    }
  }, [status, language]);

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

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <ProvidersContent>{children}</ProvidersContent>
    </Provider>
  );
}