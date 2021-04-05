import React, { useState } from "react";
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
import Axios from "axios";

const imageWidth = Dimensions.get("window").width / 2;
let contor = true;

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const displayRooms = () => {};

const HomeScreen = () => {
  const [Data, DataChange] = useState();
  console.log(contor);
  if (contor === true) {
    Axios.post("https://api-ehotelplus.herokuapp.com/rooms", {}).then(
      (response) => {
        //setRooms(response);
        // response.data.forEach((element) => {
        //   console.log(element);
        // });

        //console.log(response.data);
        DataChange(response.data);
        //console.log(response.data[0]);
        contor = false;
      }
    );
  }
  console.log(Data);
  const renderItem = ({ item }) => <Item title={item.nfc_code} />;
  return (
    <View style={styles.container}>
      <View style={{ top: "38%" }}>
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

      <View style={{ zIndex: 7, height: "65%", bottom: "18%" }}>
        <FlatList
          data={Data}
          renderItem={renderItem}
          keyExtractor={(item) => item.room_id}
        />
      </View>
      <View style={{ height: 100 }}></View>

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
