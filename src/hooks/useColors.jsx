import { metaData } from "@/lib/colorsData";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const useColors = () => {
  const currentIndex = useSelector((state) => state.meta.index);
  const currentVidoeIndex = useSelector((state) => state.meta.indexForBgImage);
  const {
    isImageInBackground,
    isVideoPlaying,
    indexForBgImage,
    bgSliderImage,
    olympicsPicture,
    olympicsVideo,
  } = useSelector((state) => state.meta);
  const { data } = useSelector((state) => state?.bg);
  const dynamicImages = data?.filter((image) => image?.type === "image");

  // Ensure currentIndex is within valid range
  const normalizedIndex = currentIndex % metaData.length;
  // console.log("metaData:", metaData);
  // if (normalizedIndex < 0 || normalizedIndex >= metaData.length) {
  //   console.error("Normalized index out of range:", normalizedIndex);

  //   return null; // or handle the error appropriately
  // }
  const {
    background_color,
    text_color,
    hover_color,
    svg_color,
    primary_color,
    secondary_color,
  } = metaData[normalizedIndex];
  // console.log("background_color:", background_color); // Check if this is undefined
  // console.log("Background color at index 168:", metaData[168]);
  // console.log("Background color at index 175:", metaData[175]);

  if (olympicsPicture) {
    return {
      background_color: `bg_white`,
      text_color: `black`,
      svg_color: "#000000",
      hover_color: "text_white",
      primary_color: "text_black",
      secondary_color: "#FFFFFF",
    };
  }
  if (isImageInBackground) {
    const currentImage = dynamicImages[indexForBgImage];
    const image_theme_color = bgSliderImage
      ? bgSliderImage.theme_name.toLowerCase()
      : currentImage?.theme_name.toLowerCase();
    const image_model_color = bgSliderImage
      ? bgSliderImage.model_color
      : currentImage?.model_color;
    // console.log("theme_color", image_theme_color);
    // console.log("model_color", image_model_color);
    // console.log(bgSliderImage);
    // console.log("true image");
    return {
      background_color: `bg_${image_theme_color}`,
      text_color:
        image_theme_color == "yellow"
          ? "text_yellow"
          : image_theme_color == "gold"
          ? "text_golden"
          : image_theme_color == "white"
          ? "text_white"
          : image_theme_color == "red"
          ? "text_red"
          : image_theme_color == "purple"
          ? "text_purple"
          : image_theme_color == "green"
          ? "text_green"
          : image_theme_color == "cyan"
          ? "text_cyan"
          : "text_black",
      svg_color:
        image_theme_color == "yellow"
          ? "#FFFF00"
          : image_theme_color == "gold"
          ? "#BE9F56"
          : image_theme_color == "white"
          ? "#FFFFFF"
          : image_theme_color == "red"
          ? "#990000"
          : image_theme_color == "purple"
          ? "#330033"
          : image_theme_color == "green"
          ? "#003300"
          : image_theme_color == "cyan"
          ? "#00ffff"
          : "#000000",
      primary_color,
      secondary_color:
        image_model_color == "yellow"
          ? "#FFFF00"
          : image_model_color == "gold"
          ? "#BE9F56"
          : image_model_color == "white"
          ? "#FFFFFF"
          : image_model_color == "red"
          ? "#990000"
          : image_model_color == "purple"
          ? "#330033"
          : image_model_color == "green"
          ? "#003300"
          : image_model_color == "cyan"
          ? "#00ffff"
          : image_model_color == "whiteVariant"
          ? "#F9FAF5"
          : image_model_color == "brownVariant"
          ? "#A96932"
          : image_model_color == "blueVariant"
          ? "#06465C"
          : image_model_color == "pinkishVariant"
          ? "#FBF4E1"
          : image_model_color == "grayVariant"
          ? "#EAEAEA"
          : image_model_color == "aquaVariant"
          ? "#396468"
          : image_model_color == "whiteVariant2"
          ? "#F4F5F7"
          : image_model_color == "blueVariant2"
          ? "#1C1A2F"
          : image_model_color == "darkGrayVariant"
          ? "#333333"
          : image_model_color == "peachVariant"
          ? "#F8D7B8"
          : image_model_color == "goldenVariant"
          ? "#DCA401"
          : image_model_color == "tooLightBlue"
          ? "#DBE8EE"
          : image_model_color == "blueAnotherVariant"
          ? "#1B3B51"
          : image_model_color == "magentaVariant"
          ? "#4C313B"
          : image_model_color == "blueAnotherVariant2"
          ? "#1E2C46"
          : image_model_color == "tooLightBlue2"
          ? "#C1DDE1"
          : image_model_color == "darkBlueVariant"
          ? "#1A424C"
          : image_model_color == "darkGreenVariant"
          ? "#0F1D08"
          : image_model_color == "beigeVariant"
          ? "#B09E94"
          : image_model_color == "blueAnotherVariant3"
          ? "#02213E"
          : image_model_color == "purpleVariant"
          ? "#4E3956"
          : image_model_color == "yellowAnotherVariant"
          ? "#393931"
          : image_model_color == "tooDarkBlue"
          ? "#121923"
          : image_model_color == "purpleVariant2"
          ? "#43256D"
          : image_model_color == "lightGolden"
          ? "#f0ebd7"
          : image_model_color == "grayBlueVariant"
          ? "#345254"
          : image_model_color == "grayBlueVariant2"
          ? "#022f37"
          : image_model_color == "darkBlueVariant2"
          ? "#182859"
          : image_model_color == "darkGrayVariant"
          ? "#333333"
          : image_model_color == "darkAqua"
          ? "#1a292e"
          : image_model_color == "goldenBlack"
          ? "#191816"
          : image_model_color == "lightRedWine"
          ? "#ac8d95"
          : image_model_color == "seaBlue"
          ? "#27303f"
          : image_model_color == "lightWhite"
          ? "#f6f1de"
          : image_model_color == "lightGrayBlue"
          ? "#384855"
          : image_model_color == "blackVariant"
          ? "#1b1b1d"
          : image_model_color == "brownVariant2"
          ? "#35271C"
          : image_model_color == "brownRedVariant"
          ? "#2F201D"
          : image_model_color == "brownLight"
          ? "#ccb69f"
          : image_model_color == "lightBeige"
          ? "#f6ead2"
          : image_model_color == "skyblueVariant"
          ? "#56b8d5"
          : image_model_color == "grayBrown"
          ? "#474340"
          : image_model_color == "darkGrayBlue"
          ? "#3a4b5b"
          : image_model_color == "lightGreenVariant"
          ? "#d2d4c6"
          : image_model_color == "lightGreenVariant2"
          ? "#293750"
          : image_model_color == "brownRedWine"
          ? "#3e3027"
          : image_model_color == "deepSeaBlue"
          ? "#1a4d5e"
          : image_model_color == "purpleBlueVariant"
          ? "#35363f"
          : image_model_color == "blueGreenVariant"
          ? "#37615f"
          : image_model_color == "blueDarkVariant"
          ? "#1b1e31"
          : image_model_color == "tooLightSeaBlue"
          ? "#094367"
          : image_model_color == "greenOfWhite"
          ? "#e5e5dd"
          : image_model_color == "darkGrayVariant2"
          ? "#464646"
          : image_model_color == "yellowVariant2"
          ? "#fcbc18"
          : image_model_color == "darkMaroonVariant"
          ? "#4f0005"
          : image_model_color == "blueAnotherVariant4"
          ? "#222544"
          : image_model_color == "mediumGray3"
          ? "#666666"
          : image_model_color == "seaBlueVariant"
          ? "#1f4051"
          : image_model_color == "seaBlueVariant2"
          ? "#1c344c"
          : image_model_color == "darkChocolate"
          ? "#542f18"
          : image_model_color == "lightBrown4"
          ? "#887e63"
          : image_model_color == "grayBrownMix"
          ? "#7f5e4b"
          : image_model_color == "deepBlueMix"
          ? "#005065"
          : image_model_color == "chocolateBrown"
          ? "#3f2317"
          : image_model_color == "silverBlue"
          ? "#33474b"
          : image_model_color == "deepOceanBlue"
          ? "#082f40"
          : image_model_color == "tooLightGreen"
          ? "#eaebe6"
          : image_model_color == "milkWhite"
          ? "#fafafa"
          : image_model_color == "brownGray"
          ? "#7b7368"
          : image_model_color == "deepChocolate"
          ? "#261005"
          : image_model_color == "grayishBlue"
          ? "#3d5c70"
          : image_model_color == "yellowVariant3"
          ? "#e3c511"
          : image_model_color == "yellowGold"
          ? "#d59c27"
          : image_model_color == "lightSkyBlue3"
          ? "#54b8c4"
          : image_model_color == "panadol"
          ? "#590631"
          : image_model_color == "purpleGray"
          ? "#2a2931"
          : image_model_color == "darkPurpleGray"
          ? "#0f1a1e"
          : image_model_color == "lightGrayishBlue"
          ? "#d5eae5"
          : image_model_color == "lightChocolate"
          ? "#c5bbaf"
          : image_model_color == "mediumGray3"
          ? "#666666"
          : image_model_color == "lightChocolate2"
          ? "#bda37f"
          : image_model_color == "deepestChocolate"
          ? "#2a1907"
          : image_model_color == "redChoco"
          ? "#473028"
          : image_model_color == "deepRedChoco"
          ? "#643a2a"
          : image_model_color == "silverBlueVariant"
          ? "#494b57"
          : image_model_color == "silverBlueVariant2"
          ? "#1b3742"
          : image_model_color == "neonBlue"
          ? "#25cbd9"
          : image_model_color == "bluishPurple"
          ? "#1a1929"
          : image_model_color == "silverBrown"
          ? "#8b7f69"
          : image_model_color == "whiteRose"
          ? "#ededeb"
          : image_model_color == "whiteBlue"
          ? "#115571"
          : image_model_color == "orangeBrown"
          ? "#82684f"
          : image_model_color == "redBrown"
          ? "#64514b"
          : image_model_color == "deepOceanBlueVariant"
          ? "#151827"
          : "#000000",
    };
  } else if (isVideoPlaying || olympicsVideo) {
    // console.log("true video");
    return {
      background_color: `bg_black`,
      text_color: `text_white`,
      svg_color: "#FFFFFF",
      hover_color: "text_white",
      primary_color: "text_black",
      secondary_color: "#000000",
    };
  } else {
    // console.log(currentIndex);
    // console.log("true solid");
    // console.log("bg_color", background_color);
    // console.log("text_color", text_color);
    // console.log("svg", svg_color);
    // console.log("primary", primary_color);
    // console.log("secondary", secondary_color);
    return {
      background_color,
      text_color,
      hover_color,
      svg_color,
      primary_color,
      secondary_color,
    };
  }
};

export default useColors;
