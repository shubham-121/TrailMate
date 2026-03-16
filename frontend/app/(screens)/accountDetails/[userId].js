import { View, Text } from "react-native";
import React from "react";
import AccountDetailsScreen from "../../../components/account/AccountDetails";
import { useLocalSearchParams } from "expo-router";

export default function AccountDetailsByID() {
  const { userId } = useLocalSearchParams();

  console.log("user id is:", userId);

  return (
    <View style={{ flex: 1 }}>
      <AccountDetailsScreen userId={userId} />
    </View>
  );
}
