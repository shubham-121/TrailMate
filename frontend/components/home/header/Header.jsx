import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
  Image,
} from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import userAcc from "../../../assets/images/userAcc/userAcc.png";
import { useNavigation } from "expo-router";

export default function Header() {
  return (
    <View className="flex flex-row justify-between items-center px-4 py-2 w-full">
      <Menu />

      <View className="flex flex-row    gap-6">
        <Notifications />
        <UserAccount />
      </View>
    </View>
  );
}

function Menu() {
  return (
    <View className="rounded-lg p-2 bg-white/90">
      <Pressable>
        <AntDesign name="menu" size={24} color="black" />
      </Pressable>
    </View>
  );
}

function Notifications() {
  return (
    <View className="rounded-full  p-2  bg-gray-400/40">
      <Pressable>
        <AntDesign name="bell" size={28} color="black" />
      </Pressable>
    </View>
  );
}

function UserAccount() {
  return (
    <View className=" bg-white/60 rounded-full p-1">
      <View className="rounded-full  border-2  ">
        <Pressable>
          {/* <AntDesign name="user" size={24} color="black" /> */}
          <Image source={userAcc} style={{ height: 35, width: 35 }}></Image>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
