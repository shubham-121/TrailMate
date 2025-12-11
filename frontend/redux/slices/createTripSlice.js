import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCreatingTrip: false,
  destinations: [], //for holding user location selected from the map to the redux then to DB
  tripObj: {}, //for temporary storage of data for formatting
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

    createTrip: {
      reducer(state, action) {
        console.log(" create trip Payload reached here: ", action.payload);
        state.destinations = [...state.destinations, action.payload];

        console.log("destinations state after update: ", state.destinations);
      },

      prepare(data) {
        return {
          payload: {
            id: Date.now(),
            displayName: `${data.city}, ${data.region}, ${data.country}`, //for directly rendering in the itinerary drawer
            fullLocationData: data,
            createdAt: new Date().toISOString(),
          },
        };
      },
    },
  },
});

export default createTripSlice.reducer;

export const {
  activateCreateTripModal,
  deActivateCreateTripModal,
  createTrip,
} = createTripSlice.actions;
