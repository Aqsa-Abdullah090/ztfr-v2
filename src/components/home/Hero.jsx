import useColors from "../../hooks/useColors";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Headers from "./header/Header";
import PreAdvert from "./advert/PreAdvert";
import MetaHandler from "../primitives/MetaHandler";

const Hero = () => {

  const { isVideoPlaying } = useSelector((state) => state.meta);
  const { isImageInBackground } = useSelector((state) => state.meta);
  const { indexForBgImage } = useSelector((state) => state.meta);

  const dispatch = useDispatch();

  const bgData = useSelector((state) => state?.bg?.data);

  // Filter the bgData array to include only items with "type" set to "image"
  const dynamicImages = bgData?.filter((image) => image?.type === "image");

  //slider image

  const sliderImage = useSelector((state) => state?.meta?.bgSliderImage);
  const { background_color, secondary_color } = useColors();

  return (
    <>
      <MetaHandler />

      {isVideoPlaying && <PreAdvert />}

      {/* <AnimatePresence>
        {terms && (
          <TermsAndPrivacyMain
            isOpen={true}
            onClose={() => {}}
            selectedCountryFlag={selectedCountryFlag}
          />
        )}
      </AnimatePresence> */}

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 4 }}
        className={
          isVideoPlaying
            ? ` relative lg:h-screen flex flex-col justify-between transition-colors duration-1000`
            : ` relative h-screen flex flex-col justify-between transition-colors duration-1000 bg-center bg-cover ${
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
    

        <Headers
        />

      </motion.section>


    </>
  );
};

export default Hero;
