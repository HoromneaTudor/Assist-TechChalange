import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import RoomsScreen from './RoomsScreen';
import FavouritesScreen from './FavouritesScreen';
import MyAccountScreen from './MyAccountScreen';

import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';


const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
  <NavigationContainer independent='true'>
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Rooms"
        component={RoomsScreen}
        options={{
          tabBarLabel: 'Rooms',
          tabBarColor: '#1f65ff',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-aperture" color={color} size={26} />
            
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={FavouritesScreen}
        options={{
          tabBarLabel: 'Favorites',
          tabBarColor: '#694fad',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-notifications" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={MyAccountScreen}
        options={{
          tabBarLabel: 'Account',
          tabBarColor: '#d02860',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
            
          ),
        }}
      />
    </Tab.Navigator>
    </NavigationContainer>
);

export default MainTabScreen;

