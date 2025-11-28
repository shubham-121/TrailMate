import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "../redux/store";

export default function RootLayout() {
  return (
    <>
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
    </>
  );
}
