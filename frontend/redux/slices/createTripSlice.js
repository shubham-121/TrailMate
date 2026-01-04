import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCreatingTrip: true, //change to false later on, for  trip drawer popup
  destinations: [], //for holding user location selected from the map to the redux then to DB
  tripObj: {}, //for temporary storage of data for formatting
};

export const createTripSlice = createSlice({
  name: "createTrip",
  initialState,
  reducers: {
    activateCreateTripModal(state, action) {
      //activates the trip drawer
      // console.log("createTripSlice modal activated");
      state.isCreatingTrip = true;
    },
    deActivateCreateTripModal(state, action) {
      // console.log("createTripSlice modal deactivated");
      state.isCreatingTrip = false;
    },

    createTrip: {
      //creates the destination array for rendering in the drawer
      reducer(state, action) {
        console.log(" create trip Payload reached here: ", action.payload);
        console.log(" destination coords: ", action.payload.destinationCoords);

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

    removeDestination(state, action) {
      const { filterId } = action.payload;
      // console.log("remove destination with filter id:", filterId);

      const newDestinations = state.destinations.filter(
        (item, index) => item.id !== filterId
      );

      state.destinations = newDestinations;

      // console.log(
      //   "Updated destination obj is:",
      //   newDestinations,
      //   state.destinations
      // );
    },
    clearTrip(state) {
      //clear the destination array to initial after creation of a trip
      state.destinations = [];
    },
  },
});

export default createTripSlice.reducer;

export const {
  activateCreateTripModal,
  deActivateCreateTripModal,
  createTrip,
  clearTrip,
  removeDestination,
} = createTripSlice.actions;
