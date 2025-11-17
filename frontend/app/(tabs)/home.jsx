import { View, Text, StyleSheet } from "react-native";
import React from "react";
import RegisterScreen from "../../components/auth/Signup";
import LoginScreen from "../../components/auth/Login";

export default function home() {
  return (
    <View style={styles.container}>
      {/* <LoginScreen></LoginScreen> */}
      <Text>Home component </Text>
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
