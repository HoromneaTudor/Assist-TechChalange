import React from "react";
import { useFonts } from "expo-font";
import SplashScreen from "./apps/screens/SplashScreen";
import AppLoading from "expo-app-loading";
import Axios from "axios";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./apps/screens/Routes";
import MainTabScreen from "./apps/screens/MainTabScreen";
import RoomDetailsScreen from "./apps/screens/RoomDetailsScreen";

export default function App() {
  let [fontsLoaded] = useFonts({
    roboto: require("./apps/fonts/Roboto-Regular.ttf"),
    freestyle: require("./apps/fonts/freescpt.ttf"),
    robotoMed: require("./apps/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else return <RoomDetailsScreen></RoomDetailsScreen>;
}
