/* eslint-disable @next/next/no-img-element */
import Marquee from "react-fast-marquee";
import { IMAGES } from "./media";
import clsx from "clsx";
import { renderVideo } from "@/src/store/features/advertising.slice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { removeTracking } from "@/lib/helper";
import VideosPlaceholder from "./VideosPlaceholder";

function Videos() {
  // translation hook
  const { t } = useTranslation();
  // the format should be row,index e.g 1,0 or 1,2 etc
  const [activeVideoIndex, setActiveVideoIndex] = useState(null);

  // store
  const { videos } = useSelector((state) => state.advertising);
  const dispatch = useDispatch();

  const handleVideoHover = (rowAndIndex) => {
    setActiveVideoIndex(rowAndIndex);
  };

  const handleVideoLeave = () => {
    setActiveVideoIndex(null);
  };

  return (
    <div className="my-8 3xl:my-16">
      <div className="px-2 lg:px-6 ">
        <div className="lg:text-center">
          <h2
            className={clsx(
              "font-light text-[18px] lg:text-[35px] 3xl:text-[50px]",
              localStorage.getItem("language") === "NL" ||
                localStorage.getItem("language") === "IT" ||
                localStorage.getItem("language") === "ES"
                ? "tracking-[3px] 3xl:tracking-[4px]"
                : localStorage.getItem("language") === "FR"
                ? "tracking-[3px] 3xl:tracking-[4px]"
                : localStorage.getItem("language") === "DE" ||
                  localStorage.getItem("language") === "PT"
                ? "tracking-[2px] 3xl:tracking-[4px]"
                : localStorage.getItem("language") === "PL" ||
                  localStorage.getItem("language") === "SE"
                ? "tracking-[1.5px]"
                : localStorage.getItem("language") === "en" ||
                  localStorage.getItem("language") === "PH" ||
                  localStorage.getItem("language") === "TR" ||
                  localStorage.getItem("language") === "CZ" ||
                  localStorage.getItem("language") === "DK" ||
                  localStorage.getItem("language") === "NO" ||
                  localStorage.getItem("language") === "RU" ||
                  localStorage.getItem("language") === null
                ? "tracking-[4px]"
                : "tracking-normal"
            )}
          >
            {/* OUR ADVERTS ARE MORE THAN JUST {"'ADS'"} */}
            {t(
              "page.sidemenu.advertisingSection.videos.ourAdvertsAreJustMoreThan"
            )}
          </h2>
          <p
            className={`${
              localStorage.getItem("language") === "AE" && "whitespace-pre-wrap"
            } mt-2 3xl:mt-3 text-[14px] lg:text-[20px] 3xl:text-[30px] `}
          >
            {/* IMPRESSIONS {"DON'T"} ALWAYS INSPIRE. INSPIRE ONCE, INSPIRED FOR LIFE. */}
            {t(
              "page.sidemenu.advertisingSection.videos.impressionsDontAlwaysInspires"
            )}
          </p>
        </div>

        <p
          className={`my-3 3xl:my-4 text-[12px] lg:text-[16px] 3xl:text-[22px] `}
        >
          {/* Video */}
          {t("page.sidemenu.advertisingSection.videos.video")}
        </p>
      </div>

      <section>
        {/* 1st */}
        {videos.length ? (
          <Marquee pauseOnHover autoFill>
            {videos.map((video, i) => (
              <div
                key={i}
                className={clsx(
                  "relative",
                  activeVideoIndex !== null && activeVideoIndex !== `1,${i}`
                    ? "opacity-25"
                    : ""
                )}
                onMouseEnter={() => handleVideoHover(`1,${i}`)}
                onMouseLeave={handleVideoLeave}
                onClick={() => {
                  dispatch(renderVideo(video.url));
                }}
              >
                <video
                  className="w-[284px] h-[160px] lg:w-[355px] lg:h-[200px] 3xl:h-[358px] 3xl:w-[636px] object-cover mx-2 rounded-2xl transition-all duration-300 cursor-pointer"
                  src={video.mobile_video}
                  poster={video.video_poster}
                  muted
                  loop
                  autoPlay
                />
                <img
                  src={IMAGES.modal_card}
                  alt=""
                  className="w-[50px] lg:w-[100px] 3xl:w-[163px] absolute top-1/2 -translate-y-1/2 left-4 3xl:left-8"
                />
              </div>
            ))}
          </Marquee>
        ) : (
          <VideosPlaceholder />
        )}
        {/* 2nd */}
        {videos.length ? (
          <Marquee pauseOnHover autoFill className="my-4" direction="right">
            {videos.map((video, i) => (
              <div
                key={i}
                className={clsx(
                  "relative",
                  activeVideoIndex !== null && activeVideoIndex !== `2,${i}`
                    ? "opacity-25"
                    : ""
                )}
                onMouseEnter={() => handleVideoHover(`2,${i}`)}
                onMouseLeave={handleVideoLeave}
                onClick={() => {
                  dispatch(renderVideo(video.url));
                }}
              >
                <video
                  className="w-[284px] h-[160px] lg:w-[355px] lg:h-[200px] 3xl:h-[358px] 3xl:w-[636px] object-cover mx-2 rounded-2xl transition-all duration-300 cursor-pointer"
                  src={video.mobile_video}
                  poster={video.video_poster}
                  muted
                  loop
                  autoPlay
                />
                <img
                  src={IMAGES.modal_card}
                  alt=""
                  className="w-[50px] lg:w-[100px] 3xl:w-[163px] absolute top-1/2 -translate-y-1/2 left-4 3xl:left-8"
                />
              </div>
            ))}
          </Marquee>
        ) : (
          <VideosPlaceholder direction="right" />
        )}
        {/* 3rd */}
        {videos.length ? (
          <Marquee pauseOnHover autoFill>
            {videos.map((video, i) => (
              <div
                key={i}
                className={clsx(
                  "relative",
                  activeVideoIndex !== null && activeVideoIndex !== `3,${i}`
                    ? "opacity-25"
                    : ""
                )}
                onMouseEnter={() => handleVideoHover(`3,${i}`)}
                onMouseLeave={handleVideoLeave}
                onClick={() => {
                  dispatch(renderVideo(video.url));
                }}
              >
                <video
                  className="w-[284px] h-[160px] lg:w-[355px] lg:h-[200px] 3xl:h-[358px] 3xl:w-[636px] object-cover mx-2 rounded-2xl transition-all duration-300 cursor-pointer"
                  src={video.mobile_video}
                  poster={video.video_poster}
                  muted
                  loop
                  autoPlay
                />
                <img
                  src={IMAGES.modal_card}
                  alt=""
                  className="w-[50px] lg:w-[100px] 3xl:w-[163px] absolute top-1/2 -translate-y-1/2 left-4 3xl:left-8"
                />
              </div>
            ))}
          </Marquee>
        ) : (
          <VideosPlaceholder />
        )}
      </section>
    </div>
  );
}
export default Videos;
