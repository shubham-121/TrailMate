import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ExploreScreen from "../../components/explore/ExploreScreen";

export default function ExploreTab() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    // <View>
    //   <Text>Explore screen it is there</Text>
    // </View>

    <View style={{ flex: 1, marginTop: insets.top }}>
      {/* <Text onPress={() => router.push("/login")} className="text-blue-500">
        GO to login page
      </Text>
      <Text>Hello explore tab</Text> */}
      <ExploreScreen></ExploreScreen>
    </View>
  );
}

// import { View, Text, StyleSheet } from "react-native";
// import React from "react";
// import { Link, useRouter } from "expo-router";
// import ExploreScreen from "../../components/explore/ExploreScreen";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

// export default function ExploreTab() {
//   const router = useRouter();
//   const insets = useSafeAreaInsets();

//   return (
//     <View style={{ flex: 1, marginTop: insets.top }}>
//       {/* <Text>explore</Text>
//       <Text onPress={() => router.push("/login")} className="text-blue-500">
//         GO to login page
//       </Text> */}
//       {/* <ExploreScreen /> */}
//       <Text>Hello explore tab</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // justifyContent: "center",
//     // alignItems: "center",
//   },
// });
