import { View, Text, Pressable } from "react-native";
import React from "react";
import { Redirect, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { clearCredentials } from "../../redux/slices/authSlice";
import { clearTokenLocally } from "../../utils/commonFunctions/authStorage";

export default function AccountActions() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { authUserData } = useSelector((store) => store.authentication);
  const { email, userId } = authUserData;

  console.log("useri id for acc is : ", userId);

  function handleUserLogout() {
    //alert use first before logging out
    clearTokenLocally();
    dispatch(clearCredentials());

    //clear async storage token as well

    return router.replace("/home"); // navigate to login page after logout
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
              onPress={handleUserLogout}
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
