import React, { Component, memo, useMemo, useState } from "react";
import Routes from "./Routes";
import { withNavigation } from "react-navigation";
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
  ImageBackground,
  DevSettings,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../config/colors";
import Axios from "axios";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { cos, set } from "react-native-reanimated";
import DropDownPicker from "react-native-dropdown-picker";
import { render } from "react-dom";
import DatePicker from "react-native-datepicker";
import Slider from "@react-native-community/slider";
import RoomDetailsScreen from "./RoomDetailsScreen";

const imageWidth = Dimensions.get("window").width / 2;
let verif = 3;
window.paramKey = {};
const renderItem = ({ item }) => {};

class HomeScreen extends Component {
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

  getSearchedRooms = () => {
    // Axios.post("https://api-ehotelplus.herokuapp.com/search", {
    // console.log(
    //   this.state.capacity +
    //     "   " +
    //     this.state.dateCheckIn +
    //     "    " +
    //     this.state.dateCheckOut +
    //     "    " +
    //     this.state.MaxPriceStateValue +
    //     "     " +
    //     this.state.MinPriceStateValue
    // );
    Axios.post("https://api-ehotelplus.herokuapp.com/search", {
      capacity: this.state.capacity,
      startDate: this.state.dateCheckIn,
      endDate: this.state.dateCheckOut,
      maxPrice: this.state.MaxPriceStateValue,
      minPrice: this.state.MinPriceStateValue,
    }).then((response) => {
      if (response.data.message) {
        //console.log(response.data.message);
      } else {
        this.setState({ Data: response.data });
        this.setState({ BookRoomLabel: "Book" });
        this.setState({ Ico: "" });
        this.setState({ LeftBtnHartBook: "55%" });
        this.setState({ WidthBtnHartBook: "37%" });
        this.setState({ BackColorHartBook: colors.secondary });
        //console.log(response.data);
      }
    });

    //console.log(testDate < this.state.dateCheckIn);
  };

