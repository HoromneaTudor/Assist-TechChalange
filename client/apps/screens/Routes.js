import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from './SignUpScreen';
import SplashScreen from './SplashScreen';
import { Header } from 'react-native/Libraries/NewAppScreen';
import MainTabScreen from './MainTabScreen';


  const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Login" >
        <Stack.Screen name="Login" component={SplashScreen}  options={{headerShown:false}} />
        <Stack.Screen name="Signup" component={SignUpScreen} options={{headerShown:false}}/>
        <Stack.Screen name="MainMenu" component={MainTabScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

export default Routes;

