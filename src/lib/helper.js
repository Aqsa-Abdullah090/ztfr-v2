import axios from "axios";
import {
  DEFAULT_HEADERS,
  fileUploadingStatus,
  LAMDA_API_BASE,
  LAMDA_API_BASE_2,
  LAMDA_API_BASE_4,
  ZVC_TYPES,
} from "./constants";
import QRCode from "qrcode";
import { v4 } from "uuid";
import { detect } from "detect-browser";
import { request_lamda1, request_lamda2, request_lamda4, request_qr } from "./service";

const formatBytes = (bytes, decimals = 2) => {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

const formatBytesNoI = (bytes, decimals = 2) => {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

const parseReadableBytes = (input) => {
  // Split the input into value and unit
  const [valueStr, unit] = input.split(" ");

  // Parse the value as a floating-point number
  const value = parseFloat(valueStr);

  // Create a map of unit names to their corresponding multipliers
  const unitMultipliers = {
    Bytes: 1,
    KB: 1024,
    MB: 1024 ** 2,
    GB: 1024 ** 3,
    TB: 1024 ** 4,
    PB: 1024 ** 5,
    EB: 1024 ** 6,
    ZB: 1024 ** 7,
    YB: 1024 ** 8,
    // MB: 125000, // 1 Megabit = 125,000 Bytes
  };

  // Check if the unit exists in the multipliers map
  if (unit in unitMultipliers) {
    // Calculate the bytes equivalent
    const bytes = value * unitMultipliers[unit];
    return bytes;
  } else {
    throw new Error("Invalid unit provided in input.");
  }
};

/**
 * @returns {latitude, longitude}
 */
const getUserLocation = () => {
  return new Promise(function (resolve, reject) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        function (error) {
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
};

/**
 * @param lat => user latitute, default will be null
 * @param lng => user longitude, default will be null
 * @returns visitor object
 */
const getVisitor = async (lat = null, lng = null) => {
  const browser = detect();
  const v_id = v4();
  try {
    const { data } = await request_lamda4.get(
      `/api/visitors?lat=${lat}&lng=${lng}&access_platform=web&visitor_id=${v_id}&browser=${browser.name}&browser_version=${browser.version}&platform=${browser.os}&device=${browser.type}`
    );
    return data;
  } catch (e) {
    console.log("error while fetching visitor", e.message);
    throw e;
  }
};

/**
 * @returns countries list object
 */
const getCountries = async () => {
  try {
    const { data } = request_lamda1.get("/api/get-countries");
    return data;
  } catch (e) {
    console.log("error while fetching countries", e.message);
    throw e;
  }
};

const registerUserWithGoogle = async ({
  visitor_id,
  display_name,
  email,
  photoUrl,
  providerId,
  phone,
  uid,
}) => {
  try {
    const requestData = {
      // Add your data properties here
      visitor_id,
      display_name,
      email,
      photoUrl,
      phone,
      providerId,
      type: "Google",
      organization: null,
      password: null,
      uid,
    };
    const { data } = request_lamda2.post("/api/create-user", requestData);
    return data;

    // Return the response data from the backend
  } catch (e) {
    throw e; // Throw the error to be handled by the caller of the function
  }
};

const sendVerificationMail = async (email) => {
  try {
    const requestData = {
      email,
    };
    const { data } = await request_lamda2.post(
      "/api/email-verification",
      requestData
    );
    // toast.success(data.message, {
    //   position: "top-right",
    //   autoClose: 2000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: false,
    //   draggable: false,
    //   progress: undefined,
    //   theme: "colored",
    // });
    return data.message;
  } catch (e) {
    console.log("error while fetching countries", e.message);
    throw e;
  }
};

const verifyEmail = async (email) => {
  try {
    const requestData = {
      email,
    };
    const { data } = await request_lamda2.post(`/api/verify-mail`, requestData);

    return data;
  } catch (e) {
    console.log("error", e.message);
    throw e;
  }
};
const requestNewPass = async (email) => {
  try {
    const { data } = await request_lamda2.get(
      `/api/request-new-reset-password?email=${email}`
    );
    return data;
  } catch (e) {
    console.log("error", e.message);
    throw e;
  }
};

const resendEmail = async (email) => {
  try {
    const requestData = {
      email,
    };
    const { data } = await request_lamda2(
      `/api/request-new?email=${email}`,
      requestData
    );
    return data;
  } catch (e) {
    console.log("error", e.message);
    throw e;
  }
};
const blockEmail = async (email) => {
  try {
    const requestData = {
      email,
    };
    const { data } = await axios({
      url: `${LAMDA_API_BASE_2}/api/unauthenticated-user?email=${email}`,
      method: "GET",
      secure: true,
      headers: DEFAULT_HEADERS,
      data: requestData,
    });
    // toast.success(data.message, {
    //   position: "top-right",
    //   autoClose: 2000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: false,
    //   draggable: false,
    //   progress: undefined,
    //   theme: "colored",
    // });
    return data;
  } catch (e) {
    console.log("error", e.message);
    throw e;
  }
};

const getBGData = async (countryName, page) => {
  try {
    const { data } = await request_lamda1.get(
      `/api/advert-by-user-country?theme=&country_name=&page=${page}`
    );
    return data;
  } catch (e) {
    console.log("error while fetching data", e.message);
    throw e;
  }
};

const advertView = async (view) => {
  try {
    const { data } = await request_lamda1.post("/api/advert-view", view);
    return data;
  } catch (e) {
    console.log("error while fetching data", e.message);
    throw e;
  }
};

const resetPass = async (email, password) => {
  try {
    const requestData = {
      email,
      new_password: password,
    };
    const { data } = await axios({
      url: `${LAMDA_API_BASE_2}/api/set-reset-password`,
      method: "POST",
      secure: true,
      headers: DEFAULT_HEADERS,
      data: requestData,
    });
    // console.log(data);
    return data;
  } catch (e) {
    console.log("error", e.message);
    throw e;
  }
};

const getFileDetail = async (file_id) => {
  try {
    const { data } = await request_lamda1.get(
      `/api/get-file-detail?file_id=${file_id}`
    );
    return data;
  } catch (e) {
    console.log("error while fetching data", e.message);
    throw e;
  }
};

const checkPassword = async (file_id, password) => {
  try {
    const requestData = {
      file_id,
      password,
    };
    const { data } = await request_lamda1.post(
      "/api/check-password",
      requestData
    );
    return data;
  } catch (e) {
    console.log("error while fetching data", e.message);
    throw e;
  }
};

/**
 * sends email verification code
 * @param {String} email
 * @param {String} zvc
 * @param {String} type
 * @returns
 */
const getZVC = async (email, zvc, type = ZVC_TYPES.default) => {
  try {
    const { data } = await axios({
      url: `${LAMDA_API_BASE_2}/api/send-otp/mail?email=${email}&zvc=${zvc}&type=${type}`,
      method: "GET",
      secure: true,
      headers: DEFAULT_HEADERS,
    });
    return data;
  } catch (e) {
    console.log("error while fetching data", e.message);
    throw e;
  }
};
const getUserID = async (email) => {
  try {
    const { data } = await axios({
      url: `${LAMDA_API_BASE}/api/user-id?email=${email}`,
      method: "GET",
      secure: true,
      headers: DEFAULT_HEADERS,
    });
    return data;
  } catch (e) {
    console.log("error while fetching data", e.message);
    throw e;
  }
};

const setNewPassword = async (file_id, password) => {
  try {
    const requestData = {
      file_id,
      password,
    };
    const { data } = await request_lamda1.patch(
      "/api/file-password-update",
      requestData
    );
    return data;
  } catch (e) {
    console.log("error while fetching data", e.message);
    throw e;
  }
};
const deleteTransferFile = async (file_id) => {
  try {
    const { data } = await axios({
      url: `${LAMDA_API_BASE}/api/file-delete?file_id=${file_id}`,
      method: "DELETE",
      secure: true,
      headers: DEFAULT_HEADERS,
    });
    return data;
  } catch (e) {
    console.log("error while fetching data", e.message);
    throw e;
  }
};
const received = async ({ user_id, visitor_id, file_id }) => {
  try {
    const requestData = {
      user_id,
      visitor_id,
      file_id,
    };
    const { data } = await axios({
      url: `${LAMDA_API_BASE}/api/receive-file`,
      method: "POST",
      secure: true,
      headers: DEFAULT_HEADERS,
      data: requestData,
    });
    return data;
  } catch (e) {
    console.log("error while fetching data", e.message);
    throw e;
  }
};

const removeTracking = () => {
  return (
    typeof window !== "undefined" &&
    (localStorage.getItem("language") === "en" ||
      localStorage.getItem("language") === "ES" ||
      localStorage.getItem("language") === null)
  );
};
const rightAlignment = () => {
  return (
    typeof window !== "undefined" &&
    (localStorage.getItem("language") === "PK" ||
      localStorage.getItem("language") === "AE")
  );
};

const RTL = () => {
  return rightAlignment() ? "rtl" : "ltr";
};
const careerCenter = () => {
  return (
    localStorage.getItem("language") === "IT" ||
    localStorage.getItem("language") === "DE" ||
    localStorage.getItem("language") === "ES" ||
    localStorage.getItem("language") === "PT" ||
    localStorage.getItem("language") === "NL" ||
    localStorage.getItem("language") === "NO" ||
    localStorage.getItem("language") === "DK" ||
    localStorage.getItem("language") === "SE" ||
    localStorage.getItem("language") === "PL" ||
    localStorage.getItem("language") === "BG" ||
    localStorage.getItem("language") === "CZ" ||
    localStorage.getItem("language") === "TR" ||
    localStorage.getItem("language") === "PH"
  );
};

const careerSide1 = () => {
  return (
    localStorage.getItem("language") === "IT" ||
    localStorage.getItem("language") === "FR" ||
    localStorage.getItem("language") === "ES" ||
    localStorage.getItem("language") === "PT"
  );
};

const careerSide2 = () => {
  return (
    localStorage.getItem("language") === "DE" ||
    localStorage.getItem("language") === "PL" ||
    localStorage.getItem("language") === "CZ"
  );
};

const careerSide2xl = () => {
  return (
    localStorage.getItem("language") === "IT" ||
    localStorage.getItem("language") === "FR" ||
    localStorage.getItem("language") === "ES" ||
    localStorage.getItem("language") === "RU" ||
    localStorage.getItem("language") === "CZ" ||
    localStorage.getItem("language") === "BG" ||
    localStorage.getItem("language") === "PL" ||
    localStorage.getItem("language") === "NL" ||
    localStorage.getItem("language") === "PT"
  );
};

const careerSide3 = () => {
  return (
    localStorage.getItem("language") === "BG" ||
    localStorage.getItem("language") === "RU"
  );
};

const navlinks2xl = () => {
  return (
    localStorage.getItem("language") === "PT" ||
    localStorage.getItem("language") === "NL" ||
    localStorage.getItem("language") === "SE" ||
    localStorage.getItem("language") === "PL" ||
    localStorage.getItem("language") === "TR" ||
    localStorage.getItem("language") === "RU"
  );
};

const navlinkLg = () => {
  return (
    localStorage.getItem("language") === "ES" ||
    localStorage.getItem("language") === "SE" ||
    localStorage.getItem("language") === "CZ" ||
    localStorage.getItem("language") === "RU"
  );
};

const letsDoThis = () => {
  return (
    localStorage.getItem("language") === "IT" ||
    localStorage.getItem("language") === "NL" ||
    localStorage.getItem("language") === "RU" ||
    localStorage.getItem("language") === "KP" ||
    localStorage.getItem("language") === "BG" ||
    localStorage.getItem("language") === "SE" ||
    localStorage.getItem("language") === "DK"
  );
};

const letsDoThis2 = () => {
  return (
    localStorage.getItem("language") === "CZ" ||
    localStorage.getItem("language") === "KP" ||
    localStorage.getItem("language") === "BG" ||
    localStorage.getItem("language") === "SE" ||
    localStorage.getItem("language") === "DK"
  );
};

const letsDoThis3 = () => {
  return (
    localStorage.getItem("language") === "IT" ||
    localStorage.getItem("language") === "NL" ||
    localStorage.getItem("language") === "PL" ||
    localStorage.getItem("language") === "RU"
  );
};

const shareTransfer = () => {
  return (
    localStorage.getItem("language") === "IT" ||
    localStorage.getItem("language") === "RU" ||
    localStorage.getItem("language") === "BG" ||
    localStorage.getItem("language") === "ES" ||
    localStorage.getItem("language") === "PH" ||
    localStorage.getItem("language") === "NL" ||
    localStorage.getItem("language") === "DE" ||
    localStorage.getItem("language") === "NO" ||
    localStorage.getItem("language") === "PT" ||
    localStorage.getItem("language") === "PL" ||
    localStorage.getItem("language") === "SE" ||
    localStorage.getItem("language") === "DK" ||
    localStorage.getItem("language") === "FR"
  );
};
/**
 * @param id, number
 * takes visitor ID, and generate a formated fixed ditigits id
 */
const visitorIdGen = (id) => {
  if (!id) return "";

  const numStr = id.toString();
  const l = 4;
  const digitsLimit = 7;
  const currentDigits = numStr.length;
  if (numStr.length >= digitsLimit) {
    return `ZTFR${numStr.substring(0, digitsLimit)}`;
  }
  const rand = "786786786";
  return `ZTFR${numStr}${rand.substring(0, digitsLimit - currentDigits)}`;
};

/**
 *
 * @param {String} value , value to convert into QR
 * @returns base64 QR code
 */
const generateQrUrl = async (value) => {
  try {
    const url = await QRCode.toDataURL(value);
    return url;
  } catch (e) {
    throw e;
  }
};

async function getFolderSize(directoryHandle) {
  let size = 0;
  const entries = directoryHandle.values();

  for await (const entry of entries) {
    if (entry.kind === "file") {
      size += entry.file.size;
    } else if (entry.kind === "directory") {
      size += await getFolderSize(entry.directoryHandle);
    }
  }

  return size;
}

const openDirectory = async () => {
  try {
    const directoryHandle = await window.showDirectoryPicker();
    const fileHandles = await directoryHandle.values();
    console.clear();
    console.log(directoryHandle);
    let size = 0;
    let fileCount = 0;
    const folder = {
      id: v4(),
      name: directoryHandle.name,
      extension: "FOLDER",
      uploaded: false,
      status: fileUploadingStatus.pending,
      files: [],
    };

    const traverseDirectory = async (directoryHandle) => {
      const fileHandles = await directoryHandle.values();
      for await (const fileHandle of fileHandles) {
        if (fileHandle.kind === "file") {
          const file = await fileHandle.getFile();
          const fileNameExt = file.name.split(".");
          const data = {
            id: v4(),
            name: file.name,
            size: formatBytes(file.size),
            type: file.type,
            extension: fileNameExt[fileNameExt.length - 1],
            uploaded: false,
            status: fileUploadingStatus.pending,
            file,
          };

          folder.files.push(data);
          fileCount += 1;
          size += parseInt(file.size);
        } else if (fileHandle.kind === "directory") {
          const subDirectory = await directoryHandle.getDirectoryHandle(
            fileHandle.name
          );
          await traverseDirectory(subDirectory);
        }
      }
    };

    await traverseDirectory(directoryHandle);

    folder.size = formatBytes(size);
    folder.fileCount = fileCount;

    return folder;
  } catch (e) {
    console.clear();
    console.log(e);
  }
};

const alphabatsLang = [
  "en",
  "fr",
  "it",
  "de",
  "es",
  "pt",
  "ne",
  "no",
  "dk",
  "se",
  "pl",
  "bg",
  "cz",
  "tr",
  "ph",
  "pt",
];

const getNormalTracking = () => {
  const CurrentLang = localStorage.getItem("language")?.toLowerCase();
  if (alphabatsLang.includes(CurrentLang)) {
    return "1.5px";
  }
  return 0;
};

const isAphabatLang = () => {
  const CurrentLang = localStorage.getItem("language")?.toLowerCase();
  if (alphabatsLang.includes(CurrentLang)) {
    return true;
  }
  return false;
};

const getQrCode = async (value) => {
  try {
    const { data } = await request_qr.get("", {
      params: {
        ztfr_download_url: value,
      },
    });

    return {
      svg_file: data.image_base64,
    };

  }
  catch (e) {
    console.log("Something went wrong while generating QR:", e);
    throw e;
  }
};


function cleanQrBase64(base64String, bgColor, type = "dynamic") {
  if (!base64String) return "";

  // remove base64 prefix
  const base64 = base64String.replace(
    /^data:image\/svg\+xml;base64,/,
    ""
  );

  const svgText = atob(base64);

  const parser = new DOMParser();
  const doc = parser.parseFromString(svgText, "image/svg+xml");

  const svg = doc.querySelector("svg");
  if (!svg) return svgText;

  //remove white bg rects
  doc.querySelectorAll("rect").forEach((rect) => {
    const fill = rect.getAttribute("fill")?.toLowerCase();
    if (fill === "white" || fill === "#ffffff" || fill === "#fff") {
      rect.remove();
    }
  });

  // inner eye color
  doc.querySelectorAll("circle, path").forEach((el) => {
    const fill = el.getAttribute("fill")?.toLowerCase();

    if (fill === "white" || fill === "#ffffff" || fill === "#fff") {
      if (type === "dynamic") {
        el.setAttribute("fill", bgColor);
        svg.style.background = "transparent";
      }
      else if (type === "download") {
        el.setAttribute("fill", "#ffffff");
        svg.style.background = "#ffffff";
      }
      else {
        el.setAttribute("fill", "#000000");
        svg.style.background = "transparent";
      }
    }
  });

  // if view box exists
  let viewBox = svg.getAttribute("viewBox");

  if (!viewBox) {
    const width = parseFloat(svg.getAttribute("width")) || 300;
    const height = parseFloat(svg.getAttribute("height")) || 300;
    viewBox = `0 0 ${width} ${height}`;
    svg.setAttribute("viewBox", viewBox);
  }

  // safe margin trim
  const parts = viewBox.split(/\s+/).map(Number);
  let [x, y, width, height] = parts;

  const cropPercent = 0.12; // crop margin
  const cropX = width * cropPercent;
  const cropY = height * cropPercent;

  svg.setAttribute(
    "viewBox",
    `${x + cropX} ${y + cropY} ${width - cropX * 2} ${height - cropY * 2
    }`
  );
  // responsive svg
  svg.removeAttribute("width");
  svg.removeAttribute("height");

  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

  return new XMLSerializer().serializeToString(svg);
}


function svgtoPng(base64Svg) {

  const cleanedSvgString = cleanQrBase64(base64Svg, "#ffffff", "download");

  return new Promise((resolve, reject) => {
    if (!cleanedSvgString) {
      return reject(
        new Error("cleanQrBase64 returned an empty or invalid string.")
      );
    }

    const dataUri = "data:image/svg+xml;base64," + btoa(cleanedSvgString);

    const img = new Image();
    img.src = dataUri;
    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      resolve(canvas.toDataURL("image/png"));

    };
    img.onerror = function (error) {
      reject(error);
    };
  });
};



export {
  deleteTransferFile,
  setNewPassword,
  getUserID,
  getZVC,
  checkPassword,
  getFileDetail,
  getBGData,
  formatBytes,
  verifyEmail,
  getUserLocation,
  advertView,
  getVisitor,
  getCountries,
  registerUserWithGoogle,
  sendVerificationMail,
  resendEmail,
  blockEmail,
  resetPass,
  formatBytesNoI,
  parseReadableBytes,
  received,
  removeTracking,
  visitorIdGen,
  careerCenter,
  careerSide1,
  careerSide2,
  careerSide3,
  navlinks2xl,
  navlinkLg,
  careerSide2xl,
  letsDoThis,
  letsDoThis2,
  letsDoThis3,
  shareTransfer,
  requestNewPass,
  generateQrUrl,
  openDirectory,
  rightAlignment,
  RTL,
  getNormalTracking,
  isAphabatLang,
  getQrCode,
  cleanQrBase64,
  svgtoPng,
};