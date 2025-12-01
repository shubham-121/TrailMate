import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import avatar from "../../assets/images/searchbar/avatar.png";
import mapLogo from "../../assets/images/searchbar/mapLogo.png";

export default function SearchBar() {
  const [isSearchBarClicked, setIsSearchBarClicked] = useState(false);
  const [isNearByClicked, setIsNearByClicked] = useState(false);

  const router = useRouter();

  const insets = useSafeAreaInsets();

  function navigateToSearchScreen() {
    return router.push("/searchLocation");
  }

  return (
    <View
      className="absolute z-50 w-full items-center"
      style={{ top: insets.top }}
    >
      <View className="bg-white rounded-[20px]">
        <View className="flex flex-row justify-center items-center gap-1 px-3 py-2">
          <Image source={mapLogo} className="h-6 w-6" resizeMode="contain" />
          <Pressable onPress={navigateToSearchScreen}>
            <View pointerEvents="none">
              <TextInput placeholder="Search Here" className="p-2 w-96" />
            </View>
          </Pressable>
          <Image source={avatar} className="h-6 w-6" resizeMode="contain" />
        </View>
      </View>

      <View className="border-2 border-gray-400 mt-2 rounded-lg px-2 py-1 bg-white/70">
        <Pressable onPress={() => router.push("/placeCategories")}>
          <Text className="text-center font-semibold text-[15px]">
            Explore Nearby
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
