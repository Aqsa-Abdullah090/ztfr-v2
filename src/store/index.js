import { configureStore } from "@reduxjs/toolkit";
import visitorSlice from "./features/visitorSlice";

const store = configureStore({
  // reducers here
  reducer: {
   
    visitor: visitorSlice,
  },
});

export default store;