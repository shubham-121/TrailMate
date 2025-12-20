import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CreateTripScreen from "../../../../components/trips/createTrip/CreateTripScreen";

export default function SaveTrip() {
  return (
    <View style={{ flex: 1 }}>
      <CreateTripScreen />
    </View>
  );
}
