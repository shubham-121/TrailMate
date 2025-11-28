import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  latitude: "",
  longitude: "",
  formattedString: "",
  inputSearchString: "",
};

export const searchBarSlice = createSlice({
  name: "searchBar",
  initialState,
  reducers: {
    setSearchedLocation(state, action) {
      const { coords, formattedString } = action.payload;
      //   console.log("in searchbar redux slice: ", coords, formattedString);

      state.latitude = coords.latitude;
      state.longitude = coords.longitude;
      state.formattedString = formattedString;
    },
  },
});

export default searchBarSlice.reducer;

export const { setSearchedLocation } = searchBarSlice.actions;
