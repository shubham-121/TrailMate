import { use } from "react";
import { View, Text, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AccountDetailsScreen({ userId }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ marginTop: insets.top }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <View>
        <Text>
          Account Details of the user : {userId ? userId : "Loading..."}
        </Text>
      </View>
    </View>
  );
}
