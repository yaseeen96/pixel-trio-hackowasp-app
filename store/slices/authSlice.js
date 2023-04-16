import { createSlice } from "@reduxjs/toolkit";
import { clearSession, setSession } from "../../util/helper";

const initialState = {
  isLoggedIn: false,
  user: null,
  authToken: null,
  vendors: [],
  location: { latitude: "", longitude: "" },
};

export const authSlice = createSlice({
  name: "isLoggedIn",
  initialState,
  reducers: {
    Login: (state, action) => {
      setSession(action.payload.token);
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.authToken = action.payload.token;
    },
    Logout: (state, action) => {
      clearSession();
      return initialState;
    },
    FillVendors: (state, action) => {
      state.vendors = action.payload;
    },
    FillLocation: (state, action) => {
      state.location.latitude = action.payload.latitude;
      state.location.longitude = action.payload.longitude;
    },
  },
});

export const AuthActions = authSlice.actions;
export default authSlice.reducer;
