import { API_STATUS, asideNavTab } from "@/lib/constants";
import HeaderWrapper from "@/components/advertising/HeaderWrapper";
import Hero from "@/components/advertising/Hero";
import WatchThis from "@/components/advertising/WatchThis";
import Videos from "@/components/advertising/Videos";
import Images from "@/components/advertising/Images";
import Form from "@/components/advertising/Form";
import Partners from "@/components/advertising/Partners";
import { useDispatch, useSelector } from "react-redux";
import { memo, useEffect } from "react";
import { fetchCountries } from "@/src/store/features/countries.slice";
import LargeScreenView from "@/components/advertising/large-screen/LargeScreenView";
import {
  destroyImgVideo,
  laodVideos,
} from "@/src/store/features/advertising.slice";
import AdvertisingLoader from "@/components/advertising/AdvertisingLoader";
import Footer from "@/components/advertising/Footer";
import { changeAsideNavState } from "@/src/store/features/modalSlice";
import clsx from "clsx";

function AdvertisingPage() {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.countries);
  const visitor = useSelector((state) => state.visitor);
  const { status: bgStatus, data: bgAdverts } = useSelector(
    (state) => state.bg
  );

  // fetch countires data
  useEffect(() => {
    if (status === API_STATUS.idle) {
      dispatch(fetchCountries());
    }
  }, [dispatch, status]);

  // fill the videos content
  useEffect(() => {
    if (bgStatus === API_STATUS.success) {
      const videos = bgAdverts.filter((item) => item.type === "video");
      dispatch(laodVideos(videos));
    }
  }, [bgStatus]);

  useEffect(() => {
    // close aside nav to prevent dynamic images error
    dispatch(changeAsideNavState(asideNavTab.close));
    // reset slice state, when user leaves the page
    return () => {
      dispatch(destroyImgVideo());
    };
  }, []);

  return (
    <>
      <AdvertisingLoader />

      <div
        className={clsx(
          "bg-black text-white overflow-y-auto h-screen  uppercase font-normal scroll-smooth",
          localStorage.getItem("language") === "NL" ||
            localStorage.getItem("language") === "IT" ||
            localStorage.getItem("language") === "ES"
            ? "italian_tracking"
            : localStorage.getItem("language") === "FR"
            ? "french_tracking"
            : localStorage.getItem("language") === "BG"
            ? "bulgarian_tracking"
            : localStorage.getItem("language") === "DE" ||
              localStorage.getItem("language") === "PT"
            ? "german_tracking"
            : localStorage.getItem("language") === "PL" ||
              localStorage.getItem("language") === "SE"
            ? "norge_tracking"
            : localStorage.getItem("language")?.toLowerCase() === "ru"
            ? "tracking-[1px]"
            : localStorage.getItem("language") === "en" ||
              localStorage.getItem("language") === "PH" ||
              localStorage.getItem("language") === "TR" ||
              localStorage.getItem("language") === "CZ" ||
              localStorage.getItem("language") === "DK" ||
              localStorage.getItem("language") === "NO" ||
              localStorage.getItem("language") === "RU" ||
              localStorage.getItem("language") === null
            ? "tracking-[1.5px] 3xl:tracking-[2px]"
            : "tracking-normal"
        )}
      >
        <div className="text-golden">
          <HeaderWrapper />
        </div>
        <Hero />
        <WatchThis />
        <Videos />
        <Images />
        <Partners />
        {visitor.data && <Form />}
        <Footer />
      </div>

      <LargeScreenView />
    </>
  );
}
export default memo(AdvertisingPage);
