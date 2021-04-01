import React from 'react';
import { useFonts } from 'expo-font';
import SplashScreen from './apps/screens/SplashScreen';
import AppLoading from 'expo-app-loading';
import Axios from 'axios'

export default function App() {

  let [fontsLoaded] = useFonts({
    'roboto': require('./apps/fonts/Roboto-Regular.ttf'),
    'freestyle': require('./apps/fonts/freescpt.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else
    return <SplashScreen></SplashScreen>
}