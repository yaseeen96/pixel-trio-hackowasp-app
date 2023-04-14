import { configureStore } from "@reduxjs/toolkit";

// import slice
import isLoginReducer from "./slices/isLoginSlice";

const Store = configureStore({
  reducer: {
    isLoggedin: isLoginReducer,
  },
});

export default Store;
