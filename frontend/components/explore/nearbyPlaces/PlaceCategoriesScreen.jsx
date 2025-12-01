import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { FlatList, Pressable, Text, ToastAndroid, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PlaceCategoriesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <View className="flex-row items-center gap-4 px-4 py-2">
        <Pressable onPress={() => router.back()}>
          <AntDesign name="arrow-left" size={24} color="grey" />
        </Pressable>

        <Text className="text-lg font-semibold">Explore Categories</Text>
      </View>

      <View className="flex-1 p-4">
        <RenderPlacesCategories />
      </View>
    </View>
  );
}

function RenderPlacesCategories() {
  const router = useRouter();

  return (
    <View className=" flex-1">
      <Text className="text-center font-bold text-xl">
        Select and Explore any category
      </Text>

      <FlatList
        data={categoriesObj}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="border-2 p-4  rounded-lg bg-orange-50/50 m-2 ">
            <Pressable
              className="flex flex-row justify-between"
              onPress={() => {
                console.log("clicked");

                router.push(`/placeCategories/${item.category}`);
              }}
              onLongPress={() =>
                ToastAndroid.show(`Select ${item.name}`, ToastAndroid.LONG)
              }
            >
              <Text>{item.name}</Text>
              <AntDesign name="arrow-right" size={24} color="grey" />
            </Pressable>
          </View>
        )}
      ></FlatList>
    </View>
  );
}
const categoriesObj = [
  { id: 1, name: "Commercial", category: "commercial " },
  { id: 2, name: "Service", category: "service " },
  { id: 3, name: "Leisure", category: " leisure" },
  { id: 4, name: "Catering", category: "catering " },
  { id: 5, name: "Amenity", category: " amenity" },
  { id: 6, name: "Accommodation", category: "accommodation" },
  { id: 7, name: "HealthCare", category: "healthcare" },
  { id: 8, name: "Transport", category: "transport" },
  { id: 9, name: "Tourism", category: "tourism" },
  { id: 10, name: "Parking", category: "parking" },
  { id: 11, name: "ATM", category: "amenity.atm" },
];
