import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
  ScrollView,
} from "react-native";
import React from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import homeBg from "../../assets/images/home/homeBg.avif";
import Header from "./header/Header";
import Search from "./search/Search";
import SuggestedPlaces from "./suggestedPlaces/SuggestedPlaces";
import ShowTrips from "./showTrips/ShowTrips";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <>
        <View
          className=" w-full flex-1  "
          style={{
            marginTop: insets.top,
          }}
        >
          <ImageBackground
            source={homeBg}
            className="h-[21%]  opacity-85 "
            imageStyle={{
              borderBottomLeftRadius: 25,
              borderBottomRightRadius: 25,
            }}
          >
            <View
              className="absolute inset-0 bg-black/30"
              style={{
                borderBottomLeftRadius: 25,
                borderBottomRightRadius: 25,
              }}
            ></View>

            <Header></Header>

            <RenderWelcomeUser></RenderWelcomeUser>

            <RenderActionCards></RenderActionCards>

            <Search></Search>
          </ImageBackground>

          <SuggestedPlaces></SuggestedPlaces>

          <ShowTrips></ShowTrips>
        </View>
      </>
    </ScrollView>
  );
}

function RenderWelcomeUser() {
  return (
    <View className="flex   m-5">
      <Text className="font-bold text-3xl text-white">Hello! Shubham,</Text>
      <Text className="font-semibold text-xl text-white">
        Plan your itinerary today!
      </Text>
    </View>
  );
}

function RenderActionCards() {
  return (
    <View className="flex flex-row justify-center gap-5 ">
      <Pressable className="bg-white/60 px-2 py-6 rounded-xl shadow-md flex items-center">
        <FontAwesome5 name="map-marked-alt" size={32} color="black" />
        <Text className="text-md mt-2 font-bold">Explore Map</Text>
      </Pressable>

      <Pressable className="bg-white/60 px-1 py-6 rounded-xl shadow-md flex items-center">
        <MaterialIcons name="travel-explore" size={32} color="black" />
        <Text className="text-md mt-2 font-bold">Nearby Places</Text>
      </Pressable>

      <Pressable className="bg-white/60 px-2 py-6 rounded-xl shadow-md flex items-center">
        <Fontisto name="favorite" size={32} color="black" />
        <Text className="text-md mt-2 font-bold">My Trips</Text>
      </Pressable>

      <Pressable className="bg-white/60 px-2 py-6 rounded-xl shadow-md flex items-center">
        <FontAwesome name="book" size={32} color="black" />
        <Text className="text-md mt-2 font-bold">Plan Trips</Text>
      </Pressable>
    </View>
  );
}
