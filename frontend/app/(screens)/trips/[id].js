import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function TripWithID() {
  return (
    <View style={styles.container}>
      <Text>TripWithID screen</Text>
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
