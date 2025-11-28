import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./slices/authSlice";
import searchBarSliceReducer from "./slices/searchBarSlice";

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    searchBar: searchBarSliceReducer,
  },
});

export default store;
