import { View, ScrollView, Text } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ShowTrips from "./showTrips/ShowTrips";
import SuggestedPlacesCards from "./suggestedPlaces/SuggestedPlacesCards";
import HeaderUi from "./HeaderUi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useIsFocused } from "@react-navigation/native";

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  const { access_token } = useSelector((store) => store.authentication);
  const isFocused = useIsFocused();

  // console.log("Is focused: ", isFocused);

  const [userTrips, setUserTrips] = useState(null);

  // console.log("access token in home: ", access_token);

  //render data based on user login or logout

  useEffect(() => {
    if (!isFocused) return;

    if (!access_token) {
      console.log("No access token , return ...");
      return;
    }

    async function fetchUserTrips() {
      const res = await fetch(`${baseUrl}/trips`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (!res.ok) {
        console.log("Some Error occured  in fetching the existing trips ");
        const errData = await res.json();

        throw new Error(errData.message || "Failed to fetch trips");
      }

      const data = await res.json();

      setUserTrips(data.userTrips);

      console.log("User trips: ", data);
    }
    fetchUserTrips();
  }, [access_token, isFocused]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className=" w-full flex-1  " style={{}}>
        <HeaderUi />
        <SuggestedPlacesCards></SuggestedPlacesCards>
        {access_token ? (
          <ShowTrips
            userTrips={userTrips}
            setUserTrips={setUserTrips}
          ></ShowTrips>
        ) : (
          <LoggedOutHome />
        )}
      </View>
    </ScrollView>
  );
}

// function LoggedOutHome() {
//   return (
//     <View className="w-full flex-1 items-center justify-center">
//       <Text className="text-lg font-semibold">
//         Welcome to TrailMate! Please log in to see your trips and explore new
//         destinations.
//       </Text>
//       generate some random home ui stuff
//     </View>
//   );
// }
function LoggedOutHome() {
  return (
    <View className="w-full flex-1 items-center justify-center px-4 py-8">
      <Text className="text-2xl font-bold text-center mb-2 text-gray-900">
        Welcome to TrailMate
      </Text>
      <Text className="text-sm text-gray-500 text-center mb-8">
        Log in to discover and track your adventures
      </Text>
      <View className="w-full gap-3">
        <View className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200 active:opacity-80">
          <Text className="text-lg font-bold text-blue-900">
            🏔️ Mountain Hike
          </Text>
          <Text className="text-sm text-blue-700 mt-1">
            Explore alpine trails
          </Text>
        </View>
        <View className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-5 border border-amber-200 active:opacity-80">
          <Text className="text-lg font-bold text-amber-900">
            🏖️ Beach Trail
          </Text>
          <Text className="text-sm text-amber-700 mt-1">
            Coastal adventures await
          </Text>
        </View>
        <View className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border border-green-200 active:opacity-80">
          <Text className="text-lg font-bold text-green-900">
            🌲 Forest Walk
          </Text>
          <Text className="text-sm text-green-700 mt-1">Immerse in nature</Text>
        </View>
      </View>
    </View>
  );
}

//fetch the user trips. If no trips just render any 2,3 random cards
