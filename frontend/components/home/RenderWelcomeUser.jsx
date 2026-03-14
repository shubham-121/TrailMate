import { View, Text } from "react-native";

export default function RenderWelcomeUser() {
  return (
    <View className="flex   m-5">
      <Text className="font-bold text-3xl text-white">Namaste, Shubham!</Text>
      <Text className="font-semibold text-xl text-white">
        Begin your next great adventure
      </Text>
    </View>
  );
}
