import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Link, useRouter } from "expo-router";

export default function Explore() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text>explore</Text>
      <Text onPress={() => router.push("/login")} className="text-blue-500">
        GO to login page
      </Text>
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
