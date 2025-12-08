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

//fetch via api here
export default function SuggestedPlaces() {
  return (
    <View className="px-4 mt-4">
      <Text className="text-lg font-semibold mb-3">
        Suggested places around you
      </Text>

      <RenderSuggestedPlaces />
    </View>
  );
}

function RenderSuggestedPlaces() {
  return (
    <View>
      <FlatList
        horizontal
        data={placesObj}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 4, gap: 16 }}
        renderItem={({ item }) => (
          <View className="items-center">
            <Pressable className="rounded-full shadow-md overflow-hidden">
              <Image
                source={item.image}
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
              {item.name}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const placesObj = [
  { id: 1, name: "Harshil", image: homeBg },
  { id: 2, name: "Goa", image: homeBg },
  { id: 3, name: "Agra", image: homeBg },
  { id: 4, name: "Shimla", image: homeBg },
  { id: 5, name: "Udaipur", image: homeBg },
];
