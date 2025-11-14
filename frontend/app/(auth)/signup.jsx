import { View, Text, StyleSheet } from "react-native";
import React from "react";
import RegisterScreen from "../../components/auth/Signup";

export default function signup() {
  return (
    <View className="flex-1">
      <RegisterScreen></RegisterScreen>
    </View>
  );
}
