import React, { memo, useMemo, useState } from "react";
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
import { Colors } from "react-native/Libraries/NewAppScreen";
import { set } from "react-native-reanimated";

const imageWidth = Dimensions.get("window").width / 2;
let contor = true;
let contorFav = 0;

const Item = ({ roomType, roomPrice }) => {
  const [Ico, SetIco] = useState("heart-outline");

  return (
    <View style={styles.item}>
      <Image
        source={require("../assets/RoomImg.jpeg")}
        style={styles.itemImage}
      />
      <Text style={styles.roomTypeItem}>{roomType}</Text>
      <Text style={styles.RatingValueLabel}>Rating</Text>
      <Text style={styles.RatingValue}>8.5</Text>
      <Icon
        name="star"
        color={colors.TagNavYellow}
        style={styles.RatingStar}
        size={27}
      />
      <TouchableOpacity
        style={styles.HartContainer}
        onPress={() => {
          if (Ico == "heart-outline") {
            SetIco("heart");
          } else {
            SetIco("heart-outline");
          }
          contorFav++;
        }}
      >
        <Icon
          name={Ico}
          color={colors.TagNavYellow}
          style={styles.FavoritesHart}
          size={27}
        />
      </TouchableOpacity>

      <Text style={styles.roomPriceItemLabel}>Price</Text>
      <Text style={styles.roomPriceItem}>{roomPrice} Euro</Text>
    </View>
  );
};

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

        console.log(response.data);
        DataChange(response.data);
        //console.log(response.data[0]);
        contor = false;
      }
    );
  }
  console.log(Data);
  const renderItem = ({ item }) => (
    <Item roomType={item.capacity} roomPrice={item.price} />
  );
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
            bottom: "66.2%",
            zIndex: 3,
            alignItems: "flex-end",
            right: "5%",
          }}
        >
          <Image
            source={require("../assets/ProfileImg.png")}
            style={{
              height: 27,
              width: 27,
              borderRadius: 27 / 2,
              backgroundColor: "black",
            }}
          />
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
            bottom: "65%",
            left: "10%",
          }}
        ></TextInput>
      </View>

      <View style={{ zIndex: 7, height: "65%", bottom: "18%" }}>
        <FlatList
          data={Data}
          renderItem={renderItem}
          keyExtractor={(item) => item.room_id.toString()}
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
    bottom: "62%",
    textAlign: "left",
    left: "8%",
    fontFamily: "robotoMed",
    color: "white",
    fontSize: 27,
  },
  AppMoto: {
    zIndex: 2,
    bottom: "69%",
    textAlign: "left",
    left: "8%",
    fontFamily: "robotoMed",
    color: colors.inputBorders,
    fontSize: 20,
  },
  LogOutBtn: {
    bottom: "70.5%",
    zIndex: 3,
    alignItems: "flex-end",
    right: "15%",
  },
  item: {
    backgroundColor: colors.WhiteCol,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    height: imageWidth / 1.5,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: colors.primary,
    shadowOpacity: 0.8,
    shadowRadius: 5,
    zIndex: 1,
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
  },
  itemImage: {
    resizeMode: "cover",
    height: imageWidth / 1.49,
    width: imageWidth / 1.49,
    bottom: "21.3%",
    right: "6.1%",
    alignContent: "flex-start",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    zIndex: 1,
  },
  roomTypeItem: {
    color: "black",
    left: "45%",
    bottom: "100%",
    fontSize: 18,
    zIndex: 99,
    position: "absolute",
    fontFamily: "robotoMed",
  },
  roomPriceItem: {
    color: "black",
    left: "45%",
    bottom: "16%",
    fontSize: 16,
    zIndex: 99,
    position: "absolute",
    fontFamily: "robotoMed",
  },
  roomPriceItemLabel: {
    color: colors.quaternary,
    left: "45%",
    bottom: "40%",
    fontSize: 15,
    zIndex: 99,
    position: "absolute",
    fontFamily: "robotoMed",
  },
  RatingValueLabel: {
    color: colors.quaternary,
    left: "93%",
    bottom: "100%",
    fontSize: 15,
    zIndex: 99,
    position: "absolute",
    fontFamily: "roboto",
  },
  RatingValue: {
    color: colors.TagNavYellow,
    left: "93%",
    bottom: "75%",
    fontSize: 15,
    zIndex: 99,
    position: "absolute",
    fontFamily: "roboto",
  },
  RatingStar: {
    color: colors.TagNavYellow,
    left: "100%",
    bottom: "76.8%",
    fontSize: 15,
    zIndex: 99,
    position: "absolute",
    fontFamily: "roboto",
  },
  FavoritesHart: {
    color: colors.tertiary,
    fontSize: 33,
    zIndex: 99,
    fontFamily: "roboto",
  },
  HartContainer: {
    left: "87%",
    backgroundColor: colors.WhiteCol,
    bottom: "75%",
    height: "35%",
    width: "15%",
  },
});
