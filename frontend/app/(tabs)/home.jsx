import { View, StyleSheet } from "react-native";
import React from "react";

import HomeScreen from "../../components/home/HomeScreen";

export default function HomeTab() {
  return (
    <View style={styles.container}>
      <HomeScreen></HomeScreen>
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
