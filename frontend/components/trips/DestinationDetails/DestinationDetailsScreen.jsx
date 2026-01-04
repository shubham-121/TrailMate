import { View, Text, Pressable, ScrollView, Image } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons, Entypo } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function DestinationDetailsScreen() {
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const { clickedDestinationObj } = useLocalSearchParams();
  const clickedDestination = JSON.parse(clickedDestinationObj);

  console.log("Show details:", clickedDestination);

  const { displayName, fullLocationData, createdAt, id } = clickedDestination;

  return (
    <>
      <View className="flex-1 bg-white" style={{ paddingTop: top }}>
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
          <View className=" bg-gray-200 self-start px-2 py-1 rounded-lg">
            <Pressable onPress={() => router.back()}>
              <AntDesign name="arrow-left" size={24} color="black" />
            </Pressable>
          </View>

          <DestinationImageSection />

          <View className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
            <Text className="text-3xl font-bold mb-1">{displayName}</Text>
            <Text className="text-gray-600 text-base">
              {fullLocationData.formattedAddress}
            </Text>
          </View>

          <View className="mt-4 p-4 bg-white border rounded-xl shadow-sm">
            <Text className="text-xl font-semibold mb-3">Location Details</Text>

            <DetailRow label="City" value={fullLocationData.city} />
            <DetailRow label="Region" value={fullLocationData.region} />
            <DetailRow label="Subregion" value={fullLocationData.subregion} />
            <DetailRow label="Country" value={fullLocationData.country} />
            <DetailRow
              label="Country Code"
              value={fullLocationData.isoCountryCode}
            />
            <DetailRow
              label="Postal Code"
              value={fullLocationData.postalCode}
            />
            <DetailRow label="Street" value={fullLocationData.street} />
            <DetailRow
              label="Street Number"
              value={fullLocationData.streetNumber}
            />
          </View>

          <View className="mt-4 p-4 bg-gray-50 border rounded-xl shadow-sm">
            <Text className="text-xl font-semibold mb-2">Additional Info</Text>

            <View className="flex-row items-center mb-1">
              <Ionicons name="time-outline" size={18} color="#555" />
              <Text className="ml-2 text-gray-600">
                Added On: {new Date(createdAt).toDateString()}
              </Text>
            </View>

            <View className="flex-row items-center">
              <Entypo name="info-with-circle" size={18} color="#555" />
              <Text className="ml-2 text-gray-600">Destination ID: {id}</Text>
            </View>
          </View>
        </ScrollView>

        <View className="absolute bottom-4 left-4 right-4">
          <Pressable className="bg-blue-600 py-4 rounded-full shadow-xl items-center">
            <Text className="text-white font-semibold text-lg">
              Add an Image
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

function DestinationImageSection() {
  return (
    <View className="w-full rounded-xl overflow-hidden bg-gray-200 mt-4">
      <Image
        source={{
          uri: "https://via.placeholder.com/600x300?text=No+Image+Added",
        }}
        className="w-full h-48"
        resizeMode="cover"
      />
      <View className="absolute inset-0 justify-center items-center">
        <Text className="text-white text-lg font-bold bg-black/40 px-3 py-1 rounded-md">
          No Image Added Yet
        </Text>
      </View>
    </View>
  );
}

function DetailRow({ label, value }) {
  return (
    <View className="flex-row justify-between py-2 border-b border-gray-200">
      <Text className="text-gray-500">{label}</Text>
      <Text className="font-medium text-gray-700">{value || "N/A"}</Text>
    </View>
  );
}
