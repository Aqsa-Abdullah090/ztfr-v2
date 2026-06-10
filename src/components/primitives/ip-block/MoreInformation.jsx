/* eslint-disable @next/next/no-img-element */
import React from "react";
import { motion } from "framer-motion";
import { removeTracking } from "@/lib/helper";
import { useSelector } from "react-redux";

const MoreInformation = ({ onClose }) => {
  const visitor = useSelector((state) => state?.visitor);
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
    <motion.section
      initial={isMobile ? initialAnimation.mobile : initialAnimation.desktop}
      whileInView={isMobile ? inViewAnimation.mobile : inViewAnimation.desktop}
      exit={isMobile ? initialAnimation.mobile : initialAnimation.desktop}
      transition={{ duration: 0.5 }}
      className="h-[100dvh] absolute top-0 lg:translate-y-[-50%] pb-4 lg:pb-0 overflow-y-scroll overflow-x-hidden   right-0 w-screen 2xl:w-[960px] 4xl:w-[50%] lg:w-[685px] bg-black bg-opacity-90   z-[300] flex flex-col justify-between "
    >
      <div
        className={`text-white uppercase pl-[25px] pt-[15px] pb-[15px] 3xl:pt-[25px] pr-[50px] 3xl:pb-[50px] `}
      >
        <header className="flex justify-between items-center">
          <div
            className={`flex flex-col gap-y-4 3xl:gap-y-8  text-[12px] lg:text-[16px] 3xl:text-[20px] ${
              !removeTracking() ? "tracking-normal" : "tracking-[2px]"
            }`}
          >
            <p
              onClick={onClose}
              className="cursor-pointer opacity-50 hover:opacity-100"
            >
              close
            </p>
            <p className="opacity-50">More information</p>
          </div>
          <img
            src="/assets/access-denied/zimo-security.svg"
            alt="zimo-security"
            className="w-[100px] 3xl:w-[152px] invert"
          />
        </header>
        <main
          className={`w-[97%] 3xl:w-[841px] mt-6 3xl:mt-[62px] text-[10px] lg:text-[12px] flex flex-col gap-y-9 3xl:gap-y-10 tracking-[0.5px]`}
        >
          <div>
            <p className="leading-5">
              When an IP address is banned, it means that ZIMO SECURITY has
              restricted access from that particular IP address. This could
              happen for several reasons:
            </p>
          </div>
          <div className="flex flex-col gap-y-5">
            <p>Violation of Terms of Service:</p>
            <p className="leading-5">
              The user associated with the IP address may have violated the
              terms of service of our platform, website, application, or online
              service(s). This violation could range from spamming, abusive
              behaviour, hacking attempts, or any other activity deemed
              unacceptable by ZIMO GROUP.
            </p>
          </div>
          <div className="flex flex-col gap-y-5">
            <p>Security Concerns:</p>
            <p className="leading-5">
              The IP address might have been identified as a source of malicious
              activity, such as attempting to breach security measures,
              conducting a denial-of-service (DoS) attack, or participating in
              other forms of cybercrime.
            </p>
          </div>
          <div className="flex flex-col gap-y-5">
            <p>Protection against Abuse:</p>
            <p className="leading-5">
              ZIMO SECURITY might ban IP addresses to protect our systems from
              abuse. For example, if we notice unusual traffic patterns or
              suspicious behaviour originating from a particular IP address, we
              may block it to prevent further harm.
            </p>
          </div>
          <div className="flex flex-col gap-y-5">
            <p>Compliance Reasons:</p>
            <p className="leading-5">
              In some cases, IP addresses may be banned due to legal or
              regulatory requirements. This could involve compliance with
              government regulations or international laws.
            </p>
          </div>
          <div className="flex flex-col gap-y-5">
            <p>Content Restrictions:</p>
            <p className="leading-5">
              Our platforms, websites, applications or online services may
              restrict access based on geographical location or other factors.
              This could result in specific IP addresses being banned from
              accessing content.
            </p>
          </div>
          <div className="flex flex-col gap-y-5">
            <p className="leading-5">
              When an IP address is banned, the user associated with that IP
              address will typically find that they are unable to access the
              affected platforms, websites, applications or services. Depending
              on the severity of the situation, the ban could be temporary or
              permanent. Users who believe their IP address has been banned
              unfairly can contact ZIMO SECURITY to appeal the ban or take steps
              to resolve the issue that led to the ban in the first place.
            </p>
            <p>
              <span>
                <a
                  href="mailto:unblock@zimogroup.org?subject= Access Denied"
                  className="cursor-pointer opacity-50 hover:opacity-100"
                >
                  unblock@zimogroup.org
                </a>
              </span>
            </p>
          </div>
        </main>
        <footer className="flex justify-end bottom-0 mt-2 lg:mt-1">
          <p
            className={`text-[10px] lg:text-[12px] ${
              !removeTracking() ? "tracking-normal" : "tracking-[2px]"
            }`}
          >
            YOUR IP: {visitor?.data?.ip_address}
          </p>
        </footer>
      </div>
    </motion.section>
  );
};

export default MoreInformation;
