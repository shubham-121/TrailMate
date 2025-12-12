import { View, Text, StyleSheet } from "react-native";
import React from "react";
import DestinationDescriptionScreen from "../../../../components/trips/DestinationDescription/DestinationDescriptionScreen";

export default function AddDescription() {
  return (
    <View style={{ flex: 1 }}>
      <DestinationDescriptionScreen />
    </View>
  );
}
