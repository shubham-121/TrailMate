const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  isTripNavigationMode: false,
  currentDestinationIndex: 0, //track current destination index
  currentDestinationData: null,
  lastDestinationIndex: 0,
  destinations: [], //holds all the destinations
  trip: {},
  tripId: null,
};

const tripNavigationSlice = createSlice({
  name: "tripNavigation",
  initialState,
  reducers: {
    startTrip(state, action) {
      const { allTripDestinations, tripId } = action.payload;

      state.isTripNavigationMode = true;
      state.destinations = allTripDestinations;
      state.tripId = tripId || null;

      state.currentDestinationIndex = 0;
      state.lastDestinationIndex = allTripDestinations.length - 1;

      state.currentDestinationData = allTripDestinations[0];

      console.log("All the destinations inside a trip:", allTripDestinations);
    },
    nextDestination(state, action) {
      if (state.currentDestinationIndex < state.lastDestinationIndex) {
        state.currentDestinationIndex += 1;
        state.currentDestinationData =
          state.destinations[state.currentDestinationIndex];
      }

      console.log(
        "Next destination is: ",
        state.currentDestinationData,
        state.currentDestinationIndex
      );
    },
    previousDestination(state, action) {
      if (state.currentDestinationIndex > 0) {
        state.currentDestinationIndex -= 1;
        state.currentDestinationData =
          state.destinations[state.currentDestinationIndex];
      }

      console.log(
        "Previous destination is: ",
        state.currentDestinationData,
        state.currentDestinationIndex
      );
    },
    endTrip(state) {
      return initialState;
    },
  },
});

export default tripNavigationSlice.reducer;

export const { startTrip, endTrip, nextDestination, previousDestination } =
  tripNavigationSlice.actions;

//Create route navigation slice for handling trip navigation
// App has 2 modes : exploration mode (no changes needed, keep as it is)
//                   trip navigation mode (create slice for managing this)

// Start route button pressed
//   |
// route to map Component, show marker and popup with rev geocode data or data from DB
//   |
// isTripNavigMode: true , if true disbale any other clicks on map so that other popup and marker dont showw up
//   |
// animate to first location on map, show marker and a popoup with 3 options (prev , show detail  ,next)
//   |
// disable next on last destination and prev on first destination
//   |
// later add  polylines connecting the whole trip destinations

////////////////////////////////////////this was the starting code for this slice: //////////////
