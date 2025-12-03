import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCoords: { lat: null, lon: null }, //fetch nearby places for this region
  category: "", // chosen category
  poiList: [], // list of fetched POIs
  selectedPoi: null, // POI tapped from list
  loading: false,
  error: null,
  showOnMapCoords: null, // store data when user clicks on show on map in the placeDetails screen
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

    setShowOnMapCoords(state, action) {
      if (action.payload === null) {
        state.showOnMapCoords = null;
      } else {
        state.showOnMapCoords = {
          lat: action.payload.lat,
          lon: action.payload.lon,
        };
      }
      console.log(" showOnMapCoords updated in redux: ", state.showOnMapCoords);
    },
  },
});

export default nearByPlacesSlice.reducer;

export const { setNearByPlacesCoords, setShowOnMapCoords } =
  nearByPlacesSlice.actions;
