import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ConfirmTripCreation from "../../../../components/trips/createTrip/ConfirmTripCreation";

export default function SaveTrip() {
  return (
    <View style={{ flex: 1 }}>
      <ConfirmTripCreation />
    </View>
  );
}
