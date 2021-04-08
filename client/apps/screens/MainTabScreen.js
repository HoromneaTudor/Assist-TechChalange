import React, { useState } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import RoomsScreen from "./RoomsScreen";
import FavouritesScreen from "./FavouritesScreen";
import MyAccountScreen from "./MyAccountScreen";
import RoomDetailsScreen from "./RoomDetailsScreen";

import Icon from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import colors from "../config/colors";
import { Alert } from "react-native";

const Tab = createMaterialBottomTabNavigator();

class MainTabScreen extends React.Component {
  state = {
    culoare: "white",
    componenta: "",
    id: 0,
  };

  render() {
    return (
      <NavigationContainer independent="true">
        <Tab.Navigator
          initialRouteName="Home"
          activeColor="#fff"
          onPress={() => {
            this.setState({ id: 2 });
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarLabel: "Home",
              tabBarColor: colors.secondary,
              tabBarIcon: ({ color }) => (
                <Icon
                  name="home-outline"
                  color={this.state.culoare}
                  size={25}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Rooms"
            component={RoomDetailsScreen}
            options={{
              tabBarLabel: "Rooms",
              tabBarColor: colors.TagNavOrange,
              tabBarIcon: ({ color }) => (
                <Icon name="bed-outline" color={this.state.culoare} size={25} />
              ),
            }}
          />

          <Tab.Screen
            name="Account"
            component={FavouritesScreen}
            options={{
              tabBarLabel: "Favorites",
              tabBarColor: colors.TagNavYellow,
              tabBarIcon: ({ color }) => (
                <Icon
                  name="star-outline"
                  color={this.state.culoare}
                  size={24}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Explore"
            component={MyAccountScreen}
            options={{
              tabBarLabel: "Account",
              tabBarColor: colors.TagNavGreen,
              tabBarIcon: ({ color }) => (
                <Icon
                  name="person-outline"
                  color={this.state.culoare}
                  size={25}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

export default MainTabScreen;
