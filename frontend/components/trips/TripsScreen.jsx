import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import homeBg from "../../assets/images/home/homeBg.avif";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { activateCreateTripModal } from "../../redux/slices/createTripSlice";

//renders the user trips fetched from DB
export default function TripsScreen() {
  const { top } = useSafeAreaInsets();
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <View style={{ marginTop: top }} className="border-2    ">
      <Text className="text-center font-semibold text-lg">
        You Have No Trips Currently, Create One Today!
      </Text>

      <View className=" ">
        <Pressable
          className=" m-2 p-3 rounded-[20px]  border-gray-500 bg-[#d89cef]"
          onPress={() => {
            setTimeout(() => {
              dispatch(activateCreateTripModal());
            }, 200);

            router.push("/explore");
          }}
        >
          <Text className="text-center font-semibold  text-lg">
            Create A New Trip
          </Text>
        </Pressable>
      </View>

      {/* <RenderTrips /> */}
      <FlatList
        data={tripsObj}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <RenderTrips item={item}></RenderTrips>}
      ></FlatList>
    </View>
  );
}
function RenderTrips({ item }) {
  return (
    <View className="m-3 flex flex-row rounded-xl bg-white shadow-md overflow-hidden ">
      <View className="rounded-xl overflow-hidden">
        <Image source={item.image} style={{ height: 150, width: 200 }} />
      </View>

      <View className="flex-1 p-2 justify-between">
        <View>
          <Text className="text-lg font-semibold text-gray-900">
            Name: {item.name}
          </Text>
          <Text className="text-sm text-gray-600">Address: {item.address}</Text>
          <Text className="text-base font-bold text-green-600 mt-1">
            Price: {item.price}
          </Text>
        </View>

        <View className="flex flex-row gap-2">
          <Pressable className="px-2 py-1 rounded-md bg-blue-500">
            <Text className="text-white font-medium">Open</Text>
          </Pressable>

          <Pressable className="px-2 py-1 rounded-md bg-yellow-500">
            <Text className="text-white font-medium">Edit</Text>
          </Pressable>

          <Pressable className="px-2 py-1 rounded-md bg-red-500">
            <Text className="text-white font-medium">Delete</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const tripsObj = [
  {
    id: 1,
    name: "Harshil",
    image: homeBg,
    price: "15000",
    address: "Uttarkashi, Uttarakhand",
  },
  { id: 2, name: "Goa", image: homeBg, price: "2000", address: "Panji,Goa" },
  {
    id: 3,
    name: "Agra",
    image: homeBg,
    price: "10000",
    address: "Agra, Uttar Pradesh",
  },
  {
    id: 4,
    name: "Shimla",
    image: homeBg,
    price: "5000",
    address: "Shimla,Himachal Pradesh",
  },
  {
    id: 5,
    name: "Udaipur",
    image: homeBg,
    price: "20000",
    address: "Udaipur,Rajasthan",
  },
];
