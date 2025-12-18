import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function PlacesCards({ item, onExplore, addToTrip }) {
  const router = useRouter();
  return (
    <View className="bg-white rounded-2xl shadow-md mb-5 overflow-hidden">
      <Image
        source={{ uri: item.image }}
        style={{ height: 200, width: "100%" }}
      />

      <View className="p-4">
        <Text className="text-xl font-bold text-gray-800">
          {item.placeName}
        </Text>

        <Text className="text-sm text-gray-500 mt-1">
          {item.details.city}, {item.details.state}
        </Text>

        <View className="flex-row flex-wrap mt-3">
          {item?.categories.map((cat, index) => (
            <View
              key={index}
              className="bg-purple-100 px-3 py-1 rounded-full mr-2 mb-2"
            >
              <Text className="text-xs text-purple-700 font-medium">{cat}</Text>
            </View>
          ))}
        </View>

        <Text className="text-gray-700 text-sm mt-3" numberOfLines={3}>
          {item.details.description}
        </Text>

        <View className="mt-3">
          <Text className="text-xs text-gray-500">Best time to visit</Text>
          <Text className="text-sm font-medium text-gray-800">
            {item.details.bestTimeToVisit}
          </Text>
        </View>

        <View className="mt-4 flex-row justify-between">
          <Pressable className="bg-purple-600 px-4 py-2 rounded-xl">
            <Text className="text-white font-semibold">Add To Trip</Text>
          </Pressable>
          <Pressable
            className="bg-purple-600 px-6 py-2 rounded-xl"
            onPress={onExplore}
          >
            <Text className="text-white font-semibold">Explore</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
