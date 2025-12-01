import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import cafe from "../../../assets/images/places/cafe.jpg";

export default function SubCategoryScreen({ category }) {
  const [placesData, setPlacesData] = useState(null);
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { selectedCoords } = useSelector((store) => store.nearByPlaces);

  //   useEffect(() => {}, [selectedCoords]);
  console.log("clicked location on map cords updated: ", selectedCoords);

  // EXPO_PUBLIC_GEOAPIFY_PLACES_API;
  useEffect(() => {
    async function getNearbyPlaces() {
      try {
        const res = await fetch(
          `https://api.geoapify.com/v2/places?categories=${category}&filter=circle:${selectedCoords.lon},${selectedCoords.lat},5000&limit=20&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_PLACES_API}`
        );

        const data = await res.json();

        setPlacesData(data);

        console.log("Places data fetched: ", data);
      } catch (error) {
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
        {/* <Text>{category}</Text> */}
        {placesData && <RenderPlacesData placesData={placesData} />}{" "}
      </View>
    </View>
  );
}
function RenderPlacesData({ placesData }) {
  console.log("Places data:", placesData.features);
  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={placesData.features}
        keyExtractor={(item) => item.properties.place_id}
        renderItem={({ item }) => (
          <View
            key={item.properties.place_id}
            className="flex-row items-center bg-white  rounded-lg p-3 m-2 shadow-lg"
          >
            {/* Replace 'cafe' with dynamic map/static image if needed */}
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
              <Pressable>
                <Feather name="external-link" size={20} color="black" />
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}

//mock api example for Places api
// https://api.geoapify.com/v2/places?categories=commercial&filter=circle:78.019554,30.352642,5000&limit=20&apiKey=478474f7b5fc4d83b33e5507a076eaa9
