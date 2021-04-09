import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Dimensions } from "react-native";
import colors from "../config/colors";
import { SliderBox } from "react-native-image-slider-box";
import Icon from "react-native-vector-icons/Ionicons";
import { color } from "react-native-reanimated";
import Routes from "./Routes";
import Axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";

const imageWidth = Dimensions.get("window").width / 2;
let options = {};
class RoomDetailsScreenAdminEdit extends Component {
  state = {
    images: [
      require("../assets/RoomImg.jpeg"),
      require("../assets/RoomImg2.jpeg"),
      require("../assets/RoomImg3.jpeg"),
    ],
    RoomPrice: 0,
    RoomType: "",
    RoomOptions: "",
    contor: true,
    positionUp: new Animated.ValueXY({ x: -400, y: 0 }),
    RoomId: 0,
    startDate: "",
    sndDate: "",
    clientId: 0,
    price: 0,
    capacity: "",
  };

  _getPrice = (text) => {
    this.setState({ price: text });
  };

  _getCapacity = (text) => {
    this.setState({ capacity: text });
  };

  editRoom = () => {
    if (this.state.price != 0) {
      Axios.post("https://api-ehotelplus.herokuapp.com/changePrice", {
        roomId: window.paramKey.room_id,
        price: window.paramKey.price,
      }).then((response) => {
        console.log(response);
      });
    }
    if (this.state.capacity != "") {
      Axios.post("https://api-ehotelplus.herokuapp.com/changeCapacity", {
        roomId: window.paramKey.room_id,
        capacity: window.paramKey.capacity,
      }).then((result) => {});
    }
  };

  addBooking = () => {
    Axios.post("https://api-ehotelplus.herokuapp.com/addBooking", {
      clientId: this.state.clientId,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      roomId: this.state.RoomId,
    }).then((response) => {
      //console.log(response);
      this.getSearchedRooms();
    });
  };

  UpAnimation = () => {
    Animated.timing(this.state.positionUp, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: "true",
    }).start();
  };

  RoomOptionsItem = (props) => {
    options = this.state.RoomOptions.split(",");

    var R = [];
    var chunkSize = 1;
    for (var i = 0, len = options.length; i < len; i += chunkSize)
      R.push(options.slice(i, i + chunkSize) + "\n\n");

    console.log(R);
    return (
      <FlatList
        data={[R]}
        style={{ width: "100%" }}
        renderItem={({ item }) => <Text style={styles.DetailText}>{item}</Text>}
      />
    );
  };

  getRoomData = () => {
    if (this.state.contor) {
      this.setState({ RoomPrice: window.paramKey.price });
      this.setState({ RoomType: window.paramKey.capacity });
      this.setState({ RoomOptions: window.paramKey.options });
      this.setState({ contor: false });
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
    this.getRoomData();
    this.UpAnimation();
    return (
      <Animated.View
        style={[
          styles.container,
          {
            transform: [
              { translateX: this.state.positionUp.x },
              { translateY: this.state.positionUp.y },
            ],
          },
        ]}
      >
        <View style={styles.RoomImg}>
          <SliderBox
            images={this.state.images}
            dotColor={colors.secondary}
            inactiveDotColor={"#90A4AE"}
            sliderBoxHeight="100%"
            imageLoadingColor="rgba(52, 52, 52, 0.0)"
            circleLoop
          />
        </View>
        <View style={styles.RoomDetails}>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <DropDownPicker
              items={[
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
                height: "55%",
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
              onChangeItem={(item) => {
                this.setState({
                  capacity: item.value,
                });
                this._getCapacity(item.value);
              }}
              placeholder="Select an item"
              dropDownStyle={{
                backgroundColor: colors.WhiteCol,
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",

              width: "100%",
              alignItems: "center",
            }}
          >
            <Text style={styles.DetailTextPriceLabel}>Price</Text>
            <TextInput
              placeholder="EURO"
              keyboardType="numeric"
              style={{
                height: "55%",
                width: "40%",
                borderRadius: 10,
                borderColor: colors.quaternary,
                borderWidth: 2,
                left: "70%",
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: "3%",
              }}
              onChangeText={this._getPrice}
            ></TextInput>
          </View>
        </View>
        <View style={styles.RoomDetailsOptions}>
          <Text style={styles.OptionsLabel}></Text>
          <Text style={styles.OptionsLabel}>Options</Text>
          <this.RoomOptionsItem></this.RoomOptionsItem>
        </View>
        <View style={styles.RoomBook}>
          <TouchableOpacity
            placeholder="Search room"
            style={{
              width: "35%",
              flexDirection: "row",
              backgroundColor: colors.TagNavYellow,
              borderRadius: 100,
              borderColor: colors.TagNavYellow,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              height: "45%",
              right: "5%",
            }}
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontFamily: "robotoMed",
                color: colors.WhiteCol,
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            placeholder="Search room"
            style={{
              width: "35%",
              flexDirection: "row",
              backgroundColor: colors.secondary,
              borderRadius: 100,
              borderColor: colors.secondary,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              height: "45%",
              left: "5%",
            }}
            onPress={() => {
              //this.editRoom();
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontFamily: "robotoMed",
                color: colors.WhiteCol,
              }}
            >
              Update
            </Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto"></StatusBar>
      </Animated.View>
    );
  }
}

export default RoomDetailsScreenAdminEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  RoomImg: {
    flex: 0.7,
  },
  RoomDetails: {
    flex: 0.35,
    alignItems: "flex-start",
    shadowColor: colors.primary,
    shadowOpacity: 0.5,
    borderBottomColor: colors.primary,
    elevation: 2,
  },
  RoomDetailsOptions: {
    flex: 1,
    alignItems: "flex-start",
  },
  RoomBook: {
    flex: 0.2,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  DetailText: {
    fontFamily: "roboto",
    fontSize: 16,
    color: colors.quaternary,
    top: "5%",
    left: "10%",
  },
  DetailTextType: {
    fontFamily: "robotoMed",
    fontSize: 30,
    color: colors.primary,
    top: "15%",
    left: "10%",
  },

  DetailTextPriceLabel: {
    fontFamily: "roboto",
    fontSize: 20,
    color: colors.quaternary,

    left: "50%",
  },

  DetailTextPrice: {
    fontFamily: "robotoMed",
    fontSize: 20,
    color: colors.primary,
    top: "20%",
    left: "10%",
  },
  OptionsLabel: {
    fontFamily: "robotoMed",
    fontSize: 17,
    color: colors.primary,
    left: "10%",
  },
});
