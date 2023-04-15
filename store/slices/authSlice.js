import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
  authToken: null,
};

export const authSlice = createSlice({
  name: "isLoggedIn",
  initialState,
  reducers: {
    Login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.authToken = action.payload.token;
    },
  },
});

export const AuthActions = authSlice.actions;
export default authSlice.reducer;
