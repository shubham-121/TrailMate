import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import PlaceDetailsScreen from "../../../components/explore/nearbyPlaces/PlaceDetailsScreen";

export default function NestedPlaceDetails() {
  const { placeId } = useLocalSearchParams();

  console.log("local url: ", placeId);

  return (
    <View style={{ flex: 1 }}>
      <PlaceDetailsScreen placeId={placeId}></PlaceDetailsScreen>
    </View>
  );
}
