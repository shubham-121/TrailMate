import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { suggestedPlacesApi } from "../../../utils/commonFunctions/suggestedPlacesApi";
import PlacesCards from "../../../utils/commonComponents/PlacesCards";
import { useRouter } from "expo-router";

export default function SuggestedPlacesScreen() {
  const { top } = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: top }} className="border-2 flex-1 ">
      <Text className="text-xl font-bold text-purple-600 text-center">
        Suggested Places For You
      </Text>

      <RenderSuggestedPlaces />
    </View>
  );
}
function RenderSuggestedPlaces() {
  const router = useRouter();

  return (
    <View className="flex-1 px-3">
      <FlatList
        data={suggestedPlacesApi}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <PlacesCards
            item={item}
            onExplore={(item) =>
              router.push({
                pathname: `suggestedPlaces/${item.placeName}`,
                params: { placeObj: JSON.stringify(item) },
              })
            }
          />
        )}
      />
    </View>
  );
}
