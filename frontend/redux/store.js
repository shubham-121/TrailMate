import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./slices/authSlice";
import nearByPlacesSliceReducer from "./slices/nearByPlacesSlice";
import searchBarSliceReducer from "./slices/searchBarSlice";
import createTripSliceReducer from "./slices/createTripSlice";

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    searchBar: searchBarSliceReducer,
    nearByPlaces: nearByPlacesSliceReducer,
    createTrip: createTripSliceReducer,
  },
});

export default store;
