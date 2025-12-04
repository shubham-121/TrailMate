import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

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
    <View className="rounded-[10px]  p-2 bg-white">
      <Pressable>
        <AntDesign name="menu" size={24} color="black" />
      </Pressable>
    </View>
  );
}

function Notifications() {
  return (
    <View className="rounded-[10px]  p-2 ">
      <Pressable>
        <AntDesign name="bell" size={28} color="white" />
      </Pressable>
    </View>
  );
}

function UserAccount() {
  return (
    <View className="rounded-[10px]  p-2 ">
      <Pressable>
        <AntDesign name="user" size={24} color="black" />
      </Pressable>
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
