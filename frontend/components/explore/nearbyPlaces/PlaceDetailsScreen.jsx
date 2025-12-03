//fetches the place details with placeID using the PlaceDetailsId api

import { AntDesign } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import cafe from "../../../assets/images/places/cafe.jpg";
import { setShowOnMapCoords } from "../../../redux/slices/nearByPlacesSlice";

export default function PlaceDetailsScreen({ placeId }) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <View className="flex-1 p-1 ">
        <View className="flex-row items-center gap-4 px-4 py-2">
          <Pressable onPress={() => router.back()}>
            <AntDesign name="arrow-left" size={24} color="grey" />
          </Pressable>
        </View>
        <FetchPlaceDetails placeId={placeId}></FetchPlaceDetails>
      </View>
    </View>
  );
}

function FetchPlaceDetails({ placeId }) {
  const [placeDetailsData, setPlaceDetailsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [showLoginModal, setShowLoginModal] = useState(false);

  const { access_token, isAuthenticated } = useSelector(
    (store) => store.authentication
  );

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchPlaceDetails() {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://api.geoapify.com/v2/place-details?id=${placeId}&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_PLACE_DETAILS_API}`
        );

        const data = await res.json();

        if (!data) {
          setIsLoading(false);
          console.error("Error in fetching the Places Details");
          return;
        }

        // console.log("Place Details: ", data.features);
        setPlaceDetailsData(data.features);

        setIsLoading(false);
      } catch (error) {
        console.error("Error in fetching the Places Details: ", error.message);
        setIsLoading(false);
      }
    }
    fetchPlaceDetails();
  }, [placeId]);

  //   console.log("placedetailsData: ", placeDetailsData);

  function handleAddToFavourites() {
    if (!access_token || !isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    // saveToFavourites()
    console.log("Added to your favourites list");
  }

  function handleShowOnMap() {
    if (!placeDetailsData) return;

    const lat = placeDetailsData[0].properties.lat;
    const lon = placeDetailsData[0].properties.lon;

    console.log("show on map coords: ", lat, lon);

    //1-dispatch action  to update the state in redix
    dispatch(setShowOnMapCoords({ lat, lon }));

    return router.navigate("(tabs)/explore");
  }

  return (
    <>
      {isLoading ? (
        <View className="flex-1 items-center">
          <ActivityIndicator size="large" color="skyblue" />
        </View>
      ) : (
        placeDetailsData && (
          <View className="flex-1 bg-white p-4 m-2">
            <View className="border rounded-lg overflow-hidden shadow-md flex-1 items-center bg-white">
              <Image
                source={cafe}
                style={{
                  height: 450,
                  width: "100%",
                  //   resizeMode: "cover",
                  objectFit: "contain",
                }}
              />

              <Text className="text-2xl font-bold mt-4 text-gray-800">
                {placeDetailsData[0].properties.name}
              </Text>
              <Text className="text-sm text-gray-500 mt-1 text-center px-4">
                {placeDetailsData[0].properties.formatted}
              </Text>

              <View className="flex-row flex-wrap justify-center mt-2 px-4">
                {placeDetailsData[0].properties.categories?.map((cat, idx) => (
                  <View
                    key={idx}
                    className="bg-sky-100 px-3 py-1 rounded-full m-1 border border-sky-200"
                  >
                    <Text className="text-sky-700 text-xs capitalize">
                      {cat.replace("catering.", "")}
                    </Text>
                  </View>
                ))}
              </View>

              <View className="flex-row justify-around w-full mt-6 px-4">
                <Pressable className="bg-sky-100 border border-sky-200 rounded-full items-center justify-center p-2 shadow">
                  <AntDesign name="share-alt" size={28} color="skyblue" />
                </Pressable>

                <Pressable className="bg-sky-100 border border-sky-200 rounded-full items-center justify-center p-2 shadow">
                  <View className="items-center">
                    <Text className="text-xs font-medium mb-1 text-gray-700">
                      Directions
                    </Text>
                    <FontAwesome5 name="directions" size={28} color="skyblue" />
                  </View>
                </Pressable>

                <Pressable
                  onPress={handleShowOnMap}
                  className="bg-sky-100 border border-sky-200 rounded-full items-center justify-center p-2 shadow"
                >
                  <View className="items-center">
                    <Text className="text-xs font-medium mb-1 text-gray-700">
                      Show on map
                    </Text>
                    <FontAwesome5 name="map" size={28} color="skyblue" />
                  </View>
                </Pressable>

                <Pressable
                  onPress={() => {
                    handleAddToFavourites();
                  }}
                  className="bg-sky-100 border border-sky-200 rounded-full items-center justify-center p-2 shadow"
                >
                  <View className="items-center">
                    <Text className="text-xs font-medium mb-1 text-gray-700">
                      Add To Favourites
                    </Text>
                    <Fontisto name="favorite" size={28} color="skyblue" />
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
        )
      )}

      {showLoginModal && (
        <View className="absolute inset-0 bg-black/20 justify-center items-center z-50">
          <View className="bg-white p-6 rounded-lg w-4/5">
            <Text className="text-lg font-semibold text-center mb-3">
              Login Required
            </Text>

            <Text className="text-center text-gray-600 mb-4">
              You need to login to save places to your favourites.
            </Text>

            <View className="flex-row justify-between">
              <Pressable
                className="bg-gray-200 px-4 py-2 rounded-lg"
                onPress={() => setShowLoginModal(false)}
              >
                <Text className="text-gray-700">Cancel</Text>
              </Pressable>

              <Pressable
                className="bg-sky-500 px-4 py-2 rounded-lg"
                onPress={() => router.push("/login")}
              >
                <Text className="text-white font-semibold">Login</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </>
  );
}
