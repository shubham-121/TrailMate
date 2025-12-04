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
        <Pressable className=" m-2 p-3 rounded-[20px] border-2 border-gray-500 bg-[#d89cef]">
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
    <View className="bg-white rounded-2xl shadow-md mb-6 overflow-hidden">
      {/* Image Section */}
      <Image source={homeBg} style={{ width: "100%", height: 180 }} />

      {/* Content */}
      <View className="p-4">
        <Text className="text-lg font-semibold">{item.tripName}</Text>
        <Text className="text-gray-500 text-sm">{item.location}</Text>

        {/* Stats + Map Row */}
        <View className="flex-row mt-4 items-start">
          {/* LEFT SECTION */}
          <View className="flex-[0.6] mr-3 ">
            {/* Row 1 — Distance + Elevation */}
            <View className="flex-row justify-between">
              <View>
                <Text className="text-black font-semibold">
                  {item.distance}
                </Text>
                <Text className="text-gray-500 text-xs">Distance</Text>
              </View>

              <View>
                <Text className="text-black font-semibold">
                  {item.elevation}
                </Text>
                <Text className="text-gray-500 text-xs">Elevation</Text>
              </View>
            </View>

            {/* Row 2 — Rating + Duration */}
            <View className="flex-row justify-between mt-3">
              <View>
                <Text className="text-black font-semibold">
                  {item.rating} <Text className="text-yellow-500">⭐</Text>
                </Text>
                <Text className="text-gray-500 text-xs">Rating</Text>
              </View>

              <View>
                <Text className="text-black font-semibold">
                  {item.duration}
                </Text>
                <Text className="text-gray-500 text-xs">Duration</Text>
              </View>
            </View>

            {/* Difficulty Slider */}
            <View className="mt-4">
              <View className="h-2 bg-gray-200 rounded-full w-28 overflow-hidden">
                <View
                  className="h-2 bg-pink-500 rounded-full"
                  style={{ width: "60%" }} // based on level later
                />
              </View>
              <Text className="text-gray-500 text-xs mt-1">
                {item.level} Level
              </Text>
            </View>
          </View>

          {/* RIGHT SECTION — Map Thumbnail (NOW BIGGER & CLEAN) */}
          <View className="h-32   flex-[0.5] bg-gray-100 rounded-2xl justify-center items-center shadow-sm">
            {/* Replace with actual SVG or static map later */}
            <Text className="text-xs text-gray-600">🗺️</Text>
            <Text className="text-[10px] text-gray-500 mt-1">View Map</Text>
          </View>
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
    rating: "4.2⭐",
  },
  {
    id: 2,
    tripName: "Goa Coastal Escape",
    location: "Goa, India",
    duration: "5 days",
    distance: "620km",
    elevation: "15 m",
    level: "easy",
    rating: "4.5⭐",
  },

  {
    id: 3,
    tripName: "Jaipur Heritage Trail",
    location: "Rajasthan, India",
    duration: "4 days",
    distance: "280km",
    elevation: "431 m",
    level: "easy",
    rating: "4.1⭐",
  },
];
