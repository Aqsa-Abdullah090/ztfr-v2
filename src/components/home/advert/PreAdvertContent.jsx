/* eslint-disable @next/next/no-img-element */
"use client";

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
} from "../../../store/features/pip.slice";

import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import RandomizedAudioWaveAnimation from "./RandomizedAudioWaveAnimation";

function PreAdvertContent() {
  const searchParams = useSearchParams();
  const videoRef = useRef(null);
  const dispatch = useDispatch();

  // ---------------- Redux ----------------
  const bgData = useSelector((state) => state?.bg?.data || []);
  const dynamicVideos = bgData.filter((item) => item?.type === "video");
  const dynamicImages = bgData.filter((item) => item?.type === "image");

  const { indexForVideo } = useSelector((state) => state.meta);
  const bgVideo = useSelector((state) => state.bg.bgVideo);

 const enabled = useSelector((state) => state?.pip?.enabled);
const pipClickCount = useSelector((state) => state?.pip?.pipClickCount);

  // ---------------- State ----------------
  const [isVideoEnd, setIsVideoEnd] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const [isShowSecondImage, setIsShowSecondImage] = useState(false);
  const [isShowText, setIsShowText] = useState(false);
  const [isShowVideo, setIsShowVideo] = useState(false);
  const [isShowZigLogo, setIsShowZigLogo] = useState(false);

  const [foundVideo, setFoundVideo] = useState(null);

  // ---------------- Query Param ----------------
  const videoId = searchParams.get("videoId");

  const randomIndex = Math.floor(Math.random() * (dynamicVideos?.length || 1));
  const randomIndexForImage = Math.floor(
    Math.random() * (dynamicImages?.length || 1)
  );

  // ---------------- Find Video ----------------
  useEffect(() => {
    if (!videoId || !dynamicVideos.length) return;

    try {
      const decodedId = atob(videoId);
      const match = dynamicVideos.find((v) => v.id == decodedId);
      setFoundVideo(match || null);
    } catch (err) {
      console.error("Invalid videoId:", err);
    }
  }, [videoId, dynamicVideos]);

  // ---------------- Start Video ----------------
  useEffect(() => {
    setIsShowVideo(true);
    dispatch(setIsActualVideoPlaying(true));
  }, [dispatch]);

  // ---------------- Reset BG Image ----------------
  useEffect(() => {
    dispatch(setBgImage(null));
  }, [dispatch]);

  // ---------------- Video End Check ----------------
  useEffect(() => {
    if (indexForVideo === dynamicVideos.length) {
      setIsVideoEnd(true);
      dispatch(setVideoPlaying(false));
    }
  }, [indexForVideo, dynamicVideos.length, dispatch]);

  // ---------------- Mute Toggle ----------------
  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  // ---------------- Handle Video End ----------------
  const handleVideoEnd = () => {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    }

    dispatch(setShow(false));
    setIsShowSecondImage(false);
    setIsShowText(false);
    setIsShowVideo(false);
    setIsShowZigLogo(false);

    dispatch(setIsActualVideoPlaying(false));
    dispatch(setIsVideoPlaying(false));
    dispatch(setVideoPlaying(false));
    dispatch(setBgVideo(null));

    dispatch(incIndexForBgImage(randomIndexForImage));
    dispatch(incVideoIndex(randomIndex));
    dispatch(incCurrent());

    if (foundVideo) {
      window.location.href = "/";
    }
  };

  // ---------------- Play Video Source ----------------
  const playVideo = () => {
    if (foundVideo) return foundVideo.url;

    if (bgVideo) return bgVideo;

    return dynamicVideos?.[indexForVideo]?.url || null;
  };

  // ---------------- Picture in Picture ----------------
  const togglePictureInPicture = () => {
    try {
      if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
      } else {
        videoRef.current?.requestPictureInPicture();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // ---------------- Tab Visibility PIP ----------------
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (
        document.visibilityState === "hidden" &&
        videoRef.current &&
        !document.pictureInPictureElement
      ) {
        // videoRef.current.requestPictureInPicture();
        
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
  }, []);

  // ---------------- PIP Events ----------------
  useEffect(() => {
    const video = document.getElementById("advert-video");

    if (!video || !isShowVideo) return;

    const enter = () => dispatch(changePipState(true));
    const leave = () => dispatch(changePipState(false));

    video.addEventListener("enterpictureinpicture", enter);
    video.addEventListener("leavepictureinpicture", leave);

    return () => {
      video.removeEventListener("enterpictureinpicture", enter);
      video.removeEventListener("leavepictureinpicture", leave);
    };
  }, [isShowVideo, dispatch]);

  // ---------------- Auto Resume ----------------
  useEffect(() => {
    if (!enabled && videoRef.current) {
      videoRef.current.play();
    }
  }, [enabled]);

  // ---------------- External PIP Trigger ----------------
  useEffect(() => {
    if (pipClickCount > 0) {
      togglePictureInPicture();
    }
  }, [pipClickCount]);

  // ---------------- UI ----------------
  return (
    <>
      {/* Video Layer */}
      {isShowVideo && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute top-0 left-0 w-full h-full bg-black z-50 flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-black opacity-20" />

          <video
            id="advert-video"
            ref={videoRef}
            autoPlay
            muted={isMuted}
            playsInline
            onPlay={() => dispatch(setIsVideoPlaying(true))}
            onEnded={handleVideoEnd}
            onPause={() => videoRef.current?.play()}
            poster="/assets/black.jpg"
            src={playVideo()}
            className="w-full h-full object-cover"
          />

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