import { useLocalSearchParams, useRouter } from "expo-router";
import { View } from "react-native";
import SubCategoryScreen from "../../../components/explore/nearbyPlaces/SubCategoryScreen";

export default function Subcategory() {
  const params = useLocalSearchParams(); // route-> placeCategories/commercial etc

  console.log("Params in sub category:", params);

  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      {/* <Text>Subcategory: {params.category} </Text>
      <Pressable onPress={() => router.back()}>
        <Text classname="border-2 p-2">Go back</Text>
      </Pressable> */}

      <SubCategoryScreen category={params.category}></SubCategoryScreen>
    </View>
  );
}
