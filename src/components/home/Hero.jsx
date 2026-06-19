// import useColors from "@/hooks/useColors";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Headers from "./header/Header";
import PreAdvert from "./advert/PreAdvert";

const Hero = () => {
  const sidebarRightState = useSelector(
    (state) => state.modals.sidebarRightState
  );
  const sidebarModalTab = useSelector((state) => state?.modals?.sidebar);

  const { isVideoPlaying } = useSelector((state) => state.meta);
  const { isImageInBackground } = useSelector((state) => state.meta);
  const { indexForBgImage } = useSelector((state) => state.meta);

  const { t } = useTranslation();
  const [showCountries, setShowCountries] = useState(false);
  const [selectedCountryFlag, setSelectedCountryFlag] = useState("");

  const welcomeState = useSelector((state) => state?.modals?.welcomeState);
  const handleFlagClick = () => {
    setShowCountries(!showCountries);
  };

  const handleCountryClick = (country) => {
    setSelectedCountryFlag(country.country_flag);
    setShowCountries(false);
  };

  const dispatch = useDispatch();
  const handleFilesDropped = (files) => {
    // Do something with the dropped files
    // console.log(files);
  };
  const { index, olympicsVideo, olympicsPicture, olympicsState } = useSelector(
    (state) => state.meta
  );
  const { asideNavItem } = useSelector((state) => state.modals);
  const { isShowFileDownloadModal } = useSelector((state) => state.modals);
  const terms = useSelector((state) => state?.modals?.termsModalState);

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
