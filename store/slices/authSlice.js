import { createSlice } from "@reduxjs/toolkit";
import { clearSession, setSession } from "../../util/helper";

const initialState = {
  isLoggedIn: false,
  user: null,
  authToken: null,
  vendors: [],
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
  },
});

export const AuthActions = authSlice.actions;
export default authSlice.reducer;
