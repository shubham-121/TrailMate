import { useSelector } from "react-redux";
import { ToastAndroid, View } from "react-native";
import { Redirect } from "expo-router";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, access_token, authUserData } = useSelector(
    (store) => store.authentication
  );

  if (!isAuthenticated && !access_token) {
    // alert("Login first to access the route");
    ToastAndroid.show(
      "Login First To Access The APP Content",
      ToastAndroid.LONG
    );
    return <Redirect href="/login" />;
  }

  console.log(
    "User is allowed to access the route: ",
    isAuthenticated,
    access_token
  );

  return <View className="flex-1">{children}</View>;
}
