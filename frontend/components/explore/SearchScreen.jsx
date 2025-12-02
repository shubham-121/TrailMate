import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import mapLogo from "../../assets/images/searchbar/mapLogo.png";

import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedLocation } from "../../redux/slices/searchBarSlice";

export default function SearchScreen() {
  const [inputLocation, setInputLocation] = useState(""); //for searchbar input
  const [inputLocationData, setInputLocationData] = useState(null); //for storing api data of searched location

  const insets = useSafeAreaInsets();
  const router = useRouter();

  const searchBarFocusRef = useRef(null);

  useEffect(() => {
    searchBarFocusRef.current.focus();
  }, []);

  async function searchLocation() {
    try {
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${inputLocation}&apiKey=6cdbf895773941faa8887b3fccec9390`
      );

      if (!res.status === 200) {
        console.error("Error ocuured in fetching the searched location");
        return;
      }

      const data = await res.json();

      setInputLocationData(data.features);

      console.log("Input location data : ", data, inputLocation);
    } catch (error) {
      console.error(
        "Error ocuured in fetching the searched location, try again!",
        error.message
      );
      return;
    }
  }

  return (
    <>
      <View
        className="absolute z-50  bg-white rounded-[20px]  "
        style={{ top: insets.top }}
      >
        <View className="flex flex-row  justify-center items-center gap-1 px-3 py-2">
          <Pressable onPress={() => router.back()}>
            <AntDesign name="arrow-left" size={24} color="grey" />
          </Pressable>
          <Pressable>
            <View>
              <TextInput
                value={inputLocation}
                onChangeText={setInputLocation}
                placeholder="Search Here "
                className="p-2  w-96 "
                ref={searchBarFocusRef}
                autoFocus
              ></TextInput>
            </View>
          </Pressable>
          <Pressable>
            <FontAwesome name="microphone" size={24} color="black" />
          </Pressable>
        </View>

        <Pressable className="border-2 p-4 mt-2" onPress={searchLocation}>
          <Text>Search</Text>
        </Pressable>

        {inputLocationData && (
          <RenderSearchedData
            inputLocationData={inputLocationData}
            setInputLocationData={setInputLocationData}
          />
        )}
      </View>
    </>
  );
}
function RenderSearchedData({ inputLocationData, setInputLocationData }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const { latitude, longitude, formattedString } = useSelector(
    (store) => store.searchBar
  );

  console.log("locations updated: ", latitude, longitude, formattedString);

  if (!inputLocationData || inputLocationData.length === 0) return null;

  function handleUserSelectedLocation(
    formattedString,
    selectedLat,
    selectedLon
  ) {
    const coords = {
      latitude: selectedLat,
      longitude: selectedLon,
    };
    // console.log("Formatted :", formattedString);

    dispatch(setSearchedLocation({ coords, formattedString })); //set the serachbar data globally for moving map animation after click
    router.back();
  }

  return (
    <View className="w-full bg-white">
      <FlatList
        data={inputLocationData}
        keyExtractor={(item) => item.properties.place_id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              handleUserSelectedLocation(
                item.properties.formatted,
                item.properties.lat,
                item.properties.lon
              );
            }}
            className="flex flex-row items-center py-3 px-4 border-b border-gray-200"
          >
            <Image
              source={mapLogo}
              className="h-6 w-6 mr-3"
              resizeMode="contain"
            />

            <View className="flex-1 gap-1">
              <Text className="text-base font-semibold text-gray-800">
                {item.properties.formatted}
              </Text>

              {/* <Text className="text-sm text-gray-500" numberOfLines={1}>
                {item.display_name}
              </Text> */}
            </View>

            <AntDesign name="right" size={18} color="gray" />
          </Pressable>
        )}
      />
    </View>
  );
}
