/* eslint-disable @next/next/no-img-element */
import { setBgVideo } from "../../../store/features/bgSlice";
import {
  incCurrent,
  incIndexForBgImage,
  incVideoIndex,
  setBgImage,
  setIsActualVideoPlaying,
  setShow,
  setVideoPlaying,
} from "../../../store/features/metadata";
import {
  changePipState,
  setIsVideoPlaying,
} from "@/src/store/features/pip.slice";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RandomizedAudioWaveAnimation from "./RandomizedAudioWaveAnimation";

function PreAdvertContent() {
  const router = useRouter();
  const videoRef = useRef(null);
  const bgData = useSelector((state) => state?.bg?.data);
  const dynamicVideos = bgData?.filter((video) => video?.type === "video");
  const dynamicImages = bgData?.filter((image) => image?.type === "image");
  const { indexForVideo, isActualVideoPlaying } = useSelector(
    (state) => state.meta
  );
  const dispatch = useDispatch();
  const [isVideoEnd, setIsVideoEnd] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const bgVideo = useSelector((state) => state.bg.bgVideo);
  const [isShowSecondImage, setIsShowSecondImage] = useState(false);
  const [isShowText, setIsShowText] = useState(false);
  const [isShowVideo, setIsShowVideo] = useState(false);
  const [isShowZigLogo, setIsShowZigLogo] = useState(false);
  const { videoId } = router.query;
  const [foundVideo, setFoundVideo] = useState(null);
  const randomIndex = Math.floor(Math.random() * dynamicVideos?.length);
  const randomIndexForImage = Math.floor(Math.random() * dynamicImages?.length);
  // state to render PIP
  const { enabled, pipClickCount } = useSelector((state) => state.pip);

  useEffect(() => {
    if (videoId) {
      const id = atob(videoId);
      const founded = dynamicVideos.find((video) => video.id == id);
      setFoundVideo(founded);
    }
  }, [videoId]); // Effect runs when videoId changes

  useEffect(() => {
    // setIsShowZigLogo(true);
    // const timer1 = setTimeout(() => {
    //   setIsShowSecondImage(true);
    // }, 4000);
    // const timer2 = setTimeout(() => {
    //   setIsShowText(true);
    // }, 8000);
    // const timer3 = setTimeout(() => {
    //   setIsShowVideo(true);
    //   dispatch(setIsActualVideoPlaying(true));
    // }, 8000);

    setIsShowVideo(true);
    dispatch(setIsActualVideoPlaying(true));

    // return () => {
    //   // clearTimeout(timer1);
    //   // clearTimeout(timer2);
    //  // clearTimeout(timer3);
    // };
  }, []);

  useEffect(() => {
    dispatch(setBgImage(null));
  }, [dispatch]);

  useEffect(() => {
    if (indexForVideo === dynamicVideos?.length) {
      setIsVideoEnd(true);
      dispatch(setVideoPlaying(false));
    }
  }, [indexForVideo]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleVideoEnd = () => {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    }
    dispatch(setShow(false));
    setIsShowSecondImage(false);
    setIsShowText(false);
    setIsShowVideo(false);
    dispatch(setIsActualVideoPlaying(false));
    setIsShowZigLogo(false);
    dispatch(setIsVideoPlaying(false));
    dispatch(setVideoPlaying(false));
    dispatch(setBgVideo(null));
    dispatch(incIndexForBgImage(randomIndexForImage));
    dispatch(incVideoIndex(randomIndex));
    dispatch(incCurrent());

    if (foundVideo) {
      router.replace("/");
    }
  };

  const playVideo = () => {
    if (foundVideo) {
      return foundVideo.url;
    } else {
      return (
        bgVideo ||
        (dynamicVideos[indexForVideo]
          ? dynamicVideos[indexForVideo]?.url
          : null)
      );
    }
  };

  // picture in picture
  const togglePictureInPicture = () => {
    try {
      if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
      } else {
        videoRef.current.requestPictureInPicture();
      }
    } catch (e) {
      console.clear();
    }
  };

  // // toggle picture in picture when user switch tab
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (
        document.visibilityState === "hidden" &&
        videoRef.current &&
        !document.pictureInPictureElement
      ) {
        videoRef.current.requestPictureInPicture();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // handle picture in picture event
  useEffect(() => {
    const video = document.getElementById("advert-video");

    if (video && isShowVideo) {
      const handleEnterPictureInPicture = () => {
        dispatch(changePipState(true));
      };

      const handleLeavePictureInPicture = () => {
        dispatch(changePipState(false));
      };

      video.addEventListener(
        "enterpictureinpicture",
        handleEnterPictureInPicture
      );
      video.addEventListener(
        "leavepictureinpicture",
        handleLeavePictureInPicture
      );

      return () => {
        video.removeEventListener(
          "enterpictureinpicture",
          handleEnterPictureInPicture
        );
        video.removeEventListener(
          "leavepictureinpicture",
          handleLeavePictureInPicture
        );
      };
    }
  }, [isShowVideo]);

  // pipture in picture video pause fix when cross clicked
  useEffect(() => {
    if (!enabled) {
      if (videoRef?.current?.pause) {
        videoRef?.current?.play();
      }
    }
  }, [enabled]);

  // replacement for button click
  useEffect(() => {
    if (pipClickCount > 0) {
      togglePictureInPicture();
    }
  }, [pipClickCount]);

  return (
    <>
      {isShowZigLogo && (
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 4 }}
          className="absolute top-0 overflow-hidden left-0 bg-black z-0 flex items-center justify-center w-full h-full"
        >
          <img
            src="/assets/ZitransferZigZag.svg"
            className="w-32 opacity-0 fade-in-and-out"
            alt=""
          />
        </motion.section>
      )}
      {isShowSecondImage && (
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 4 }}
          className="absolute top-0 overflow-hidden left-0 bg-black z-28 flex items-center justify-center w-full h-full"
        >
          <img
            src="/assets/ZIMO.svg"
            className="w-32 opacity-0 fade-in-and-out"
            alt=""
          />
        </motion.section>
      )}
      {isShowText && (
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 4 }}
          className={`absolute top-0 overflow-hidden left-0 bg-black z-28 flex items-center justify-center w-full h-full`}
        >
          <p className="text-3xl opacity-0 fade-in-and-out tracking-widest text-white uppercase">
            Presents
          </p>
        </motion.section>
      )}
      {isShowVideo && (
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 4 }}
          className="absolute top-0 overflow-hidden fade-in-video object-cover bg-black left-0 z-28 flex items-center justify-center w-full h-full"
        >
          <div className="h-screen w-screen fixed inset-0 bg-black opacity-[20%]" />

          <video
            id="advert-video"
            onPlay={() => dispatch(setIsVideoPlaying(true))}
            ref={videoRef}
            onEnded={handleVideoEnd}
            autoPlay
            muted={isMuted}
            playsInline
            onPause={() => {
              videoRef.current.play();
            }}
            poster="/assets/black.jpg"
            // loop
            className={`object-cover w-full h-full bg-black`}
            src={playVideo()}
            // src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            // playVideo()
            // src="/assets/countdown.mp4"
          />
          {/* <div
            onClick={toggleMute}
            className={`absolute top-[72px] 3xl:top-[92px] z-50 cursor-pointer right-6 animate__transition transition-colors`}
          >
            <img
              src={
                !isMuted ? "/assets/UnmuteVolume.svg" : "/assets/MuteVolume.svg"
              }
              alt="mute and unmute icon  "
              className={clsx(
                "w-[20px] 3xl:w-[25px] cursor-pointer ",
                !isShowVideo && "hidden"
              )}
            />
          </div> */}
          <RandomizedAudioWaveAnimation
            toggleMute={toggleMute}
            isMuted={isMuted}
            isShowVideo={isShowVideo}
          />
        </motion.section>
      )}
    </>
  );
}

export default memo(PreAdvertContent);
