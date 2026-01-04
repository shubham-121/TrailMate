import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./slices/authSlice";
import nearByPlacesSliceReducer from "./slices/nearByPlacesSlice";
import searchBarSliceReducer from "./slices/searchBarSlice";
import createTripSliceReducer from "./slices/createTripSlice";
import tripNavigationSliceReducer from "./slices/tripNavigationSlice";

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    searchBar: searchBarSliceReducer,
    nearByPlaces: nearByPlacesSliceReducer,
    createTrip: createTripSliceReducer,
    tripNavigation: tripNavigationSliceReducer,
  },
});

export default store;
