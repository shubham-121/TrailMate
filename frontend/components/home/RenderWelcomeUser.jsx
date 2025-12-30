import { View, Text } from "react-native";

export default function RenderWelcomeUser() {
  return (
    <View className="flex   m-5">
      <Text className="font-bold text-3xl text-white">Hello! Shubham,</Text>
      <Text className="font-semibold text-xl text-white">
        Plan your itinerary today!
      </Text>
    </View>
  );
}
