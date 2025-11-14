import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function favourites() {
  return (
    <View style={styles.container}>
      <Text>favourites</Text>
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
