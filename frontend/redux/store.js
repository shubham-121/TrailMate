import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
  },
});

export default store;
