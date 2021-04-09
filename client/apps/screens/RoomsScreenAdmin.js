import React, { Component } from "react";
import { withNavigation } from "react-navigation";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Animated,
  ImageBackground,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../config/colors";
import Axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";
import DatePicker from "react-native-datepicker";
import Slider from "@react-native-community/slider";
import RoomDetailsScreen from "./RoomDetailsScreen";

const imageWidth = Dimensions.get("window").width / 2;

class RoomsScreenAdmin extends Component {
  state = {
    Data: {},
    contor: true,
    contorFav: 0,
    SearchContainer: {},
    renderItem: {},
    Ico: "heart-outline",
    RoomItem: {},
    capacity: "",
    dateCheckIn: "",
    dateCheckOut: "",
    size: new Animated.Value(0),
    position: new Animated.ValueXY({ x: 0, y: -500 }),
    MinPriceState: "Min price",
    MaxPriceState: "Max price",
    MinPriceStateValue: 0,
    MaxPriceStateValue: 300,
    CurrentDate: "",
    MaxDate: "",
    GetCurrentDate: true,
    GetMaxDate: true,
    Ico: "heart-outline",
    BookRoomLabel: "",
    LeftBtnHartBook: "70%",
    WidthBtnHartBook: "15%",
    BackColorHartBook: colors.WhiteCol,
    clientId1: global.clientId,
    contor2: true,
    clientBookings: [],
    clientBookingSize: 0,
    adminBooking: [],
  };

  getBooking = () => {
    //console.log("yo");
    if (this.state.contor2 == true) {
      Axios.post("https://api-ehotelplus.herokuapp.com/getAllBookings").then(
        (response) => {
          //buff = response.data;
          this.setState({ adminBooking: response.data });
          console.log(response.data);
          //console.log(Object.keys(this.state.clientBookings).length);

          //console.log(this.state.clientBookingSize);
        }
      );

      this.setState({ contor2: false });
      //this.getRoomsBooking();
    }
  };

  SearchAnimation = () => {
    Animated.timing(this.state.position, {
      toValue: { x: 0, y: imageWidth / 1.5 },
      useNativeDriver: "true",
    }).start();
  };

  SearchAnimationBack = () => {
    Animated.timing(this.state.position, {
      toValue: { x: 0, y: -500 },
      useNativeDriver: "true",
    }).start();
  };

  render() {
    //console.log(this.state.capacity);
    this.getBooking();
    return (
      <View style={styles.container}>
        {/*Header View Home Screen*/}

        <View style={styles.Header}>
          <Text style={styles.HeaderLabel}>All bookings</Text>
        </View>

        <View style={{ flex: 1, top: "2%" }}>
          <FlatList
            data={this.state.adminBooking}
            renderItem={(item) => {
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
                      <Text style={styles.roomTypeItem}>
                        CHECK-IN: {item.item.start_date}
                      </Text>
                      <Text style={styles.roomTypeItem2}>
                        CHECK-OUT: {item.item.end_date}
                      </Text>
                    </View>

                    <View
                      style={{
                        flex: 0.6,
                        justifyContent: "center",
                        flexDirection: "row",
                      }}
                    >
                      <TouchableOpacity
                        style={[
                          styles.HartContainer,
                          {
                            alignItems: "center",
                            height: "70%",
                            width: "28%",
                            right: "15%",
                            backgroundColor: colors.wrongInput,
                            borderRadius: 10,
                            fontFamily: "robotoMed",
                            justifyContent: "center",
                            fontSize: 13,
                          },
                        ]}
                        onPress={() => {}}
                      >
                        <Text
                          style={{
                            color: colors.WhiteCol,
                            fontSize: 11,
                            fontFamily: "robotoMed",
                          }}
                        >
                          Cancel
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.HartContainer,
                          {
                            alignItems: "center",
                            height: "70%",
                            width: "28%",
                            right: "5%",
                            backgroundColor: colors.secondary,
                            borderRadius: 10,
                            fontFamily: "robotoMed",
                            justifyContent: "center",
                            fontSize: 11,
                          },
                        ]}
                        onPress={() => {}}
                      >
                        <Text
                          style={{
                            color: colors.WhiteCol,
                            fontSize: 11,
                            fontFamily: "robotoMed",
                          }}
                        >
                          Check-in
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.HartContainer,
                          {
                            alignItems: "center",
                            height: "70%",
                            width: "28%",
                            left: "6%",
                            backgroundColor: colors.secondary,
                            borderRadius: 10,
                            fontFamily: "robotoMed",
                            justifyContent: "center",
                            fontSize: 14,
                          },
                        ]}
                        onPress={() => {}}
                      >
                        <Text
                          style={{
                            color: colors.WhiteCol,
                            fontSize: 11,
                            fontFamily: "robotoMed",
                          }}
                        >
                          Check-out
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            }}
            keyExtractor={(item) => item.room_id.toString()}
          />
        </View>

        {/*Delimitator View Home Screen*/}
        <View style={{ height: "3%" }}></View>
        <StatusBar style="auto"></StatusBar>
      </View>
    );
  }
}

export default withNavigation(RoomsScreenAdmin);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },

  item: {
    backgroundColor: colors.WhiteCol,
    marginVertical: 8,
    marginHorizontal: 16,
    height: imageWidth / 1.5,
    elevation: 7,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: colors.primary,
    shadowOpacity: 1,
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
    fontSize: 16,
    zIndex: 99,
    left: "5%",
    position: "absolute",
    fontFamily: "robotoMed",
  },
  roomTypeItem2: {
    color: "black",
    fontSize: 16,
    zIndex: 99,
    left: "5%",
    bottom: "5%",
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

  Header: {
    flex: 0.2,
    justifyContent: "flex-end",
  },
  HeaderLabel: {
    fontSize: 35,
    fontFamily: "robotoBold",
    left: "5%",
  },
});
