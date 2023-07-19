import { configureStore } from "@reduxjs/toolkit";
import appSliceReducer from "./appSlice";

const store = configureStore({
  reducer: {
    appRedux: appSliceReducer,
  },
});

export default store;
