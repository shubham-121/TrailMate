import { useLocalSearchParams, useRouter } from "expo-router";
import { View } from "react-native";
import SubCategoryScreen from "../../../components/explore/nearbyPlaces/SubCategoryScreen";

export default function Subcategory() {
  const params = useLocalSearchParams(); // route-> placeCategories/commercial etc

  console.log("Params in sub category:", params);

  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <SubCategoryScreen category={params.category}></SubCategoryScreen>
    </View>
  );
}
