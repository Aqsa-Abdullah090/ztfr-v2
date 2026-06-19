/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { termsModal } from "@/lib/constants";
import { auth } from "@/lib/firebase.config";
import { rightAlignment } from "@/lib/helper";
import { logout } from "@/src/store/features/authSlice";
import {
  changeTermsModal,
  setShowCountries,
} from "@/src/store/features/modalSlice";
import { selectNavItem } from "@/src/store/features/navSlice";
import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import AdvertisingTerms from "./AdvertisingTerms";
import NoticeTakeDownPolicy from "./NoticeTakedownPolicy";
import PrivacyStatement from "./PrivacyStatement";
import TermsOfService from "./TermsOfService";
import clsx from "clsx";

function TermsAndPrivacyMain({ onClose, isOpen, children }) {
  // for nav items
  const selectedComponent = useSelector(
    (state) => state?.nav?.selectedComponent
  );

  const dynamicFlag = useSelector(
    (state) => state.visitor?.data?.country?.app_icon
  );
  const { t } = useTranslation();


  const selectedCountryFlag =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("countryFlag")
      : null;

      const dispatch = useDispatch();


  // Function to handle clicks on navbar elements and update the selected component
  const handleNavItemClick = (componentName) => {
    dispatch(selectNavItem(componentName));
  };

  const { user } = useSelector((state) => state.auth);
  const flagClick = () => {
    dispatch(setShowCountries(true));
  };
  const initialAnimation = {
    mobile: { y: "-100%" },
    desktop: { x: "100%" },
  };

  const inViewAnimation = {
    mobile: { y: 0 },
    desktop: { x: 0 },
  };
  const isMobile = window.innerWidth <= 768;
  return (
    <>
      <motion.div
        style={{
          letterSpacing:
            localStorage.getItem("language") === "NL" ||
            localStorage.getItem("language") === "IT"
              ? "1.2px"
              : localStorage.getItem("language") === "DE" ||
                localStorage.getItem("language") === "PT"
              ? "1px"
              : localStorage.getItem("language") === "PL" ||
                localStorage.getItem("language") === "SE" ||
                localStorage.getItem("language") === "ES"
              ? "1.5px"
              : localStorage.getItem("language") === "en" ||
                localStorage.getItem("language") === "PH" ||
                localStorage.getItem("language") === "TR" ||
                localStorage.getItem("language") === "CZ" ||
                localStorage.getItem("language") === "DK" ||
                localStorage.getItem("language") === "NO" ||
                localStorage.getItem("language") === "RU" ||
                localStorage.getItem("language") === null
              ? "0.1em"
              : "0px",
        }}
        initial={isMobile ? initialAnimation.mobile : initialAnimation.desktop}
        whileInView={
          isMobile ? inViewAnimation.mobile : inViewAnimation.desktop
        }
        exit={isMobile ? initialAnimation.mobile : initialAnimation.desktop}
        transition={{ duration: 0.5 }}
        className=" ml-auto lg:w-[1350px] 2xl:w-[1900px] 4xl:w-[100%]  h-[100dvh] right-0 absolute z-[400] "
      >
        <div
          className={`w-screen h-[100dvh] lg:w-1/2 absolute right-0 text-black  bg-white z-[800]`}
        >
          <div className="flex w-[98%] mt-4 h-[100dvh] flex-col overflow-y-scroll py-3 pb-2 px-4">
            <div className="absolute -top-3 flex gap-x-8 3xl:ml-5 items-center relative">
              <img
                src="/assets/x-icon-b.svg"
                alt="close"
                className="w-[12px] lg:w-[15px] cursor-pointer 3xl:w-[20px]"
                onClick={() => {
                  dispatch(changeTermsModal(termsModal.defaultModal));
                }}
              />
              <p
                className={`uppercase  ${t(
                  "page.legalModal.textsizes.textsize1"
                )}`}
              >
                {t("page.legalModal.legal")}
              </p>
              <div
                className={`flex absolute -right-2 translate-x-[-50%] flex-1 justify-end top-[14px] items-center gap-x-4 `}
              >
                <div className="flex items-center gap-x-4">
                  {selectedCountryFlag ? (
                    <img
                      src={selectedCountryFlag}
                      alt="country-flag"
                      className="w-[30px] 3xl:w-[50px] cursor-pointer rounded-[10px]"
                      onClick={flagClick}
                    />
                  ) : (
                    <img
                      src={dynamicFlag}
                      alt={"countryflag"}
                      className="w-[30px] 3xl:w-[50px] cursor-pointer rounded-[10px]"
                      onClick={flagClick}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="  flex items-center justify-between my-4 2xl:pl-4">
              <header className="relative flex justify-between  w-full align-center -z-[10] absolute -top-7 3xl:-top-8">
                {/* top left labels */}
                <div
                  className={`uppercase ${t(
                    "page.legalModal.textsizes.textsize1"
                  )}  flex items-center justify-between flex-1 `}
                >
                  <p>
                    {selectedComponent === "TermsOfService" &&
                      t("page.legalModal.termsOfConditions.termsOfServices")}
                    {selectedComponent === "PrivacyStatement" &&
                      t("page.legalModal.privacyStatement.privacyStatement")}
                    {selectedComponent === "NoticeTakeDown" &&
                      t("page.legalModal.noticePolicy.noticepolicy")}
                    {selectedComponent === "AdvertisingTerms" &&
                      t("page.legalModal.advertisementTerms.advertisingterms")}
                  </p>
                </div>
                {/* ZItransfer img */}
                <div
                  className={` ${"hidden lg:flex flex-1 flex-col justify-center items-center gap-y-2 3xl:gap-y-4"}`}
                >
                  <img
                    src="/assets/ZITRANSFER-B.svg"
                    className="w-[100px] lg:w-[150px] 2xl:w-[202px] "
                    alt=""
                  />
                  <p
                    className={` ${t(
                      "page.legalModal.textsizes.textsize5"
                    )} uppercase leading-5`}
                  >
                    {t("page.legalModal.legalInfo")}
                  </p>
                </div>

                <div
                  className={`flex flex-1 justify-end  items-center gap-x-4 `}
                ></div>
              </header>
            </div>

            <div className="flex -mt-3 lg:-mt-6 3xl:-mt-8 flex-col flex-col-reverse lg:flex-row justify-between gap-x-8 2xl:pl-4">
              <div
                className={clsx(
                  "flex gap-y-2 flex-col flex-1",
                  rightAlignment() ? "items-end" : "items-start"
                )}
              >
                {/* Headings like  OWNERSHIP OF SITE; AGREEMENT TO TERMS OF SERVICE*/}
                <div
                  className={`${t(
                    "page.legalModal.textsizes.textsize1"
                  )}  max-w-max uppercase leading-5 ${
                    rightAlignment() ? "text-right" : "text-left"
                  }`}
                >
                  {selectedComponent === "TermsOfService" && (
                    <p>
                      {t(
                        "page.legalModal.termsOfConditions.ownership.ownership_heading"
                      )}
                    </p>
                  )}
                  {selectedComponent === "PrivacyStatement" && (
                    <p>
                      {" "}
                      {t(
                        "page.legalModal.privacyStatement.privacy.privacy_heading"
                      )}
                    </p>
                  )}
                  {selectedComponent === "NoticeTakeDown" && ""}
                  {selectedComponent === "AdvertisingTerms" && (
                    <p>
                      {t("page.legalModal.advertisementTerms.terms.heading")}
                    </p>
                  )}
                </div>

                {/* First para of each component */}
                <div
                  className={clsx(
                    "leading-5",
                    t("page.legalModal.textsizes.textsize2"),

                    rightAlignment() ? "text-right" : "text-left"
                  )}
                >
                  <>
                    {selectedComponent === "TermsOfService" && (
                      <p
                        className={`${t(
                          "page.legalModal.textsizes.textsize2"
                        )} leading-5`}
                        dangerouslySetInnerHTML={{
                          __html: t(
                            "page.legalModal.termsOfConditions.ownership.ownership_para1"
                          ),
                        }}
                      />
                    )}
                    {selectedComponent === "PrivacyStatement" && (
                      <p
                        className={`${t(
                          "page.legalModal.textsizes.textsize2"
                        )} leading-5`}
                      >
                        {t(
                          "page.legalModal.privacyStatement.privacy.privacy_para1"
                        )}
                      </p>
                    )}
                    {selectedComponent === "NoticeTakeDown" && (
                      <p
                        className={`${t(
                          "page.legalModal.textsizes.textsize2"
                        )} leading-5`}
                      >
                        {t("page.legalModal.noticePolicy.content.para1")}
                      </p>
                    )}
                    {selectedComponent === "AdvertisingTerms" && (
                      <p
                        className={`${t(
                          "page.legalModal.textsizes.textsize2"
                        )} leading-5`}
                      >
                        {t("page.legalModal.advertisementTerms.terms.para")}
                      </p>
                    )}
                  </>
                </div>
              </div>

              {/* Navabr */}
              <div
                className={`flex  gap-y-3 3xl:gap-y-4 flex-col items-end ${t(
                  "page.legalModal.textsizes.textsize3"
                )}`}
              >
                <div className="flex cursor-pointer items-center justify-between gap-x-2">
                  <img
                    src="/assets/arrowDown.svg"
                    alt="arrow"
                    className={`w-2 3xl:w-4 rotate-90 ${
                      selectedComponent === "TermsOfService"
                        ? "block"
                        : "hidden"
                    }`}
                  />
                  <p
                    onClick={() => handleNavItemClick("TermsOfService")}
                    className={` uppercase
                    ${
                      selectedComponent === "TermsOfService"
                        ? "opacity-100"
                        : "opacity-50"
                    }`}
                  >
                    {t("page.legalModal.links.termsOfServices")}
                  </p>
                </div>

                <div className="flex cursor-pointer items-center justify-between gap-x-2">
                  <img
                    src="/assets/arrowDown.svg"
                    alt="arrow"
                    className={`w-2 3xl:w-4 rotate-90 ${
                      selectedComponent === "PrivacyStatement"
                        ? "block"
                        : "hidden"
                    }`}
                  />
                  <p
                    onClick={() => handleNavItemClick("PrivacyStatement")}
                    className={` uppercase
                    ${
                      selectedComponent === "PrivacyStatement"
                        ? "opacity-100"
                        : "opacity-50"
                    }`}
                  >
                    {t("page.legalModal.links.privacyStatement")}
                  </p>
                </div>
                <div className="flex cursor-pointer items-center justify-between gap-x-2">
                  <img
                    src="/assets/arrowDown.svg"
                    alt="arrow"
                    className={`w-2 3xl:w-4 rotate-90 ${
                      selectedComponent === "NoticeTakeDown"
                        ? "block"
                        : "hidden"
                    }`}
                  />
                  <p
                    onClick={() => handleNavItemClick("NoticeTakeDown")}
                    className={`uppercase
                    ${
                      selectedComponent === "NoticeTakeDown"
                        ? "opacity-100"
                        : "opacity-50"
                    }`}
                  >
                    {t("page.legalModal.links.noticePolicy")}
                  </p>
                </div>
                <div className="flex cursor-pointer lg:mb-0 mb-6 items-center justify-between gap-x-2">
                  <img
                    src="/assets/arrowDown.svg"
                    alt="arrow"
                    className={`w-2 3xl:w-4 rotate-90 ${
                      selectedComponent === "AdvertisingTerms"
                        ? "block"
                        : "hidden"
                    }`}
                  />
                  <p
                    onClick={() => handleNavItemClick("AdvertisingTerms")}
                    className={`uppercase  ${
                      selectedComponent === "AdvertisingTerms"
                        ? "opacity-100"
                        : "opacity-50"
                    }`}
                  >
                    {t("page.legalModal.links.advertisingTerms")}
                  </p>
                </div>
              </div>
            </div>

            {/* Rendering components*/}
            {selectedComponent === "TermsOfService" && <TermsOfService />}
            {selectedComponent === "PrivacyStatement" && <PrivacyStatement />}
            {selectedComponent === "NoticeTakeDown" && <NoticeTakeDownPolicy />}
            {selectedComponent === "AdvertisingTerms" && <AdvertisingTerms />}

            {/* footer */}
            <div className="flex items-end justify-end mt-10 md:mb-0 mb-[1.5rem] lg:mt-40 flex-wrap gap-y-2 relative w-[100%] bottom-0 ">
              <div className="flex items-center justify-center gap-x-4 lg:mb-4 ">
                <a href="#">
                  <img
                    src="/assets/youtube.svg"
                    className="h-[12px] 2xl:h-[16px]  opacity-80  hover:opacity-100 invert"
                    alt="youtube-icon"
                  />
                </a>
                <a href="#">
                  <img
                    src="/assets/vimeo.svg"
                    className="h-[12px] 2xl:h-[16px] opacity-80  hover:opacity-100  invert"
                    alt="vimeo-icon"
                  />
                </a>
                <a href="https://twitter.com/zimogroup_x" target="_blank">
                  <img
                    src="/assets/x.svg"
                    className="h-[12px] 2xl:h-[16px] opacity-80 invert  hover:opacity-100"
                    alt="twitter-icon"
                  />
                </a>
                <a href="http://www.facebook.com/zimogroup" target="_blank">
                  <img
                    src="/assets/FAceBook W.svg"
                    className="h-[12px] 2xl:h-[16px] invert hover:opacity-100 opacity-80"
                    alt=""
                  />
                </a>
                <a
                  href="http://www.instagram.com/zimogroup_official"
                  target="_blank"
                >
                  <img
                    src="/assets/igIcon.png"
                    className="opacity-80 invert  hover:opacity-100 h-[12px] 2xl:h-[16px]"
                    alt="instagram-icon"
                  />
                </a>
                <a href="#" target="_blank">
                  <img
                    src="/assets/tiktok.svg"
                    className="h-[12px] 2xl:h-[16px] opacity-80  invert hover:opacity-100  "
                    alt="tiktok-icon"
                  />
                </a>
                <a href="http://www.pinterest.co.uk/zimogroup" target="_blank">
                  <img
                    src="/assets/pinterest.svg"
                    className=" opacity-80  hover:opacity-100 invert h-[12px] 2xl:h-[16px]"
                    alt="pinterest-icon"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default TermsAndPrivacyMain;