  Item2 = (props) => {
    return (
      <View
        style={{
          height: imageWidth * 2,
          width: "100%",
          backgroundColor: colors.WhiteCol,
          elevation: 10,
          position: "absolute",
          zIndex: 10,
        }}
      >
        {/*Header*/}
        <View style={{ flex: 1.1 }}></View>

        {/*Back and type*/}
        <View
          style={{
            flex: 0.7,
            paddingLeft: "7%",
          }}
        >
          <TouchableOpacity
            onPress={this.SearchAnimationBack}
            style={{ width: "20%", height: "40%" }}
          >
            <Icon
              name="arrow-back-outline"
              color={colors.quaternary}
              size={31}
              style={{ bottom: "50%" }}
            />
          </TouchableOpacity>
          <Text
            style={{
              top: "15%",
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
                label: "Show all",
                value: "All",
              },
              {
                label: "Single room",
                value: "Single room",
              },
              {
                label: "Double room",
                value: "Double room",
              },
              {
                label: "Triple room",
                value: "Triple room",
              },
              {
                label: "Apartament",
                value: "Apartament",
              },
            ]}
            defaultValue={this.state.capacity}
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
                capacity: item.value,
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
            top: "3%",
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
            top: "3%",
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
            date={this.state.dateCheckIn}
            placeholder="-"
            format="YYYY-MM-DD"
            minDate={this.state.CurrentDate}
            maxDate={this.state.MaxDate}
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
              this.setState({ dateCheckIn: date });
            }}
          />

          <DatePicker
            style={{ width: "50%", left: "10%" }}
            mode="date"
            placeholder="-"
            date={this.state.dateCheckOut}
            format="YYYY-MM-DD"
            minDate={this.state.CurrentDate}
            maxDate={this.state.MaxDate}
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
              },
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {
              this.setState({ dateCheckOut: date });
            }}
          />
        </View>

        {/*Text Price min price max*/}
        <View
          style={{
            flex: 0.3,
            top: "6%",
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
            {this.state.MinPriceState}
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
            {this.state.MaxPriceState}
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
            top: "5%",
            paddingLeft: "7%",
          }}
        >
          <Slider
            style={{ width: "46%", height: 40, right: "20%" }}
            minimumValue={0}
            maximumValue={300}
            value={this.state.someValue1}
            thumbTintColor={colors.secondary}
            minimumTrackTintColor={colors.tertiary}
            maximumTrackTintColor={colors.wrongInput}
            step={10}
            onSlidingComplete={(someValue1) => {
              this.setState({ someValue1 });
              this.setState({
                MinPriceStateValue: someValue1,
              });
              if (someValue1 > 0) {
                if (someValue1 > 99) {
                  this.setState({
                    MinPriceState: someValue1.toString() + " EUR",
                  });
                } else {
                  this.setState({
                    MinPriceState: someValue1.toString() + " EURO",
                  });
                }
              } else {
                this.setState({
                  MinPriceState: "Min price ",
                });
              }
              //console.log(this.state.MinPriceStateValue);
            }}
          />

          <Slider
            style={{ width: "46%", height: 40, paddingBottom: 10, left: 10 }}
            minimumValue={0}
            maximumValue={300}
            value={(this.state.someValue = 300)}
            thumbTintColor={colors.secondary}
            minimumTrackTintColor={colors.tertiary}
            maximumTrackTintColor={colors.wrongInput}
            step={10}
            onSlidingComplete={(someValue) => {
              this.setState({ someValue });
              this.setState({
                MaxPriceStateValue: someValue,
              });
              if (someValue > 0) {
                if (someValue > 99) {
                  this.setState({
                    MaxPriceState: someValue.toString() + " EUR",
                  });
                } else {
                  this.setState({
                    MaxPriceState: someValue.toString() + " EURO",
                  });
                }
              } else {
                this.setState({
                  MaxPriceState: "Max price",
                });
              }

              //console.log(this.state.MaxPriceState);
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
          <TouchableOpacity
            style={{ width: "80%" }}
            onPress={() => {
              if (this.state.capacity == "All") {
                this.setState({ contor: true });
                this.setState({ BookRoomLabel: "Book" });
                this.setState({ Ico: "" });
                this.setState({ LeftBtnHartBook: "55%" });
                this.setState({ WidthBtnHartBook: "37%" });
                this.setState({ BackColorHartBook: colors.secondary });
                this.getRooms();
              } else {
                this.getSearchedRooms();
              }
            }}
          >
            <View
              style={{
                backgroundColor: colors.secondary,
                borderRadius: 100,
                alignItems: "center",
                justifyContent: "center",
                top: "10%",
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
                Search rooms
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
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

  getMinDate = () => {
    if (this.state.GetCurrentDate) {
      var date = new Date().getDate();
      if (date < 10) {
        date = "0" + date;
      }
      var month = new Date().getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      var year = new Date().getFullYear();
      var CurrentDate = year + "-" + month + "-" + date;
      this.setState({ CurrentDate: CurrentDate });
      this.setState({ dateCheckIn: CurrentDate });
      this.setState({ dateCheckOut: CurrentDate });
      this.setState({ GetCurrentDate: false });
    }
  };

  getMaxDate = () => {
    if (this.state.GetMaxDate) {
      var date = new Date().getDate();
      if (date < 10) {
        date = "0" + date;
      }
      var month = new Date().getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      var year = new Date().getFullYear() + 1;
      var CurrentDate = year + "-" + month + "-" + date;
      this.setState({ MaxDate: CurrentDate });
      this.setState({ GetMaxDate: false });
    }
  };

  render() {
    <RoomDetailsScreen />;
    const { navigation } = this.props;
    let clientId = global.this;
    this.getRooms();
    this.getMinDate();
    this.getMaxDate();
    //console.log(this.state.capacity);
    return (
      <View style={styles.container}>
        {/*Header View Home Screen*/}

        <View
          style={{
            zIndex: 11,
            height: "70%",
            flexDirection: "column",
          }}
        >
          <Animated.View
            style={{
              transform: [
                { translateX: this.state.position.x },
                { translateY: this.state.position.y },
              ],
              height: imageWidth * 2,
              width: "100%",

              elevation: 10,
              position: "absolute",
              zIndex: 10,
            }}
          >
            <this.Item2></this.Item2>
          </Animated.View>
          <ImageBackground
            source={require("../assets/HomeImg.png")}
            style={{
              resizeMode: "stretch",
              height: "95%",
              width: "100%",
            }}
          >
            {/*Name Logout profile View Home Screen*/}
            <View
              style={{
                flexDirection: "row",
                zIndex: 9,
                alignItems: "flex-end",
                flex: 1.9,
              }}
            >
              <Text style={styles.AppName}>eHotel+</Text>

              <TouchableOpacity
                style={styles.LogOutBtn}
                onPress={() => {
                  navigation.replace("Login");
                }}
              >
                <Icon name="log-out-outline" color={"white"} size={27} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  zIndex: 3,
                  alignItems: "flex-end",
                  right: "10%",
                  bottom: "0.3%",
                }}
              >
                <Image
                  source={require("../assets/ProfileImg.png")}
                  style={{
                    height: 27,
                    width: 27,
                    borderRadius: 27 / 2,
                  }}
                />
              </TouchableOpacity>
            </View>

            {/*Moto View Home Screen*/}
            <View
              style={{
                zIndex: 2,
                height: imageWidth / 4,
                alignItems: "flex-start",
                flex: 0.7,
              }}
            >
              <Text style={styles.AppMoto}>
                Let's explore the best{"\n"}hotel rooms
              </Text>
            </View>

            {/*Search View Home Screen*/}
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",

                justifyContent: "flex-start",
                alignItems: "center",
                flex: 1.3,
              }}
            >
              <TouchableOpacity
                placeholder="Search room"
                style={{
                  width: "80%",
                  flexDirection: "row",
                  backgroundColor: "white",
                  borderRadius: 100,
                  borderColor: colors.inputBorders,

                  alignItems: "center",
                  borderWidth: 1,
                  height: "25%",
                  paddingLeft: 20,
                }}
                onPress={() => {
                  this.SearchAnimation();
                }}
              >
                <Icon
                  name="search-outline"
                  color={colors.quaternary}
                  size={22}
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "roboto",
                    color: colors.quaternary,
                    left: 5,
                  }}
                >
                  Search rooms
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        {/*FlatList Rooms View Home Screen*/}
        <View
          style={{
            zIndex: 7,
            height: "60%",
            bottom: "10%",
          }}
        >
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

export default withNavigation(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  AppName: {
    textAlign: "left",
    left: "12%",
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
    right: "15%",
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
