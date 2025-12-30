import { View, Text, Pressable, ToastAndroid } from "react-native";
import { useRouter } from "expo-router";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Fontisto from "@expo/vector-icons/Fontisto";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function RenderActionCards() {
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
