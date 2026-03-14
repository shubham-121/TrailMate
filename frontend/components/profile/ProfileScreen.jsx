import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";
import fuji from "../../assets/images/profile/fuji.jpg";
import homeImg2 from "../../assets/images/home/homeImg2.webp";
import userAvatar from "../../assets/images/userAcc/userAcc.png";

export default function ProfileScreen() {
  return (
    <>
      <ScrollView>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />

        <View style={{ flex: 1 }} className="bg-gray-200">
          {/* Header Image */}
          <Image
            source={fuji}
            style={{
              width: "100%",
              height: 220,
              resizeMode: "cover",
              borderBottomLeftRadius: 25,
              borderBottomRightRadius: 25,
            }}
          />
          {/* Avatar */}
          <View
            style={{
              position: "absolute",
              top: 170,
              alignSelf: "center",
              backgroundColor: "white",
              padding: 5,
              borderRadius: 60,
              elevation: 5,
            }}
          >
            <Image
              source={userAvatar}
              style={{ width: 90, height: 90, borderRadius: 45 }}
            />
          </View>
          <View
            style={{
              marginTop: 60,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>Shubham</Text>
            <Text style={{ color: "gray" }}>The Explorer</Text>
            <Text style={{ marginTop: 6 }}>
              Chasing sunsets and hidden trails since 2015 ✈️
            </Text>
          </View>
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

          <View className="mt-6 m-4">
            <Text className="text-lg font-bold mb-3">Settings & Actions</Text>

            <View className="bg-white rounded-xl border border-gray-200 p-3">
              <View className="flex-row justify-between">
                {/* Left Column */}
                <View className="flex-1">
                  <Pressable
                    className="flex-row items-center justify-between py-3 border-b border-gray-100"
                    android_ripple={{ color: "#eee" }}
                  >
                    <View className="flex-row items-center gap-2">
                      <Text className="text-lg">👤</Text>
                      <Text className="text-gray-700">Account Details</Text>
                    </View>
                    <Text className="text-gray-400">›</Text>
                  </Pressable>

                  <Pressable
                    className="flex-row items-center justify-between py-3 border-b border-gray-100"
                    android_ripple={{ color: "#eee" }}
                  >
                    <View className="flex-row items-center gap-2">
                      <Text className="text-lg">✈️</Text>
                      <Text className="text-gray-700">Booking History</Text>
                    </View>
                    <Text className="text-gray-400">›</Text>
                  </Pressable>

                  <Pressable
                    className="flex-row items-center justify-between py-3"
                    android_ripple={{ color: "#eee" }}
                  >
                    <View className="flex-row items-center gap-2">
                      <Text className="text-lg">💳</Text>
                      <Text className="text-gray-700">Payments & Refunds</Text>
                    </View>
                    <Text className="text-gray-400">›</Text>
                  </Pressable>
                </View>

                {/* Right Column */}
                <View className="flex-1">
                  <Pressable
                    className="flex-row items-center justify-between py-3 border-b border-gray-100"
                    android_ripple={{ color: "#eee" }}
                  >
                    <View className="flex-row items-center gap-2">
                      <Text className="text-lg">🛟</Text>
                      <Text className="text-gray-700">Get Help</Text>
                    </View>
                    <Text className="text-gray-400">›</Text>
                  </Pressable>

                  <Pressable
                    className="flex-row items-center justify-between py-3"
                    android_ripple={{ color: "#eee" }}
                  >
                    <View className="flex-row items-center gap-2">
                      <Text className="text-lg">🚪</Text>
                      <Text className="text-gray-700">Logout</Text>
                    </View>
                    <Text className="text-gray-400">›</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
