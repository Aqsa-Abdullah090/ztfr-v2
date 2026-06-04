'use client'; // This is mandatory for client-side state/hooks

import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation"; 
import { useEffect, useState } from "react";
import store from "@/store";

import VisitorUser from "@/components/startup/VisitorUser";
import Loading from "@/components/startup/Loading";
import ProtectedRoute from "@/components/primitives/ProtectedRoute";

import "swiper/css";

const queryClient = new QueryClient();

export function Providers({ children }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname(); // Replaces router.route for animation keys

  // Handles your old router.events scroll-to-top behavior
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "keyframes" }}
          >
            <VisitorUser loading={loading} setLoading={setLoading} />
            <Loading setLoading={setLoading} loading={loading} />
            
            {/* Wrap children with ProtectedRoute so it actually guards pages */}
            <ProtectedRoute>
              {children}
            </ProtectedRoute>
          </motion.div>
        </AnimatePresence>
      </QueryClientProvider>
    </Provider>
  );
}