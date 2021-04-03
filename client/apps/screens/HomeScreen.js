import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import colors from '../config/colors';
import { Image, SafeAreaView, StyleSheet, Text,Animated, Button,TouchableHighlight,TouchableOpacity,TextInput,View, KeyboardAvoidingView, Alert} from 'react-native';
import {Dimensions} from 'react-native';
import { useEffect } from 'react';
import Axios from 'axios';
import 'react-native-gesture-handler';
import SplashScreen from './screens/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const imageWidth = Dimensions.get('window').width/2;
const inputRef = useRef();
  const [input, setInput] = useState('');
  const pressed = () => {
    inputRef.current.clear();
  };

const RootStack =  createStackNavigator(
{
    Splash:{screen:SplashScreen},
    Main: {screen:HomeScreen},
},
{
    initialRouteName:'home',
}
);



function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

const styles = StyleSheet.create({

})

export default HomeScreen;