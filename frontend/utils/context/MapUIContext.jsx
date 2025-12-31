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
