import clsx from "clsx";

const RandomizedAudioWaveAnimation = ({ toggleMute, isShowVideo, isMuted }) => {
  if (!isShowVideo) return null;

  return (
    <div
      className={clsx(
        "audio__wave__animation__wrapper absolute right-5 top-20 lg:right-6 lg:top-20 3xl:top-28 z-50",
        isMuted ? "opacity-25" : "opacity-100"
      )}
      onClick={toggleMute}
    >
      <ul className="bars">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
};

export default RandomizedAudioWaveAnimation;
