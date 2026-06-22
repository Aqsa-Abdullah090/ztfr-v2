import useColors from "../../hooks/useColors";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Headers from "./header/Header";
import PreAdvert from "./advert/PreAdvert";
import MetaHandler from "../primitives/MetaHandler";
import Partner from "../visit-patner/Partner";
import Footer from "./footer/Footer";

const Hero = () => {
  const { isVideoPlaying, indexForBgImage, indexForVideo } = useSelector(
    (state) => state.meta,
  );
  const { isImageInBackground } = useSelector((state) => state.meta);

  const dispatch = useDispatch();
  const bgData = useSelector((state) => state?.bg?.data);

  // Filter video & image tracks
  const dynamicVideos =
    bgData?.filter((video) => video?.type === "video") || [];
  const dynamicImages =
    bgData?.filter((image) => image?.type === "image") || [];

  // Identify current running video data
  const currentVideoData = dynamicVideos[indexForVideo] || null;

  const sliderImage = useSelector((state) => state?.meta?.bgSliderImage);
  const { background_color, secondary_color } = useColors();

  return (
    <>
      <MetaHandler />

      {isVideoPlaying && <PreAdvert />}

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 4 }}
        className={
          isVideoPlaying
            ? `relative lg:h-screen w-full flex flex-col justify-between transition-colors duration-1000`
            : `relative h-screen flex flex-col justify-between transition-colors duration-1000 bg-center bg-cover ${
                !isImageInBackground ? background_color : null
              }`
        }
        style={
          isImageInBackground
            ? {
                backgroundColor: secondary_color,
                backgroundImage: `url(${
                  sliderImage === null
                    ? dynamicImages[indexForBgImage]?.url
                    : sliderImage?.url
                })`,
              }
            : null
        }
        onClick={() => dispatch(changeSidebar(sidebarTab.sidebar))}
      >
        <Headers />

        <section className="flex-1 flex items-center justify-between w-full text-white">
          <div>dsfdsfsfdsf</div>

          <div>
            {isVideoPlaying && currentVideoData?.is_premium && (
              <Partner currentVideo={currentVideoData} />
            )}
          </div>
        </section>

        <Footer />
      </motion.section>
    </>
  );
};

export default Hero;
