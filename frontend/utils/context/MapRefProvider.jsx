import { createContext, useRef } from "react";

export const MapRefContext = createContext({
  mapRef: null,
  recenter: () => {},
});

export function MapRefProvider({ children }) {
  const mapRef = useRef(null); //for passing the ref across the application

  const recenter = (region) => {
    if (mapRef.current) mapRef.current?.animateToRegion(region, 5000);
  };

  return (
    <MapRefContext.Provider value={{ mapRef, recenter }}>
      {children}
    </MapRefContext.Provider>
  );
}
