import { View, Text, StyleSheet, Pressable, ToastAndroid } from "react-native";
import React from "react";
import ProtectedRoute from "../../utils/commonComponents/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { clearCredentials } from "../../redux/slices/authSlice";
import { Redirect } from "expo-router";
import ProfileScreen from "../../components/profile/ProfileScreen";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Profile() {
  const { isAuthenticated, authUserData } = useSelector(
    (store) => store.authentication
  );
  const dispatch = useDispatch();

  function handleUserLogout() {
    dispatch(clearCredentials());

    return <Redirect href="/home"></Redirect>;
  }

  return (
    <ProtectedRoute>
      <View style={{ flex: 1 }}>
        <ProfileScreen></ProfileScreen>
      </View>
    </ProtectedRoute>
  );
}

// <ProtectedRoute>
//       <View style={styles.container}>
//         <Text>profile</Text>

//         {authUserData && (
//           <View>
//             <Text>
//               User authencticated now?: {isAuthenticated ? "yes " : "no"}
//             </Text>
//             <Text>{authUserData?.email}</Text>
//             <Text>{authUserData?.userId}</Text>
//           </View>
//         )}
//       </View>

//       {/* show a logout button for now, remove later */}
//       <View className="flex-1 justify-center items-center">
//         <Pressable
//           onPress={handleUserLogout}
//           onLongPress={() =>
//             ToastAndroid.show(
//               "Are you sure, you wanna logout?",
//               ToastAndroid.SHORT
//             )
//           }
//           className="bg-red-500 px-6 py-3 rounded-lg active:opacity-70"
//         >
//           <Text className="text-white font-semibold text-base">Log out</Text>
//         </Pressable>

//         {/* <ProfileScreen /> */}
//       </View>
//     </ProtectedRoute>
