import { createContext, useState } from "react";

export const MapUIContext = createContext({
  markerPosition: null,
  setMarkerPosition: () => {},
  isPopupVisible: false,
  setIsPopupVisible: () => {},

  markerData: null,
  setMarkerData: () => {},
  tripData: null,
  setTripData: () => {},
});

export function MapUIProvider({ children }) {
  const [markerPosition, setMarkerPosition] = useState(null); //marker for user click on map
  const [isPopupVisible, setIsPopupVisible] = useState(false); //popup for location details of place clicked by user where marker is placed
  const [markerData, setMarkerData] = useState(null); //holds the marker data after reverse geocoding
  const [tripData, setTripData] = useState(null); //for createTripSlice data in redux

  return (
    <MapUIContext.Provider
      value={{
        markerPosition,
        setMarkerPosition,
        isPopupVisible,
        setIsPopupVisible,
        markerData,
        setMarkerData,
        tripData,
        setTripData,
      }}
    >
      {children}
    </MapUIContext.Provider>
  );
}

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
