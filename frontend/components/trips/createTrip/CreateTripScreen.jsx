import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function CreateTripScreen() {
  return (
    <View style={styles.container}>
      <Text>CreateTripScreen it is</Text>
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
