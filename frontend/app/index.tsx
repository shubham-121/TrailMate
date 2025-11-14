import { Text, View } from "react-native";
import "../global.css";
export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>
      <Text className="border-2 p-10 bg-red-200">This is working finally</Text>
    </View>
  );
}
