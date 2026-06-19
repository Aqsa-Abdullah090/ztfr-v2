import { metaData } from "../../lib/colorsData";
import { createSlice } from "@reduxjs/toolkit";
// import metaData, { advertVideosPath, bgImagePath } from "../../../lib/metaData";

const metadata = createSlice({
  name: "meta",
  initialState: {
    sidebarstate: "off",
    // infinite number
    number: 0,
    // represents the current index of metaData array
    index: 0,
    bgSliderImage: null,
    isVideoPlaying: true,
    olympicsPicture: false,
    show: false,
    olympicsVideo: false,
    olympicsState: 1,
    indexForVideo: Math.floor(Math.random() * 10),
    // only true, when the video file from firebase URL is playing, it also will be false when intro video is playing
    isActualVideoPlaying: false,
    isImageInBackground: false,
    indexForBgImajge: Math.floor(Math.random() * 10),
    boundsForThirdModal: {
      left: 0,
      top: 0,
    },
    windowDimensions: {
      width: 0,
      height: 0,
    },
    mymetadata: [
      {
        headerlogo: "assets/ZTFR.png",
        mainlogo: "assets/LETSDOTHIS.png",
        mainlogosub: "assets/MAINLOGOSUBHEADING.png",
      },
      {
        headerlogo: "assets/ZTFR.png",
        mainlogo: "assets/LETSDOTHIS.png",
        mainlogosub: "assets/MAINLOGOSUBHEADING.png",
      },
    ],
  },
  reducers: {
    setWindowDimensions: (state, action) => {
      state.windowDimensions = action.payload;
    },
    setBoundForThirdModal: (state, action) => {
      state.boundsForThirdModal = action.payload;
    },
    incIndexForBgImage: (state, action) => {
      state.indexForBgImage = action.payload;
    },
    setIsImageInBackground: (state, action) => {
      state.isImageInBackground = action.payload;
    },
    setOlympicsPicture: (state, action) => {
      state.olympicsPicture = action.payload;
    },
    setOlympicsVideo: (state, action) => {
      state.olympicsVideo = action.payload;
    },
    setShow: (state, action) => {
      state.show = action.payload;
    },
    incOlympicsState: (state, action) => {
      state.olympicsState += 1;
    },
    resetOlympicsState: (state) => {
      state.olympicsState = 1;
    },
    setVideoPlaying: (state, action) => {
      state.index = 0;
      state.isVideoPlaying = action.payload;
    },
    sidebaropen: (state, action) => {
      state.sidebarstate = action.payload;
    },

    sidebaroff: (state) => {
      state.sidebarstate = state.sidebarstate;
    },
    // incVideoIndex: (state, action) => {
    //   state.indexForVideo++;
    //   if (state.indexForVideo >= advertVideosPath.length) {
    //     state.indexForVideo = state.indexForVideo % advertVideosPath.length;
    //   }
    // },
    incVideoIndex: (state, action) => {
      state.indexForVideo = action.payload;
    },

    incCurrent: (state) => {
      state.number += Math.floor(Math.random() * metaData.length);
      const newIndex = Math.floor(Math.random() * metaData.length);
      if (newIndex === 0) {
        state.index = newIndex + Math.floor(Math.random() * metaData.length);
      } else {
        state.index = newIndex;
      }
    },
    setBgImage: (state, action) => {
      state.bgSliderImage = action.payload;
    },
    setIsActualVideoPlaying: (state, action) => {
      state.isActualVideoPlaying = action.payload; // boolean value
    },
  },
});

export const {
  sidebaropen,
  sidebaroff,
  setOlympicsVideo,
  setOlympicsPicture,
  incCurrent,
  incOlympicsState,
  setOlympicsInBg,
  setVideoPlaying,
  incVideoIndex,
  setIsImageInBackground,
  incIndexForBgImage,
  setBoundForThirdModal,
  setShow,
  setWindowDimensions,
  resetOlympicsState,
  setBgImage,
  setIsActualVideoPlaying,
} = metadata.actions;

export default metadata.reducer;
