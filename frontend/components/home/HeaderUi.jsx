import { View, ImageBackground } from "react-native";
import Header from "./header/Header";
import RenderWelcomeUser from "./RenderWelcomeUser";
import RenderActionCards from "./RenderActionCards";
import Search from "./search/Search";
import homeBg from "../../assets/images/home/homeBg.avif";

export default function HeaderUi() {
  return (
    <View>
      <ImageBackground
        source={homeBg}
        className="  opacity-85 "
        imageStyle={{
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          aspectRatio: 9 / 16,
        }}
      >
        {/* overlay */}
        <View
          className="absolute inset-0 bg-black/30"
          style={{
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
          }}
        ></View>

        <Header></Header>

        <RenderWelcomeUser></RenderWelcomeUser>

        <RenderActionCards></RenderActionCards>

        <Search></Search>
      </ImageBackground>
    </View>
  );
}
