import { createSlice } from "@reduxjs/toolkit";
//remove the default details later during production

const localToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTFiMGQzM2Y3ODIyM2Q5NzJiMDBlYTQiLCJlbWFpbCI6InNodWJoYW1AZ21haWwuY29tIiwiaWF0IjoxNzY2ODMzNTI3fQ.Pm7TVLBSjSuPmwgJDKN9Ix-7aOuWoC9Vr12u8p42Tu8";

const initialState = {
  isAuthenticated: false,
  access_token: localToken,
  refresh_token: "",
  authUserData: {
    email: "shubham@gmail.com", //remove later
    userId: "691b0d33f78223d972b00ea4", //remove later
  },
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
