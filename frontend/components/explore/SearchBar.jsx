import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import avatar from "../../assets/images/searchbar/avatar.png";
import mapLogo from "../../assets/images/searchbar/mapLogo.png";

export default function SearchBar() {
  const [isSearchBarClicked, setIsSearchBarClicked] = useState(false);
  const router = useRouter();

  const insets = useSafeAreaInsets();

  function navigateToSearchScreen() {
    return router.push("/searchLocation");
  }

  return (
    <View
      className="absolute z-50  bg-white rounded-[20px]  "
      style={{ top: insets.top }}
    >
      <View className="flex flex-row  justify-center items-center gap-1 px-3 py-2">
        <Image
          source={mapLogo}
          className="h-6 w-6"
          resizeMode="contain"
        ></Image>
        <Pressable onPress={navigateToSearchScreen}>
          <View pointerEvents="none">
            <TextInput
              placeholder="Search Here "
              className="p-2  w-96 "
            ></TextInput>
          </View>
        </Pressable>

        <Image source={avatar} className="h-6 w-6" resizeMode="contain"></Image>
      </View>
    </View>
  );
}
