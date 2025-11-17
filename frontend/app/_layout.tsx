import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { store } from "../redux/store";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
    <>
      <Provider store={store}>
        <StatusBar
          style="auto "
          translucent
          backgroundColor="transparent"
        ></StatusBar>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          ></Stack.Screen>
        </Stack>
      </Provider>
    </>
  );
}
