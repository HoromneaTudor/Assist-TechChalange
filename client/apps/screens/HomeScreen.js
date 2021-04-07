import React, { Component, memo, useMemo, useState } from "react";
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
  Animated,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../config/colors";
import Axios from "axios";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { set } from "react-native-reanimated";
import DropDownPicker from "react-native-dropdown-picker";
import { render } from "react-dom";
import DatePicker from "react-native-datepicker";

const imageWidth = Dimensions.get("window").width / 2;
let verif = 3;
let Ico = "heart-outline";

const renderItem = ({ item }) => {
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
          <Text style={styles.roomTypeItem}>{item.capacity}</Text>
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
          <Text style={styles.roomPriceItem}>{item.price} Euro</Text>
          <TouchableOpacity
            style={styles.HartContainer}
            onPress={() => {
              if (Ico == "heart-outline") {
                Ico = "heart";
              } else {
                Ico = "heart-outline";
              }
              console.log(Ico);
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

class HomeScreen extends Component {
  state = {
    Data: {},
    contor: true,
    contorFav: 0,
    SearchContainer: {},
    renderItem: {},
    Ico: "heart-outline",
    RoomItem: {},
    country: "uk",
    date: "2016-05-15",
    position: new Animated.ValueXY({ x: 0, y: -500 }),
    opacity: new Animated.Value(0),
    FlatListTop: "2%",
  };

  //console.log(contor);
  getRooms = () => {
    if (this.state.contor === true) {
      Axios.post("https://api-ehotelplus.herokuapp.com/rooms", {}).then(
        (response) => {
          //setRooms(response);
          // response.data.forEach((element) => {
          //   console.log(element);
          // });

          //console.log(response.data);
          this.setState({ Data: response.data });
          //console.log(this.state.Data);
          //console.log(response.data[0]);
          this.setState({ contor: false });
        }
      );
    }
  };

  Item2 = (props) => {
    return (
      <View
        style={{
          height: imageWidth * 2,
          width: "100%",
          backgroundColor: colors.tertiary,
          position: "absolute",
          zIndex: 100,
        }}
      >
        {/*Header*/}
        <View style={{ flex: 1.3 }}></View>

        {/*Back and type*/}
        <View style={{ flex: 0.7, paddingLeft: "7%" }}>
          <TouchableOpacity>
            <Icon
              name="arrow-back-outline"
              color={colors.quaternary}
              size={27}
            />
          </TouchableOpacity>
          <Text
            style={{
              top: "5%",
              fontFamily: "roboto",
              fontSize: 14,
              color: colors.quaternary,
            }}
          >
            Room type
          </Text>
        </View>
        {/*DropDown*/}
        <View
          style={{
            flex: 0.5,

            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <DropDownPicker
            items={[
              {
                label: "USA",
                value: "usa",
                icon: () => <Icon name="flag" size={18} color="#900" />,
                hidden: true,
              },
              {
                label: "UK",
                value: "uk",
                icon: () => <Icon name="flag" size={18} color="#900" />,
              },
              {
                label: "France",
                value: "france",
                icon: () => <Icon name="flag" size={18} color="#900" />,
              },
            ]}
            defaultValue={this.state.country}
            containerStyle={{
              height: "85%",
              width: "86%",
            }}
            style={{
              backgroundColor: colors.WhiteCol,
              borderColor: colors.inputBorders,
            }}
            itemStyle={{
              justifyContent: "flex-start",
              fontFamily: "roboto",
              fontSize: 10,
            }}
            onChangeItem={(item) =>
              this.setState({
                country: item.value,
              })
            }
            placeholder="Select an item"
            dropDownStyle={{
              backgroundColor: colors.WhiteCol,
            }}
          />
        </View>

        {/*Text Check-in check-out*/}
        <View
          style={{
            flex: 0.3,

            paddingLeft: "7%",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "baseline",
          }}
        >
          <Text
            style={{
              top: "5%",
              fontFamily: "roboto",
              fontSize: 14,
              color: colors.quaternary,
            }}
          >
            Check-in
          </Text>

          <Text
            style={{
              top: "5%",
              fontFamily: "roboto",
              fontSize: 14,
              marginLeft: "36%",
              color: colors.quaternary,
            }}
          >
            Check-out
          </Text>
        </View>

        {/*Date Picker*/}
        <View
          style={{
            flex: 0.5,

            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            alignContent: "center",
            paddingLeft: "7%",
          }}
        >
          <DatePicker
            style={{ width: "50%" }}
            mode="date"
            date={this.state.date}
            placeholder="-"
            format="YYYY-MM-DD"
            minDate="2016-05-01"
            maxDate="2016-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                height: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                borderRadius: 10,
                height: "90%",
                borderColor: colors.inputBorders,
                borderWidth: 2,
                backgroundColor: colors.WhiteCol,
                textAlign: "left",
              },
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {
              this.setState({ date: date });
            }}
          />

          <DatePicker
            style={{ width: "50%", left: "10%" }}
            mode="date"
            placeholder="-"
            format="YYYY-MM-DD"
            minDate="2016-05-01"
            maxDate="2016-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                height: 0,
                top: 4,
                marginLeft: 0,
              },
              dateText: {
                color: "red",
                placeholderTextColor: "red",
                fontSize: 10,
              },
              dateInput: {
                borderRadius: 10,
                height: "90%",
                borderColor: colors.inputBorders,
                borderWidth: 2,
                backgroundColor: colors.WhiteCol,
              },
              // ... You can check the source to find the other keys.
            }}
          />
        </View>

        {/*Text Price min price max*/}
        <View
          style={{
            flex: 0.3,

            paddingLeft: "7%",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "baseline",
          }}
        >
          <Text
            style={{
              top: "5%",
              fontFamily: "roboto",
              fontSize: 14,
              color: colors.quaternary,
            }}
          >
            Min price
          </Text>

          <Text
            style={{
              top: "5%",
              fontFamily: "roboto",
              fontSize: 14,
              marginLeft: "36%",
              color: colors.quaternary,
            }}
          >
            Max price
          </Text>
        </View>

        {/*Price range*/}
        <View
          style={{
            flex: 0.5,

            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            alignContent: "center",
            paddingLeft: "7%",
          }}
        >
          <TextInput
            placeholder="Select price"
            keyboardType="numeric"
            placeholderTextColor={colors.primary}
            style={{
              height: "90%",
              width: "40%",
              borderWidth: 2,
              borderRadius: 10,
              borderColor: colors.inputBorders,
              borderWidth: 2,
              backgroundColor: colors.WhiteCol,
              textAlign: "center",
              color: "red",
              fontFamily: "roboto",

              fontSize: 13,
            }}
            onChangeText={() => {
              console.log("dwad");
            }}
          />

          <TextInput
            placeholder="Select price"
            color={colors.in}
            placeholderTextColor={colors.primary}
            keyboardType="numeric"
            style={{
              height: "90%",
              width: "40%",
              left: "108%",
              borderWidth: 2,
              borderRadius: 10,
              borderColor: colors.inputBorders,
              borderWidth: 2,
              backgroundColor: colors.WhiteCol,
              textAlign: "center",
              color: colors.primary,

              fontFamily: "roboto",
              fontSize: 13,
            }}
            onChangeText={() => {
              console.log("dwad");
            }}
          />
        </View>
        <View
          style={{
            flex: 1,

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={{ width: "80%" }}>
            <View
              style={{
                backgroundColor: colors.secondary,
                borderRadius: 100,
                alignItems: "center",
                justifyContent: "center",

                height: imageWidth / 5,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 17,
                  fontFamily: "roboto",
                }}
              >
                Search room
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  SearchAnimation = () => {
    Animated.parallel([
      Animated.timing(this.state.position, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: true,
      }),
    ]).start();
  };

  HomeHide = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  render() {
    this.getRooms();
    this.SearchAnimation();
    return (
      <View style={styles.container}>
        {/*Header View Home Screen*/}

        <View
          style={{
            flex: 0.5,
            zIndex: 8,
          }}
        >
          <Animated.View
            style={{
              transform: [
                { translateX: this.state.position.x },
                { translateY: this.state.position.y },
              ],
            }}
          >
            <this.Item2></this.Item2>
          </Animated.View>
          <Image
            source={require("../assets/HomeImg.png")}
            style={{
              resizeMode: "stretch",
              height: "109%",
              width: "100%",
              height: 0,
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
                height: 0,
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
              height: 0,
              flexDirection: "column",
              bottom: "95%",
            }}
          >
            {/*Moto View Home Screen*/}
            <View
              style={{
                zIndex: 2,
                height: 0,
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
              style={{
                flex: 1,
                height: 0,
                alignItems: "center",
                justifyContent: "center",
              }}
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
                onTouchStart={() => {
                  this.SearchAnimation();
                  this.setState({ FlatListTop: "300%" });
                }}
              ></TextInput>
            </View>
          </View>
        </View>

        {/*FlatList Rooms View Home Screen*/}
        <View
          style={{
            zIndex: 7,
            height: "90%",
            top: this.state.FlatListTop,
            flex: 1,
          }}
        >
          <FlatList
            data={this.state.Data}
            renderItem={renderItem}
            keyExtractor={(item) => item.room_id.toString()}
          />
        </View>

        {/*Delimitator View Home Screen*/}
        <View style={{ height: "2%" }}></View>
        <StatusBar style="auto"></StatusBar>
      </View>
    );
  }
}

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
