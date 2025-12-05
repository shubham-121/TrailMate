import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import homeBg from "../../../assets/images/home/homeBg.avif";
import Entypo from "@expo/vector-icons/Entypo";

export default function ShowTrips() {
  const [tripsPresent, setTripsPresent] = useState(true);

  return (
    <View className="px-4 mt-4">
      <FlatList
        scrollEnabled={false}
        data={tripObj}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <TripCard item={item} />}
      />

      <View className=" ">
        <Pressable className=" m-2 p-3 rounded-[20px]  border-gray-500 bg-[#d89cef]">
          <Text className="text-center font-semibold  text-lg">
            Create A New Trip +
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
function TripCard({ item }) {
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
          <Text className="text-lg font-semibold">{item.tripName}</Text>
          <Text className="text-gray-500 text-sm">{item.location}</Text>
        </View>

        <View className="justify-center px-3 rounded-full bg-gray-300/30">
          <Pressable className="flex-row items-center gap-2">
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
              <Text className="text-black font-semibold">8h 15m</Text>
              <Text className="text-gray-500 text-xs">Duration</Text>
            </View>
          </View>

          {/* row 2 */}
          <View className="flex-row gap-2 px-2 py-2 justify-between">
            <View className="mt-4 flex-shrink">
              <View className="h-2 bg-gray-200 rounded-full w-24 overflow-hidden">
                <View
                  className="h-2 bg-pink-500 rounded-full"
                  style={{ width: "60%" }}
                />
              </View>
              <Text className="text-gray-500 text-xs mt-1">
                {item.level} Level
              </Text>
            </View>
            <View className=" flex-shrink">
              <Text className="text-black font-semibold">
                {item.rating} <Text className="text-yellow-500">⭐</Text>
              </Text>
              <Text className="text-gray-500 text-xs">Rating</Text>
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

const tripObj = [
  {
    id: 1,
    tripName: "Shimla Diaries",
    location: "Himachal Pradesh, India",
    duration: "7 days",
    distance: "450km",
    elevation: "1900 m",
    level: "easy",
    rating: "4.2",
  },
  {
    id: 2,
    tripName: "Goa Coastal Escape",
    location: "Goa, India",
    duration: "5 days",
    distance: "620km",
    elevation: "15 m",
    level: "easy",
    rating: "4.5",
  },

  {
    id: 3,
    tripName: "Jaipur Heritage Trail",
    location: "Rajasthan, India",
    duration: "4 days",
    distance: "280km",
    elevation: "431 m",
    level: "easy",
    rating: "4.1",
  },
];
