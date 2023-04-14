import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const isLoginSlice = createSlice({
  name: "isLoggedIn",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setIsLoggedIn } = isLoginSlice.actions;
export default isLoginSlice.reducer;
