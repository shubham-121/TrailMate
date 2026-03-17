import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
  Image,
  Platform,
  StatusBar,
} from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import userAcc from "../../../assets/images/userAcc/userAcc.png";
import { useNavigation, useRouter } from "expo-router";
import { useSelector } from "react-redux";

export default function Header() {
  const paddingTop =
    Platform.OS === "android" ? StatusBar.currentHeight + 10 : 10;
  return (
    <View
      style={{ paddingTop }}
      className="flex flex-row justify-end items-center px-4  w-full"
    >
      {/* <Menu /> */}

      <View className="flex flex-row  items-center  gap-3">
        <Notifications />
        <UserAccount />
      </View>
    </View>
  );
}
function Menu() {
  return (
    <Pressable className="rounded-xl p-2 bg-white/20 border border-white/30">
      <AntDesign name="menu" size={24} color="black" />
    </Pressable>
  );
}

function Notifications() {
  return (
    // Standardized size: w-11 h-11 ensures it's a perfect circle
    <Pressable className="w-11 h-11 items-center justify-center rounded-full bg-black/20 border border-white/20">
      <AntDesign name="bell" size={28} color="black" />
      {/* Optional: Small red dot for notification */}
      <View className="absolute top-2 right-2 w-2 h-2 bg-blue-400 rounded-full" />
    </Pressable>
  );
}

function UserAccount() {
  const { userId, email } = useSelector(
    (store) => store.authentication.authUserData
  );

  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(`/accountDetails/${userId}`)}
      className="rounded-full border-2 border-white/50 overflow-hidden"
    >
      <Image
        source={userAcc}
        style={{ height: 40, width: 40 }}
        resizeMode="cover"
      />
    </Pressable>
  );
}
