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

class RoomsScreen extends Component {
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
          console.log(this.state.clientId1);
          //console.log(this.state.Data);
          //console.log(response.data[0]);
          this.setState({ contor: false });
        }
      );
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
    return (
      <View style={styles.container}>
        {/*Header View Home Screen*/}

        {/*FlatList Rooms View Home Screen*/}
        <View
          style={{
            zIndex: 7,
            height: "60%",
            bottom: "10%",
          }}
        >
          <View style={styles.Header}>
            <Text style={styles.HeaderLabel}>My bookings</Text>
          </View>

          <FlatList
            data={this.state.Data}
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
                        {item.item.capacity}
                      </Text>
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
                      <Text style={styles.roomPriceItem}>
                        {item.item.price} Euro
                      </Text>
                      <TouchableOpacity
                        style={[
                          styles.HartContainer,
                          {
                            alignItems: "center",
                            height: "70%",
                            width: this.state.WidthBtnHartBook,
                            left: this.state.LeftBtnHartBook,
                            backgroundColor: this.state.BackColorHartBook,
                            borderRadius: 100,
                            fontFamily: "robotoMed",
                            fontSize: 14,
                          },
                        ]}
                        onPress={() => {
                          paramKey = item.item;
                          if (this.state.Ico != "heart-outline") {
                            this.props.navigation.navigate("RoomDetailsScreen");
                          }
                        }}
                      >
                        <Text
                          style={{
                            color: colors.WhiteCol,
                            top: "15%",
                          }}
                        >
                          {this.state.BookRoomLabel}
                        </Text>
                        <Icon
                          name={this.state.Ico}
                          color={colors.TagNavYellow}
                          style={[styles.FavoritesHart, { bottom: "70%" }]}
                          size={27}
                        />
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
        <View style={{ height: "10%" }}></View>
        <StatusBar style="auto"></StatusBar>
      </View>
    );
  }
}

export default withNavigation(RoomsScreen);

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
  Header: {
    flex: 0.2,
    justifyContent: "flex-end",
  },
  HeaderLabel: {
    fontSize: 23,
    fontFamily: "robotoBold",
    left: "10%",
  },
});
