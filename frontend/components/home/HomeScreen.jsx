import { View, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ShowTrips from "./showTrips/ShowTrips";
import SuggestedPlacesCards from "./suggestedPlaces/SuggestedPlacesCards";
import HeaderUi from "./HeaderUi";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useIsFocused } from "@react-navigation/native";

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  const { access_token } = useSelector((store) => store.authentication);

  const [userTrips, setUserTrips] = useState(null);

  console.log("access token in home: ", access_token);

  useEffect(() => {
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
  }, [access_token]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className=" w-full flex-1  " style={{ marginTop: insets.top }}>
        <HeaderUi />
        <SuggestedPlacesCards></SuggestedPlacesCards>
        <ShowTrips
          userTrips={userTrips}
          setUserTrips={setUserTrips}
        ></ShowTrips>
      </View>
    </ScrollView>
  );
}

//fetch the user trips. If no trips just render any 2,3 random cards
