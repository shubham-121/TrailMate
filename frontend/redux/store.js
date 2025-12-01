import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./slices/authSlice";
import nearByPlacesSliceReducer from "./slices/nearByPlacesSlice";
import searchBarSliceReducer from "./slices/searchBarSlice";

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    searchBar: searchBarSliceReducer,
    nearByPlaces: nearByPlacesSliceReducer,
  },
});

export default store;
