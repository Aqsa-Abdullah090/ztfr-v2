import { setHoverMain } from "../../store/features/bgSlice";
import {
  incCurrent,
  incOlympicsState,
  setIsActualVideoPlaying,
  setIsImageInBackground,
  setOlympicsPicture,
  setOlympicsVideo,
  setShow,
  setVideoPlaying,
} from "../../store/features/metadata";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// update the current state of META every n seconds
function MetaHandler() {
  const dispatch = useDispatch();
  const { isVideoPlaying, indexForVideo, olympicsState, olympicsPicture } =
    useSelector((state) => state.meta);
  const bgData = useSelector((state) => state?.bg?.data);

  const dynamicVideos = bgData?.filter((video) => video?.type === "video");
  const dynamicImages = bgData?.filter((image) => image?.type === "image");

  const randomIndexForImage = Math.floor(Math.random() * dynamicImages?.length);

  useEffect(() => {
    const olympicsInterval = setInterval(() => {
      if (olympicsPicture) {
        dispatch(setVideoPlaying(true));
        dispatch(setOlympicsPicture(false));
        dispatch(setOlympicsVideo(false));
        dispatch(incOlympicsState());
        dispatch(setIsActualVideoPlaying(false));
        dispatch(setIsImageInBackground(false));
        dispatch(setShow(false));
      }
    }, 30000);

    const updateMeta = setInterval(() => {
      if (!isVideoPlaying) {
        // dispatch(setOlympicsInBg(false));
        // dispatch(incIndexForBgImage(randomIndexForImage));
        // dispatch(setIsActualVideoPlaying(false));
        dispatch(incCurrent());
        dispatch(setHoverMain(false));
      }
    }, 10000); //10 sec

    const moveToBgImage = setInterval(() => {
      if (!isVideoPlaying) {
        // dispatch(incCurrent());
        // dispatch(incIndexForBgImage(randomIndexForImage));

        dispatch(setIsActualVideoPlaying(false));
        dispatch(setHoverMain(false));
        dispatch(setVideoPlaying(false));
        dispatch(setIsImageInBackground(true));
        dispatch(incCurrent());
      }
    }, 20000); //20 sec

    const moveToVideo = setInterval(() => {
      if (indexForVideo - 1 < dynamicVideos.length) dispatch(incCurrent());
      dispatch(setIsImageInBackground(false));
      dispatch(setIsActualVideoPlaying(false));
      dispatch(setVideoPlaying(true));
      dispatch(setHoverMain(false));
      dispatch(incCurrent());
    }, 60000); //60 sec

    return () => {
      clearInterval(updateMeta);
      clearInterval(moveToBgImage);
      clearInterval(moveToVideo);
      clearInterval(olympicsInterval);
    };
  }, [dynamicVideos?.length, indexForVideo, isVideoPlaying, olympicsPicture]);
  return null;
}

export default MetaHandler;
