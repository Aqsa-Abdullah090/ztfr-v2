import i18n from "@/components/common/I18n";
import ProtectedRoute from "@/components/primitives/ProtectedRoute";
import Loading from "@/components/startup/Loading";
import VisitorUser from "@/components/startup/VisitorUser";S
import store from "@/src/store";
import "@/styles/globals.scss";
import { AnimatePresence, motion } from "framer-motion";
import { appWithTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import "swiper/css";

const queryClient = new QueryClient();

const App = ({ Component, pageProps }) => {
  const [loading, setLoading] = useState(true);
  const { status, data } = store.getState().visitor;
  const language = data?.country?.language;

  const router = useRouter();




  useEffect(() => {
    router.events.on("routeChangeComplete", () => {
      window.scrollTo(0, 0);
    });
    return () => {
      router.events.off("routeChangeComplete");
    };
  }, []);

  return (
    <Provider store={store}>
      <AnimatePresence mode="wait">
        <motion.div
          key={router.route}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "keyframes" }}
        >
          <QueryClientProvider client={queryClient}>
            <VisitorUser loading={loading} setLoading={setLoading} />
            <Loading setLoading={setLoading} loading={loading} />
              <ProtectedRoute />
              <Component {...pageProps} visitorLoading={loading} />
          </QueryClientProvider>
        </motion.div>
      </AnimatePresence>
    </Provider>
  );
};
export default appWithTranslation(App);
