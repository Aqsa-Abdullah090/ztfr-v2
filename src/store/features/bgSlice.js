import { advertView, getBGData } from "../../lib/helper";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBGData = createAsyncThunk(
  "get/bgData",
  async ({ country, page }, { getState }) => {
    try {
      const bgData = await getBGData(country, page);

      // Extract videoAdvertisements and imageAdvertisements from bgData
      const videoAdvertisements = bgData.videoAdvertisements || [];
      const imageAdvertisements = bgData.imageAdvertisements || [];

      // Combine videoAdvertisements and imageAdvertisements into a single array
      const combinedAdvertisements = [
        ...videoAdvertisements,
        ...imageAdvertisements,
      ];

      // Get the current bgData from Redux state
      const currentState = getState().bg;
      const { visitor_id } = getState()?.visitor?.data;
      // const { userID } = getState()?.auth;

      // Combine new and existing data
      const newData = currentState.data
        ? [...currentState.data, ...combinedAdvertisements]
        : combinedAdvertisements;

      // Save bgData and combinedAdvertisements to localStorage
      const combinedData = {
        total: {
          imagePages: bgData.totalImagePages,
          videoPages: bgData.totalImagePages,
        },
        combinedAdvertisements: newData,
      };
      localStorage.setItem("bg_data", JSON.stringify(combinedData));

      // Get IDs from combinedAdvertisements
      const advertisementIds = combinedAdvertisements.map((advertisement) => {
        const idObject = {
          visitor_id: visitor_id, // Assuming 'visitor_id' is a constant value
          advert_id: advertisement.id,
        };

        // If userID is defined, add it to the object
        // if (userID) {
        //   idObject.user_id = userID;
        // }

        return idObject;
      });

      // If bgData.error is false, send a POST request to the specified API
      if (!bgData.error) {
        // Send POST request
        const data = await advertView(advertisementIds);
        if (data.error) {
          console.log(error);
        }
      }

      return newData; // Return combined data
    } catch (error) {
      console.error("Error fetching bgData:", error);
      throw error;
    }
  }
);

export const bgSlice = createSlice({
  name: "bgData",
  initialState: {
    status: "idle", // idle, success, error, loading
    data: null,
    bgVideo: null,
    page: 1,
    // hover lets do this on main screen
    hoverMain: false,
    hoverWhatsappSide: false,
    hoverTelegramSide: false,
  },
  reducers: {
    loadBgData: (state) => {
      state.status = "success";
      state.data = null;
    },
    setBgVideo: (state, action) => {
      state.bgVideo = action.payload;
    },
    // hover lets do this on main screen
    setHoverMain: (state, action) => {
      state.hoverMain = action.payload;
    },
    setHoverWhatsappSide: (state, action) => {
      state.hoverWhatsappSide = action.payload;
    },
    setHoverTelegramSide: (state, action) => {
      state.hoverTelegramSide = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBGData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBGData.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(fetchBGData.rejected, (state) => {
        state.status = "error";
      });
  },
});

export default bgSlice.reducer;
export const {
  loadBgData,
  setBgVideo,
  setBgImage,
  setHoverMain,
  setHoverWhatsappSide,
  setHoverTelegramSide,
  setPage,
} = bgSlice.actions;
