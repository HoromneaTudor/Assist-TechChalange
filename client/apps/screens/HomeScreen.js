import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  FlatList,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../config/colors";

const imageWidth = Dimensions.get("window").width / 2;

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d723",
    title: "Third Item",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba2",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f631",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d726",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d724",
    title: "Third Item",
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const HomeScreen = () => {
  const renderItem = ({ item }) => <Item title={item.title} />;
  return (
    <View style={styles.container}>
      <View style={{ top: "45%" }}>
        <Image
          source={require("../assets/HomeImg.png")}
          style={{
            resizeMode: "cover",
            height: "60%",
            width: "100%",
            bottom: "25%",
            zIndex: 1,
          }}
        />
        <Text style={styles.AppName}>eHotel+</Text>

        <TouchableOpacity
          style={{
            bottom: "63.2%",
            zIndex: 3,
            alignItems: "flex-end",
            right: "5%",
          }}
        >
          <View
            style={{
              height: 27,
              width: 27,
              borderRadius: 27 / 2,
              backgroundColor: "black",
            }}
          ></View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.LogOutBtn}>
          <Icon name="log-out-outline" color={"white"} size={27} />
        </TouchableOpacity>

        <Text style={styles.AppMoto}>
          Let's explore the best{"\n"}hotel rooms
        </Text>

        <TextInput
          placeholder="Search room"
          style={{
            width: "80%",
            backgroundColor: "white",
            borderRadius: 100,
            borderColor: colors.inputBorders,
            borderWidth: 1,
            height: 40,
            paddingLeft: 20,
            zIndex: 5,
            bottom: "64%",
            left: "10%",
          }}
        ></TextInput>
      </View>
      <View style={{ bottom: "10%", zIndex: 7 }}>
        <ScrollView>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </ScrollView>
      </View>

      <StatusBar style="auto"></StatusBar>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  AppName: {
    zIndex: 2,
    bottom: "60%",
    textAlign: "left",
    left: "8%",
    fontFamily: "robotoMed",
    color: "white",
    fontSize: 27,
  },
  AppMoto: {
    zIndex: 2,
    bottom: "67%",
    textAlign: "left",
    left: "8%",
    fontFamily: "robotoMed",
    color: colors.inputBorders,
    fontSize: 20,
  },
  LogOutBtn: {
    bottom: "67.5%",
    zIndex: 3,
    alignItems: "flex-end",
    right: "15%",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
