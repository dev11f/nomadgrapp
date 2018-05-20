import React from "react"; //JSX 들어가면 import
import { Image } from "react-native";
import { StackNavigator } from "react-navigation";
import FeedScreen from "../screens/FeedScreen";
import sharedRoutes, { sharedOptions } from "./sharedRoutes";
import NavButton from "../components/NavButton";

const HomeRoute = StackNavigator(
  {
    Home: {
      screen: FeedScreen,
      // 아래 작업 FeedScreen container.js에서 해도 됨.
      // 거기서 할 때는 static navigationOptions = ({ navigation}) 이렇게 시작
      navigationOptions: ({ navigation }) => ({
        headerTitle: (
          <Image
            source={require("../assets/images/logo.png")}
            style={{ height: 35 }}
            resizeMode={"contain"}
          />
        ),
        headerLeft: (
          <NavButton
            iconName={"ios-camera-outline"}
            onPress={() => navigation.navigate("TakePhoto")}
          />
        )
      })
    },
    ...sharedRoutes
  },
  {
    ...sharedOptions
  }
);

export default HomeRoute;
