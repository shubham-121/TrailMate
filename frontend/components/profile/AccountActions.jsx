import { View, Text, Pressable } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";

export default function AccountActions() {
  const router = useRouter();

  const { authUserData } = useSelector((store) => store.authentication);
  const { email, userId } = authUserData;

  console.log("useri id for acc is : ", userId);

  function handleLogout() {
    alert("Are you sure you want to logout?");
    return;
  }

  function goToAccountDetails() {
    router.push(`/accountDetails/${userId}`); // navigate to account details page for now
    return;
  }

  return (
    <View className="mt-6 m-4">
      <Text className="text-lg font-bold mb-3">Settings & Actions</Text>

      <View className="bg-white rounded-xl border border-gray-200 p-3">
        <View className="flex-row justify-between">
          <View className="flex-1">
            <Pressable
              onPress={goToAccountDetails}
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

            {/* logout feature */}
            <Pressable
              onPress={handleLogout}
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
  );
}
