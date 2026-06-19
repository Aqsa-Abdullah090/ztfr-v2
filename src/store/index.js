import { configureStore } from "@reduxjs/toolkit";
import visitorSlice from "./features/visitorSlice";
import bgSlice from "./features/bgSlice";
import metadata from "./features/metadata";

const store = configureStore({
  // reducers here
  reducer: {
   
    visitor: visitorSlice,
    bg: bgSlice,
    meta: metadata,
  },
});

export default store;