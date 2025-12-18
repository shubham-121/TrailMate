import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  FlatList,
} from "react-native";
import React from "react";
import homeBg from "../../../assets/images/home/homeBg.avif";
import { suggestedPlacesApi } from "../../../utils/commonFunctions/suggestedPlacesApi";
import { useRouter } from "expo-router";

//fetch via api here
export default function SuggestedPlaces() {
  const router = useRouter();
  return (
    <View className="px-4 mt-4">
      <View className="flex flex-row items-center justify-between">
        <Text className="text-lg font-semibold mb-3">
          Suggested places around you
        </Text>

        <Pressable onPress={() => router.push("/suggestedPlaces")}>
          <Text className="text-lg font-medium mb-2 text-blue-500 underline">
            View All
          </Text>
        </Pressable>
      </View>

      <RenderSuggestedPlaces />
    </View>
  );
}

function RenderSuggestedPlaces() {
  return (
    <View>
      <FlatList
        horizontal
        data={suggestedPlacesApi}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 4, gap: 16 }}
        renderItem={({ item }) => (
          <View className="items-center">
            <Pressable className="rounded-full shadow-md overflow-hidden  border-2 border-blue-400">
              <Image
                source={{ uri: item.image }}
                style={{
                  height: 70,
                  width: 70,
                  borderRadius: 35,
                  resizeMode: "cover",
                }}
              />
            </Pressable>

            <Text
              className="mt-2 text-sm font-medium text-gray-700"
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ maxWidth: 80 }}
            >
              {item.placeName}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
