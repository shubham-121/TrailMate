import { View, Text, FlatList, Image, Pressable } from "react-native";
import React, { useContext } from "react";
import homeBg from "../../../assets/images/home/homeBg.avif";
import Entypo from "@expo/vector-icons/Entypo";
import ShowTripSkeletonLoader from "../../../utils/commonComponents/ShowTripSkeletonLoader";
import { useRouter } from "expo-router";

import { useDispatch, useSelector } from "react-redux";
import { deActivateCreateTripModal } from "../../../redux/slices/createTripSlice";
import { MapRefContext } from "../../../utils/context/MapRefProvider";
import { MapUIContext } from "../../../utils/context/MapUIContext";
import { reverseGeocodeLocation } from "../../../utils/commonFunctions/reverseGeocodeLocation";
import { startTrip } from "../../../redux/slices/tripNavigationSlice";

export default function ShowTrips({ userTrips, setUserTrips }) {
  // const [tripsPresent, setTripsPresent] = useState(true);
  const router = useRouter();

  return (
    <View className="px-4 mt-4">
      <FlatList
        scrollEnabled={false}
        // data={tripObj}
        data={userTrips}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <TripCard item={item} />}
      />

      <View className=" ">
        <Pressable
          className=" m-2 p-3 rounded-[20px]  border-gray-500 bg-[#d89cef]"
          onPress={() => router.push("/trips")}
        >
          <Text className="text-center font-semibold  text-lg">See More</Text>
        </Pressable>
        <Pressable className=" m-2 p-3 rounded-[20px]  border-gray-500 bg-[#d89cef]">
          <Text className="text-center font-semibold  text-lg">
            Create A New Trip +
          </Text>
        </Pressable>
      </View>

      {/* skeleton loader for loading the trips in home screen */}
      <ShowTripSkeletonLoader />
    </View>
  );
}
function TripCard({ item }) {
  const tripLength = item.tripDestinations.length;

  // console.log(
  //   "trips is : ",
  //   item,
  //   "and total destination present in a trips is: ",
  //   tripLength
  // );

  const { setMarkerPosition, setIsPopupVisible, setMarkerData } =
    useContext(MapUIContext);
  const { mapRef } = useContext(MapRefContext);

  const { isCreatingTrip } = useSelector((store) => store.createTrip);

  const router = useRouter();
  const dispatch = useDispatch();

  async function handleStartRoute() {
    const { destinationCoords } = item.tripDestinations[0].destinationDetails;
    // const allTripDestinations = item.tripDestinations; //contains all destinations of one trip

    //prettier-ignore
    const {tripDestinations:allTripDestinations, _id:tripId,  tripTitle, userId}=item

    // console.log("start route:", destinationCoords);
    // console.log("current destination: ", item.tripDestinations[0]);

    // console.log("Item is: ", item);

    //1-hide the trip drawer if active
    if (isCreatingTrip) dispatch(deActivateCreateTripModal());

    //2- open map section
    router.push("/explore");

    //3- animate to the first destination present in DB to the map
    setTimeout(async () => {
      mapRef.current.animateToRegion(
        {
          latitude: destinationCoords.lat,
          longitude: destinationCoords.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        5000
      );

      setMarkerPosition({
        latitude: destinationCoords.lat,
        longitude: destinationCoords.lng,
      });

      //setMarkerData  by reverse geocoding
      const reverseGeocodeData = await reverseGeocodeLocation({
        latitude: destinationCoords.lat,
        longitude: destinationCoords.lng,
      });

      // console.log("reverse geocode function return data: ", reverseGeocodeData);

      setMarkerData(reverseGeocodeData[0].formattedAddress);

      setIsPopupVisible(true);

      console.log("animating...");

      //trip navigation logic here
      // dispatch(startTrip({ tripLength, firstDestination }));
      dispatch(startTrip({ allTripDestinations, tripId }));
    }, 1000);
  }

  const width = getStaticDifficulty(item);

  return (
    <View className="bg-white rounded-2xl shadow-md mb-6 overflow-hidden p-2">
      {/* Image Section */}
      <Image
        source={homeBg}
        style={{ width: "100%", height: 180, borderRadius: 20 }}
        resizeMode="cover"
      />

      {/* Content */}
      <View className="p-4 flex-row justify-between">
        <View>
          <Text className="text-lg font-semibold">{item.tripTitle}</Text>
          <Text className="text-gray-500 text-sm">{item.location}</Text>
        </View>

        <View className="justify-center px-3 rounded-full bg-gray-300/30">
          <Pressable
            className="flex-row items-center gap-2"
            onPress={handleStartRoute}
          >
            <Text>Start Route</Text>
            <Entypo name="direction" size={24} color="black" />
          </Pressable>
        </View>
      </View>

      {/* Details */}
      <View className="flex-row">
        <View className="flex-col gap-1 flex-1">
          {/* row 1 */}
          <View className="flex-row gap-4 py-2 px-2">
            <View>
              <Text className="text-black font-semibold">12.4km</Text>
              <Text className="text-gray-500 text-xs">Distance</Text>
            </View>
            <View>
              <Text className="text-black font-semibold">840m</Text>
              <Text className="text-gray-500 text-xs">Elevation</Text>
            </View>
            <View>
              <Text className="text-black font-semibold">
                {item.tripNumberOfDays} Days
              </Text>
              <Text className="text-gray-500 text-xs">Duration</Text>
            </View>
          </View>

          {/* row 2 */}
          <View className="flex-row px-2 py-2 justify-between items-center">
            {/* Difficulty */}
            <View className="flex-1 mr-2">
              <Text className="text-gray-700 text-sm">Difficulty</Text>
              <View className="h-2 bg-gray-200 rounded-full w-full overflow-hidden mt-1">
                <View
                  className="h-2 bg-pink-500 rounded-full"
                  style={{ width: `${width}%` }}
                />
              </View>

              <View className="self-start mt-2 bg-pink-100 px-3 py-1 rounded-full">
                <Text className="text-pink-700 text-xs font-semibold">
                  {item.tripCategory}
                </Text>
              </View>
            </View>

            {/* Rating */}
            <View className="flex-1 ml-2 items-center">
              <Text className="text-gray-500 text-md">Rating</Text>

              <Text className="text-black font-semibold text-sm">
                4.2 <Text className="text-yellow-500">⭐</Text>
              </Text>
            </View>
          </View>
        </View>

        {/*child-2 map thumb here */}
        <View className="flex-[0.8] bg-gray-300 rounded-2xl justify-center items-center shadow-sm m-2 min-w-[10px]">
          <Text className="text-xs text-gray-600">🗺️</Text>
          <Text className="text-[10px] text-gray-500 mt-1">View Map</Text>
        </View>
      </View>
    </View>
  );
}

function getStaticDifficulty(item) {
  const difficultyMap = {
    Easy: 30,
    Moderate: 60,
    Hard: 90,
  };

  const difficulty = item.tripDifficulty;
  const width = difficultyMap[difficulty] || 40;

  return width;
}
