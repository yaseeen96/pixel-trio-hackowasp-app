import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";

// import slice

const Store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default Store;
