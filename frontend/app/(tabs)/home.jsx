import { View, StyleSheet } from "react-native";
import React from "react";

import HomeScreen from "../../components/home/HomeScreen";
import AppLoader from "../../components/auth/AppLoader";

export default function HomeTab() {
  return (
    <View style={styles.container}>
      <AppLoader>
        <HomeScreen></HomeScreen>
      </AppLoader>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
