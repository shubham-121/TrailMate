import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
  ScrollView,
  ToastAndroid,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import homeBg from "../../assets/images/home/homeBg.avif";
import Header from "./header/Header";
import Search from "./search/Search";
import ShowTrips from "./showTrips/ShowTrips";
import SuggestedPlacesCards from "./suggestedPlaces/SuggestedPlacesCards";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      // contentContainerStyle={{ paddingBottom: 40 }}
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
            className="  opacity-85 "
            imageStyle={{
              borderBottomLeftRadius: 25,
              borderBottomRightRadius: 25,
              aspectRatio: 9 / 16,
            }}
          >
            {/* overlay */}
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

          <View
            className=" m-1 bg-stone-300/50"
            style={{ borderTopLeftRadius: 15, borderTopRightRadius: 15 }}
          >
            <SuggestedPlacesCards></SuggestedPlacesCards>

            <ShowTrips></ShowTrips>
          </View>
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
  const router = useRouter();

  return (
    <View className="flex flex-row justify-center gap-5 ">
      <Pressable
        className="bg-white/60 px-1 py-4 min-w-20 rounded-xl shadow-md flex items-center "
        onPress={() => router.push("/explore")}
        onLongPress={() =>
          ToastAndroid.show("Explore The Map", ToastAndroid.SHORT)
        }
      >
        <FontAwesome5 name="map-marked-alt" size={32} color="black" />
        <Text className="text-md mt-2 font-bold">Explore Map</Text>
      </Pressable>

      <Pressable
        className="bg-white/60 px-1 py-4 min-w-24 rounded-xl  shadow-md flex items-center"
        onPress={() => router.push("/nearByPlaces")}
        onLongPress={() =>
          ToastAndroid.show("Explore NearBy Places ", ToastAndroid.SHORT)
        }
      >
        <MaterialIcons name="travel-explore" size={32} color="black" />
        <Text className="text-md mt-2 font-bold">Near Me</Text>
      </Pressable>

      <Pressable
        className="bg-white/60 px-4 py-4 min-w-24 rounded-xl shadow-md flex items-center"
        onPress={() => router.push("/trips")}
        onLongPress={() =>
          ToastAndroid.show("View Your Saved Trips", ToastAndroid.SHORT)
        }
      >
        <Fontisto name="favorite" size={32} color="black" />
        <Text className="text-md mt-2 font-bold">My Trips</Text>
      </Pressable>

      <Pressable
        className="bg-white/60 px-1 py-4 min-w-20 rounded-xl shadow-md flex items-center"
        onPress={() => router.push("/explore")}
        onLongPress={() =>
          ToastAndroid.show("Plan A New Trip", ToastAndroid.SHORT)
        }
      >
        <FontAwesome name="book" size={32} color="black" />
        <Text className="text-md mt-2 font-bold">Plan Trips</Text>
      </Pressable>
    </View>
  );
}
