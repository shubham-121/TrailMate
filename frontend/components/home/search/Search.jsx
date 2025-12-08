import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";

export default function Search() {
  return (
    <View className="px-4 mt-6">
      <SearchBar />
    </View>
  );
}

function SearchBar() {
  return (
    <View className="flex flex-row items-center bg-white rounded-full px-4 py-2 shadow-md mb-6">
      <Text className="text-xl mr-2">🔍</Text>

      <TextInput
        placeholder="Search your trips"
        placeholderTextColor="#888"
        className="flex-1 text-base"
      />
    </View>
  );
}
