import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import cafe from "../../../assets/images/places/cafe.jpg";

export default function PlacesByCategoryScreen({ category }) {
  const [placesData, setPlacesData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { selectedCoords } = useSelector((store) => store.nearByPlaces);

  //   useEffect(() => {}, [selectedCoords]);
  console.log("clicked location on map cords updated: ", selectedCoords);

  // EXPO_PUBLIC_GEOAPIFY_PLACES_API;
  useEffect(() => {
    async function getNearbyPlaces() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://api.geoapify.com/v2/places?categories=${category}&filter=circle:${selectedCoords.lon},${selectedCoords.lat},5000&limit=20&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_PLACES_API}`
        );

        const data = await res.json();

        setPlacesData(data);

        // console.log("Places data fetched: ", data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error occured in fetching places data: ", error.message);
      }
    }
    getNearbyPlaces();
  }, [selectedCoords.lat, selectedCoords.lon, category]);

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <View className="flex-row items-center gap-4 px-4 py-2">
        <Pressable onPress={() => router.back()}>
          <AntDesign name="arrow-left" size={24} color="grey" />
        </Pressable>
      </View>

      <View className="flex-1 p-4 ">
        {isLoading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          placesData && <RenderPlacesData placesData={placesData} />
        )}
      </View>
    </View>
  );
}
function RenderPlacesData({ placesData }) {
  // console.log("Places data:", placesData.features);
  const router = useRouter();
  return (
    <View className="flex-1 bg-white">
      <Text className="text-xl font-semibold text-center text-purple-500">
        Nearby Places
      </Text>
      <FlatList
        data={placesData.features}
        keyExtractor={(item) => item.properties.place_id}
        renderItem={({ item }) => (
          <View
            key={item.properties.place_id}
            className="flex-row items-center bg-white  rounded-lg p-3 m-2 shadow-lg"
          >
            <Image
              source={cafe}
              className="h-20 w-20 rounded-lg"
              resizeMode="cover"
            />

            <View className="flex-1 ml-4">
              <Text className="font-bold text-lg">{item.properties.name}</Text>
              <Text className="text-gray-600 text-sm mt-1">
                {item.properties.formatted}
              </Text>
              <View className="flex-row items-center mt-1">
                <Text className="text-yellow-500 font-bold mr-1">4.6</Text>
                <Text className="text-gray-500 text-sm">(497)</Text>
              </View>
              <Text className="text-gray-500 text-sm mt-1">$$$ • Indian</Text>
              <Text className="text-green-600 text-sm mt-1">
                Open until 12 AM
              </Text>
            </View>

            <View className="ml-2 rounded-full border p-2 bg-sky-200">
              <Pressable
                onLongPress={() =>
                  ToastAndroid.show("View Details", ToastAndroid.SHORT)
                }
                onPress={() =>
                  router.push(`/placeDetails/${item.properties.place_id}`)
                }
              >
                <Feather name="external-link" size={20} color="black" />
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}
