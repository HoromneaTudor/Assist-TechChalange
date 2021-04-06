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
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../config/colors";
import Axios from "axios";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { set } from "react-native-reanimated";
import DropDownPicker from "react-native-dropdown-picker";

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
      <View
        style={{
          //backgroundColor: "blue",
          flex: 0.8,
        }}
      >
        <View
          style={{
            //backgroundColor: "red",
            flex: 1,
            justifyContent: "center",
            bottom: "5%",
          }}
        >
          <Text style={styles.roomTypeItem}>{roomType}</Text>
          <Text style={styles.RatingValueLabel}>Rating</Text>
          <Text style={styles.RatingValue}>8.5</Text>
          <Icon
            name="star"
            color={colors.TagNavYellow}
            style={styles.RatingStar}
            size={27}
          />
        </View>

        <View
          style={{
            //backgroundColor: "yellow",
            flex: 0.3,
            justifyContent: "center",
          }}
        >
          <Text style={styles.roomPriceItemLabel}>Price</Text>
        </View>

        <View
          style={{
            flex: 0.6,
            justifyContent: "flex-start",
          }}
        >
          <Text style={styles.roomPriceItem}>{roomPrice} Euro</Text>
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
        </View>
      </View>
    </View>
  );
};

const Item2 = (props) => {
  return (
    <View
      style={{
        height: imageWidth * 2,
        width: "100%",
        backgroundColor: colors.inputBorders,
        position: "absolute",
      }}
    >
      <View style={{ flex: 1, backgroundColor: "red" }}></View>
      <View style={{ flex: 1, backgroundColor: "blue" }}>
        <TouchableOpacity>
          <Icon name="arrow-back-outline" color={colors.quaternary} size={27} />
        </TouchableOpacity>
        <Text>Room type</Text>
      </View>
      <View style={{ flex: 1, backgroundColor: "green" }}></View>
      <View style={{ flex: 1, backgroundColor: "violet" }}></View>
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
      {/*Header View Home Screen*/}
      <View
        style={{
          flex: 0.5,
          zIndex: 8,
        }}
      >
        <View style={{ zIndex: 10 }}>
          <Item2></Item2>
        </View>

        <Image
          source={require("../assets/HomeImg.png")}
          style={{
            resizeMode: "stretch",
            height: "109%",
            width: "100%",
            zIndex: 1,
          }}
        />

        <View
          style={{
            zIndex: 11,
            height: imageWidth / 3,
            flexDirection: "column",
            bottom: "95%",
          }}
        >
          {/*Name Logout profile View Home Screen*/}
          <View
            style={{
              flexDirection: "row",
              top: "2%",
              zIndex: 11,
              alignItems: "center",
              flex: 1,
            }}
          >
            <Text style={styles.AppName}>eHotel+</Text>

            <TouchableOpacity style={styles.LogOutBtn}>
              <Icon name="log-out-outline" color={"white"} size={27} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                zIndex: 3,
                alignItems: "flex-end",
                right: "35%",
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
          </View>
        </View>
        <View
          style={{
            zIndex: 9,
            height: imageWidth / 1.4,
            flexDirection: "column",
            bottom: "95%",
          }}
        >
          {/*Moto View Home Screen*/}
          <View
            style={{
              zIndex: 2,
              height: imageWidth / 4,
              alignItems: "flex-start",
              flex: 1,
            }}
          >
            <Text style={styles.AppMoto}>
              Let's explore the best{"\n"}hotel rooms
            </Text>
          </View>

          {/*Search View Home Screen*/}
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <TextInput
              placeholder="Search room"
              style={{
                width: "80%",
                backgroundColor: "white",
                borderRadius: 100,
                borderColor: colors.inputBorders,
                borderWidth: 1,
                height: "60%",
                paddingLeft: 20,
                bottom: "20%",
              }}
            ></TextInput>
          </View>
        </View>
      </View>

      {/*FlatList Rooms View Home Screen*/}
      <View style={{ zIndex: 7, height: "90%", top: 10, flex: 1 }}>
        <FlatList
          data={Data}
          renderItem={renderItem}
          keyExtractor={(item) => item.room_id.toString()}
        />
      </View>

      {/*Delimitator View Home Screen*/}
      <View style={{ height: "2%" }}></View>
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
    textAlign: "left",
    left: "45%",
    fontFamily: "robotoMed",
    color: colors.WhiteCol,
    fontSize: 27,
    flex: 1,
  },
  AppMoto: {
    textAlign: "left",
    fontFamily: "robotoMed",
    color: colors.inputBorders,
    fontSize: 20,
    left: "8%",
  },
  LogOutBtn: {
    alignItems: "flex-end",
    right: "55%",
  },
  item: {
    backgroundColor: colors.WhiteCol,

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
    flexDirection: "row",
  },
  title: {
    fontSize: 32,
  },
  itemImage: {
    resizeMode: "cover",
    height: imageWidth / 1.49,
    width: imageWidth / 1.49,
    alignContent: "flex-start",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    zIndex: 1,
    flex: 0.5,
  },
  roomTypeItem: {
    color: "black",
    fontSize: 18,
    zIndex: 99,
    left: "5%",
    position: "absolute",
    fontFamily: "robotoMed",
  },
  roomPriceItem: {
    color: "black",
    left: "5%",
    fontSize: 16,
    zIndex: 99,
    position: "absolute",
    fontFamily: "robotoMed",
    top: "5%",
  },
  roomPriceItemLabel: {
    color: colors.quaternary,
    left: "5%",
    fontSize: 15,
    zIndex: 99,
    position: "absolute",
    fontFamily: "robotoMed",
  },
  RatingValueLabel: {
    color: colors.quaternary,
    fontSize: 15,
    zIndex: 99,
    left: "70%",
    position: "absolute",
    fontFamily: "roboto",
  },
  RatingValue: {
    color: colors.TagNavYellow,
    fontSize: 15,
    zIndex: 99,
    left: "70%",
    top: "65%",
    position: "absolute",
    fontFamily: "roboto",
  },
  RatingStar: {
    color: colors.TagNavYellow,
    fontSize: 15,
    zIndex: 99,
    left: "81%",
    top: "69%",
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
    backgroundColor: colors.WhiteCol,
    height: "82%",
    width: "17%",
    left: "70%",
    bottom: "20%",
  },
});
