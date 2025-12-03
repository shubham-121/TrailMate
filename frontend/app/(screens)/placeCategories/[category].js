import { useLocalSearchParams, useRouter } from "expo-router";
import { View } from "react-native";
import PlacesByCategoryScreen from "../../../components/explore/nearbyPlaces/PlacesByCategoryScreen";

export default function Subcategory() {
  const params = useLocalSearchParams(); // route-> placeCategories/commercial etc

  console.log("Params in sub category:", params);

  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      {/* <SubCategoryScreen category={params.category}></SubCategoryScreen> */}
      <PlacesByCategoryScreen
        category={params.category}
      ></PlacesByCategoryScreen>
    </View>
  );
}
