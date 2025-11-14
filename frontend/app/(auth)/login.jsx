import { View, Text, StyleSheet } from "react-native";
import React from "react";
import LoginScreen from "../../components/auth/Login";

export default function login() {
  return (
    <View className="flex-1">
      <LoginScreen></LoginScreen>
    </View>
  );
}
