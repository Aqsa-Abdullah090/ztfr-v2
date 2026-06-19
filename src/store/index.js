import { configureStore } from "@reduxjs/toolkit";
import visitorSlice from "./features/visitorSlice";
import bgSlice from "./features/bgSlice";

const store = configureStore({
  // reducers here
  reducer: {
   
    visitor: visitorSlice,
    bg: bgSlice,
  },
});

export default store;