import { getUserLocation, getVisitor } from "../../lib/helper";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchVisitor = createAsyncThunk("get/visitor", async () => {
  try {
    const location = await getUserLocation();
    const visitor = await getVisitor(location.latitude, location.longitude);
    localStorage.setItem("visitor_data", JSON.stringify(visitor.visitor_data));
    return visitor.visitor_data;
  } catch (e) {
    if (e.message == "User denied Geolocation") {
      const visitor = await getVisitor();
      localStorage.setItem(
        "visitor_data",
        JSON.stringify(visitor.visitor_data)
      );

      return visitor.visitor_data;
    }

    if (parseInt(e.response.status) === 451) {
      // console.log(e.response.data.visitor_data);
      const res = {
        data: e.response.data.visitor_data,
        error: "Visitor not allowed",
      };
      throw Error(JSON.stringify(res));
    }
  }
});

export const visitorSlice = createSlice({
  name: "visitor",
  initialState: {
    status: "idle", //idle, success, error, loading
    data: null,
    isAllowed: true,
  },
  reducers: {
  loadVisitor: (state) => {
    const localData = localStorage.getItem("visitor_data");
    if (localData) {
      try {
        state.status = "success";
        state.data = JSON.parse(localData);
      } catch (e) {
        console.error("Error parsing initial local visitor data", e);
      }
    }
  },
},
  extraReducers(builder) {
    builder
      .addCase(fetchVisitor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVisitor.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(fetchVisitor.rejected, (state, action) => {
        state.status = "error";
        const message = JSON.parse(action.error.message);
        state.data = message.data;
        if (message.error === "Visitor not allowed") {
          state.isAllowed = false;
        }
      });
  },
});

export default visitorSlice.reducer;
export const { loadVisitor } = visitorSlice.actions;