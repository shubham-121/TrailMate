import { View, Text, Image, ScrollView } from "react-native";
import React from "react";

import homeImg2 from "../../assets/images/home/homeImg2.webp";

export default function UserStats() {
  return (
    <>
      <View className="mt-6 m-4">
        <Text className="text-lg font-bold mb-3">Stats Row</Text>

        <View className="flex-row justify-between">
          <View className="flex-1 bg-white border border-gray-200 rounded-xl p-4 items-center mx-1">
            <View className="flex-row items-center">
              <Text className="text-xl mr-1">🌍</Text>
              <Text className="text-lg font-bold">24</Text>
            </View>

            <Text className="text-gray-500 text-xs text-center mt-1">
              Countries Visited
            </Text>
          </View>

          <View className="flex-1 bg-white border border-gray-200 rounded-xl p-4 items-center mx-1">
            <View className="flex-row items-center">
              <Text className="text-xl mr-1">✈️</Text>
              <Text className="text-lg font-bold">12</Text>
            </View>

            <Text className="text-gray-500 text-xs text-center mt-1">
              Planned Trips
            </Text>
          </View>

          <View className="flex-1 bg-white border border-gray-200 rounded-xl p-4 items-center mx-1">
            <View className="flex-row items-center">
              <Text className="text-xl mr-1">⭐</Text>
              <Text className="text-lg font-bold">48</Text>
            </View>

            <Text className="text-gray-500 text-xs text-center mt-1">
              Trip Reviews
            </Text>
          </View>
        </View>
      </View>
      <View className="mt-6 m-4 bg-white p-2 rounded-xl">
        <Text className="text-lg font-bold mb-3">My Favourites</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="m-2"
        >
          <View className="relative mr-3">
            <Image
              source={homeImg2}
              style={{ height: 120, width: 115, borderRadius: 14 }}
            />
            <View className="absolute bottom-0 w-full bg-black/40 rounded-b-xl py-1">
              <Text className="text-white text-center text-xs font-semibold">
                Mount Fuji
              </Text>
            </View>
          </View>

          <View className="relative mr-3">
            <Image
              source={homeImg2}
              style={{ height: 120, width: 115, borderRadius: 14 }}
            />
            <View className="absolute bottom-0 w-full bg-black/40 rounded-b-xl py-1">
              <Text className="text-white text-center text-xs font-semibold">
                Santorini
              </Text>
            </View>
          </View>

          <View className="relative mr-3">
            <Image
              source={homeImg2}
              style={{ height: 120, width: 115, borderRadius: 14 }}
            />
            <View className="absolute bottom-0 w-full bg-black/40 rounded-b-xl py-1">
              <Text className="text-white text-center text-xs font-semibold">
                Bali
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
