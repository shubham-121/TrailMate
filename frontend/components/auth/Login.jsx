import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
} from "react-native";
import signupBg from "../../assets/images/auth/signupBg.jpg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { fetchRequest } from "../../utils/commonFunctions/fetchRequest";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../redux/slices/authSlice";

export default function LoginScreen() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleFormChange(name, value) {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <View className="flex-1 w-full">
      <LoginForm
        formData={formData}
        setFormData={setFormData}
        handleFormChange={handleFormChange}
      ></LoginForm>
    </View>
  );
}

function LoginForm({ formData, setFormData, handleFormChange }) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const dispatch = useDispatch();
  const { authUserData } = useSelector((state) => state.authentication);

  // useEffect(() => {
  //   console.log("Auth user data obj updated:", authUserData);
  // }, [authUserData]);

  async function handleLogin() {
    const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;

    if (!formData.email || !formData.password) {
      alert("Please enter all the required details before registering");
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: formData.email,
          userPassword: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      if (!data) {
        console.log("Error in logging in  the user: ", data);
        alert("Error in logging in the user");
        return;
      }

      //set the user state globally
      dispatch(
        setCredentials({
          access_token: data.token,
          email: data.userEmail,
          userId: data.userId,
        })
      );

      console.log(
        "user loggedin successfully, global auth state set also: ",
        authUserData
      );

      setTimeout(() => router.replace("/profile"), 1000);
    } catch (error) {
      alert("Error in logging  the user", error.message);
      console.log("Error in logging  the user: ", error.message);

      return;
    }
  }

  return (
    <View className="flex-1 bg-[#F8F8F8] px-8 pt-16 w-full">
      <ImageBackground
        source={signupBg}
        resizeMode="cover"
        className="absolute inset-0"
      >
        {/* overlay */}
        {/* <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "rgba(0,0,0,0.10)",
          }}
        ></View> */}
      </ImageBackground>

      <View className="" style={{ marginTop: insets.top }}>
        <Text className="text-center text-[26px] font-bold text-[#1D1D1D]">
          Login Here
        </Text>
        <Text className="text-center text-[16px]  mt-[1%] mb-10 text-black font-semibold">
          Welcome back youve been missed!
        </Text>
      </View>

      <View
        style={{
          marginTop: insets.top - 20,
          //   borderWidth: 2,
          padding: 15,
          marginBottom: insets.bottom - 15,
        }}
      >
        {/* Inputs */}
        <TextInput
          className="h-16 bg-[#EFEFEF] rounded-lg px-4 mb-5 text-[14px] "
          placeholder="Email"
          placeholderTextColor="#999"
          onChangeText={(text) => {
            console.log(text);
            handleFormChange("email", text);
          }}
          value={formData.email}
        />

        <TextInput
          className="h-16 bg-[#EFEFEF] rounded-lg px-4 mb-5 text-[14px]"
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="#999"
          onChangeText={(text) => {
            console.log(text);
            handleFormChange("password", text);
          }}
          value={formData.password}
        />

        <Text className="text-[16px] text-blue-500 font-semibold">
          Forgot your password?
        </Text>
      </View>

      {/* Button */}
      <TouchableOpacity
        onPress={handleLogin}
        className="bg-[#1F41BB] py-5 rounded-lg items-center mb-7"
      >
        <Text className="text-white text-[18px] font-semibold">Sign in</Text>
      </TouchableOpacity>

      <Text
        onPress={() => router.push("/signup")}
        className="text-center  mb-5 text-[16px] font-semibold text-black"
      >
        New User? Create new account
      </Text>

      <Text
        style={{ marginTop: insets.top }}
        className="text-center  text-blue-600  font-semibold mb-4"
      >
        Or continue with
      </Text>

      {/* Social Icons */}
      <View className="flex-row justify-evenly gap-x-1">
        <View className="bg-gray-300 px-5 py-3 rounded-[10px]">
          <Image
            source={require("../../assets/images/auth/google.jpg")}
            className="h-6 w-6 rounded-full object-fill"
          />
        </View>

        <View className="bg-gray-300 px-5 py-3 rounded-[10px]">
          <Image
            source={require("../../assets/images/auth/facebook.jpg")}
            className="h-6 w-6 rounded-full object-fill"
          />
        </View>

        <View className="bg-gray-300 px-5 py-3 rounded-[10px]">
          <Image
            source={require("../../assets/images/auth/apple.jpg")}
            className="h-6 w-6 object-fill rounded-full bg-gray-300"
          />
        </View>
      </View>
    </View>
  );
}
