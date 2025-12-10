import { View, Text, StyleSheet } from "react-native";
import React from "react";
import TripsScreen from "../../../components/trips/TripsScreen";

export default function Trips() {
  return (
    <View>
      {/* <Text> trips index index</Text> */}
      <TripsScreen></TripsScreen>
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
