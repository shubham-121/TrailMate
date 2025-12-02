import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { createContext, useRef } from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";

export const MapRefContext = createContext({
  mapRef: null,
  recenter: () => {},
});

export default function RootLayout() {
  const mapRef = useRef(null); //for passing the ref across the application

  const recenter = (region) => {
    if (mapRef.current) mapRef.current?.animateToRegion(region, 5000);
  };

  return (
    <>
      <MapRefContext.Provider value={{ mapRef, recenter }}>
        <Provider store={store}>
          <StatusBar
            style="auto "
            translucent={false}
            backgroundColor="transparent"
          ></StatusBar>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="(tabs)"
              options={{ headerShown: false }}
            ></Stack.Screen>

            <Stack.Screen
              name="(screens)"
              options={{ headerShown: false }}
            ></Stack.Screen>
          </Stack>
        </Provider>
      </MapRefContext.Provider>
    </>
  );
}
