import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCreatingTrip: false,
};

export const createTripSlice = createSlice({
  name: "createTrip",
  initialState,
  reducers: {
    activateCreateTripModal(state, action) {
      console.log("createTripSlice modal activated");
      state.isCreatingTrip = true;
    },
    deActivateCreateTripModal(state, action) {
      console.log("createTripSlice modal deactivated");
      state.isCreatingTrip = false;
    },
  },
});

export default createTripSlice.reducer;

export const { activateCreateTripModal, deActivateCreateTripModal } =
  createTripSlice.actions;
