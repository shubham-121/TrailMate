import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import signupBg from "../../assets/images/auth/signupBg.jpg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#F8F8F8] px-8 pt-16 w-full">
      <ImageBackground
        source={signupBg}
        resizeMode="cover"
        className="absolute inset-0"
      />

      <View className="" style={{ marginTop: insets.top }}>
        <Text className="text-center text-[26px] font-bold text-[#1D1D1D]">
          Login Here
        </Text>
        <Text className="text-center text-[16px]  mt-[1%] mb-10 text-black font-semibold">
          Welcome back you've been missed!
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
        />

        <TextInput
          className="h-16 bg-[#EFEFEF] rounded-lg px-4 mb-5 text-[14px]"
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="#999"
        />

        <Text className="text-[16px] text-blue-500 font-semibold">
          Forgot your password?
        </Text>
      </View>

      {/* Button */}
      <TouchableOpacity className="bg-[#1F41BB] py-5 rounded-lg items-center mb-7">
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
