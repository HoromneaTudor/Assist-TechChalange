import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUpScreen from "./SignUpScreen";
import SplashScreen from "./SplashScreen";
import { Header } from "react-native/Libraries/NewAppScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
//import MainTabScreen from "./MainTabScreen";
import HomeScreen from "./HomeScreen";
import colors from "../config/colors";
import Icon from "react-native-vector-icons/Ionicons";
import RoomsScreen from "./RoomsScreen";
import FavouritesScreen from "./DigitalKeyScreen";
import MyAccountScreen from "./MyAccountScreen";
import RoomDetailsScreen from "./RoomDetailsScreen";
import RoomsScreenAdmin from "./RoomsScreenAdmin";
import FavouritesScreenAdmin from "./DigitalKeyScreenAdmin";
import MyAccountScreenAdmin from "./MyAccountScreenAdmin";
import HomeScreenAdmin from "./HomeScreenAdmin";
import RoomDetailsScreenAdmin from "./RoomDetailsScreenAdmin";
import RoomDetailsScreenAdminEdit from "./RoomDetailsScreenAdminEdit";

const Stack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();
const TabAdmin = createMaterialBottomTabNavigator();

class MainTabScreenAdmin extends React.Component {
  state = {
    culoare: "white",
    componenta: "",
    id: 0,
  };

  render() {
    return (
      <TabAdmin.Navigator
        screenOptions={({ route }) => ({
          tabBarButton: ["Login"].includes(route.name)
            ? () => {
                return null;
              }
            : undefined,
        })}
        initialRouteName="Home"
        activeColor="#fff"
        onPress={() => {
          this.setState({ id: 2 });
        }}
      >
        <TabAdmin.Screen
          name="Home"
          component={HomeScreenAdmin}
          options={{
            tabBarLabel: "Home",
            tabBarColor: colors.secondary,
            tabBarIcon: ({ color }) => (
              <Icon name="home-outline" color={this.state.culoare} size={25} />
            ),
          }}
        />
        <TabAdmin.Screen
          name="Rooms"
          component={RoomsScreenAdmin}
          options={{
            tabBarLabel: "Rooms",
            tabBarColor: "#7d0901",
            tabBarIcon: ({ color }) => (
              <Icon name="bed-outline" color={this.state.culoare} size={25} />
            ),
          }}
        />
        <TabAdmin.Screen
          name="Digital Key"
          component={FavouritesScreenAdmin}
          options={{
            tabBarLabel: "Digital Key",
            tabBarColor: "#004d9a",
            tabBarIcon: ({ color }) => (
              <Icon
                name="lock-open-outline"
                color={this.state.culoare}
                size={24}
              />
            ),
          }}
        />
        <TabAdmin.Screen
          name="Account"
          component={MyAccountScreenAdmin}
          options={{
            tabBarLabel: "Account",
            tabBarColor: colors.TagNavViolet,
            tabBarIcon: ({ color }) => (
              <Icon
                name="person-outline"
                color={this.state.culoare}
                size={25}
              />
            ),
          }}
        />
      </TabAdmin.Navigator>
    );
  }
}

class MainTabScreen extends React.Component {
  state = {
    culoare: "white",
    componenta: "",
    id: 0,
  };

  render() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarButton: ["Login"].includes(route.name)
            ? () => {
                return null;
              }
            : undefined,
        })}
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
              <Icon name="home-outline" color={this.state.culoare} size={25} />
            ),
          }}
        />
        <Tab.Screen
          name="Rooms"
          component={RoomsScreen}
          options={{
            tabBarLabel: "Rooms",
            tabBarColor: "#7d0901",
            tabBarIcon: ({ color }) => (
              <Icon name="bed-outline" color={this.state.culoare} size={25} />
            ),
          }}
        />
        <Tab.Screen
          name="Digital Key"
          component={FavouritesScreen}
          options={{
            tabBarLabel: "Digital Key",
            tabBarColor: "#004d9a",
            tabBarIcon: ({ color }) => (
              <Icon
                name="lock-open-outline"
                color={this.state.culoare}
                size={24}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={MyAccountScreen}
          options={{
            tabBarLabel: "Account",
            tabBarColor: colors.TagNavViolet,
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
    );
  }
}

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainMenu"
          component={MainTabScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainMenuAdmin"
          component={MainTabScreenAdmin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreenAdmin"
          component={HomeScreenAdmin}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="RoomDetailsScreen"
          component={RoomDetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RoomDetailsScreenAdmin"
          component={RoomDetailsScreenAdmin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RoomDetailsScreenAdminEdit"
          component={RoomDetailsScreenAdminEdit}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainTabScreen"
          component={MainTabScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
