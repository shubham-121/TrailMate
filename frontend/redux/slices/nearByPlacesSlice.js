import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCoords: { lat: null, lon: null },
  category: "", // chosen category
  poiList: [], // list of fetched POIs
  selectedPoi: null, // POI tapped from list
  loading: false,
  error: null,
};

export const nearByPlacesSlice = createSlice({
  name: "nearByPlaces",
  initialState,
  reducers: {
    setNearByPlacesCoords(state, action) {
      console.log("nearby places slice: ", action.payload);
      state.selectedCoords = {
        lat: action.payload.latitude,
        lon: action.payload.longitude,
      };

      console.log("Updated coords for nearby places : ", state.selectedCoords);
    },
    setNearByPlacesCategory(state, action) {},
  },
});

export default nearByPlacesSlice.reducer;

export const { setNearByPlacesCoords } = nearByPlacesSlice.actions;
