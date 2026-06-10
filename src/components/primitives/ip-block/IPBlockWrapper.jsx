/* eslint-disable @next/next/no-img-element */

import { AnimatePresence } from "framer-motion";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MoreInformation from "./MoreInformation";

function IPBlockWrapper() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMoreInfo = () => {
    setIsOpen(!isOpen);
  };
  const currentDate = moment().format("DD.MM.YYYY");
  const [currentTime, setCurrentTime] = useState(moment());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000); // Update every second

    // Cleanup function to clear the interval on component unmount
    return () => clearInterval(interval);
  }, []);
  const visitor = useSelector((state) => state?.visitor);
  return (
    <>
      <div
        className={`fixed inset-0 bg-white text-black flex flex-col justify-between`}
      >
        <main className=" p-4 lg:pl-[50px] lg:pr-[30px] lg:pt-6  3xl:pl-[80px] 3xl:pr-[57px] 3xl:pt-[50px]">
          <header className="flex flex-col lg:flex-row justify-between gap-y-4 lg:gap-y-0">
            <div className="flex uppercase w-full lg:w-[52%] 3xl:w-[950px] items-center justify-between lg:mt-4 p-0">
              <p className="text-[30px] lg:text-[60px] 3xl:text-[90px]  tracking-[6px]">
                Access Denied
              </p>
              <img
                className="w-[25px] lg:w-[35px] 3xl:w-[46px]"
                src="/assets/access-denied/location-ip-icon.svg"
                alt="location"
              />
            </div>
            <div
              className={`flex gap-y-2 3xl:gap-y-3 flex-col lg:text-right text-[12px] lg:text-[16px] 3xl:text-[20px] tracking-[2px]`}
            >
              {/* <p className="">ID: 49f55e568bda4a399m21</p> */}
              <p className="uppercase">
                ID:{" "}
                {visitor?.data?.visitor_id &&
                  visitor.data.visitor_id.slice(0, 20)}
              </p>
              <p className="">YOUR IP: {visitor?.data?.ip_address}</p>
              <div className="flex gap-x-4 lg:justify-end ">
                <p>{currentDate}</p>
                <p>{currentTime.format("HH:mm:ss")}</p>
              </div>
            </div>
          </header>

          <div className="mt-8 uppercase  3xl:mt-12 flex gap-y-4 lg:gap-y-8 3xl:gap-y-12 flex-col">
            <p
              className={`text-[12px] lg:text-[16px] 3xl:text-[20px] tracking-[2px] leading-8`}
            >
              YOUR IP ADDRESS HAS BEEN RESTRICTED AND IS CURRENTLY BANNED FROM
              USING OUR SERVICES.
            </p>
            <div className="relative gap-y-4 lg:gap-y-0 flex justify-between items-center flex-col lg:flex-row">
              <div
                className={`flex gap-y-4 lg:gap-y-8 3xl:gap-y-12 flex-col lg:w-[52%] 3xl:w-[790px] text-[12px] lg:text-[16px] 3xl:text-[20px] tracking-[1.5px] `}
              >
                <p className="opacity-50">ERROR CODE: 661</p>
                <div>
                  <p className="leading-8 3xl:leading-[60px]">
                    YOUR IP ADDRESS INDICATES THAT YOU ARE ATTEMPTING TO ACCESS
                    OUR SERVICES. YOU ARE PROHIBITED FROM USING THIS PLATFORM.{" "}
                  </p>
                </div>
                <div>
                  <p className="leading-8 3xl:leading-[60px]">
                    Do you suspect that your IP address has been restricted in
                    error? If so, please contact us at{" "}
                    <span>
                      <a
                        href="mailto:unblock@zimogroup.org?subject= Access Denied"
                        className="opacity-50 cursor-pointer hover:opacity-100"
                      >
                        unblock@zimogroup.org
                      </a>
                    </span>
                    .
                  </p>
                </div>
                <p
                  className="opacity-50 cursor-pointer hover:opacity-100"
                  onClick={toggleMoreInfo}
                >
                  more information
                </p>
              </div>
              <img
                className="w-[75px] lg:w-[200px] 3xl:w-[300px] lg:mr-[80px] 3xl:mr-[143px]"
                src="/assets/access-denied/zimo-warning-exclamation-b.svg"
                alt="warning"
              />
            </div>
          </div>
        </main>
        <footer className="uppercase  p-4 lg:pl-[50px] lg:pb-6 lg:pr-[30px]  3xl:pl-[80px] 3xl:pr-[57px]  3xl:pb-[50px] lg:w-[60%] lg:translate-x-[67.5%] flex justify-between items-end bottom-0">
          <img
            className="w-[110px] md:w-[211px]"
            src="/assets/access-denied/zig-zimo.svg"
            alt="zimogroup"
          />
          <img
            className="w-[100px] md:w-[152px]"
            src="/assets/access-denied/zimo-security.svg"
            alt="zimo-security"
          />
        </footer>
        <AnimatePresence>
          {isOpen && <MoreInformation onClose={toggleMoreInfo} />}
        </AnimatePresence>
      </div>
    </>
  );
}
export default IPBlockWrapper;
