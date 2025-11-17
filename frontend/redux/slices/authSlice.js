import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  access_token: "",
  refresh_token: "",
  authUserData: {},
};

export const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.isAuthenticated = true;

      const { access_token, email, userId } = action.payload;
      // console.log("Set setCredentials reducer called: ", action.payload);

      state.access_token = access_token;
      state.authUserData = {
        email,
        userId,
      };
      console.log("Auth State set after login: ", state.isAuthenticated);
      // console.log(
      //   "setCredentials set:",
      //   state.access_token,
      //   state.authUserData
      // );
    },

    clearCredentials(state, action) {
      state.isAuthenticated = false;
      state.access_token = "";
      state.authUserData = {};
    },
  },
});

export default authSlice.reducer;

export const { setCredentials, clearCredentials } = authSlice.actions;
