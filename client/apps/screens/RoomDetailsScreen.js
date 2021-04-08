import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Dimensions } from "react-native";
import colors from "../config/colors";
import { SliderBox } from "react-native-image-slider-box";
import Icon from "react-native-vector-icons/Ionicons";
import { color } from "react-native-reanimated";

const imageWidth = Dimensions.get("window").width / 2;

class RoomDetailsScreen extends Component {
  state = {
    images: [
      require("../assets/RoomImg.jpeg"),
      require("../assets/RoomImg2.jpeg"),
      require("../assets/RoomImg3.jpeg"),
    ],
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
    return (
      <View style={styles.container}>
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
          <Text style={styles.DetailText}>Detail</Text>
          <Text style={styles.DetailText}>Detail</Text>
          <Text style={styles.DetailText}>Detail</Text>
          <Text style={styles.DetailText}>Detail</Text>
          <Text style={styles.DetailText}>Detail</Text>
          <Text style={styles.DetailText}>Detail</Text>
          <Text style={styles.DetailText}>Detail</Text>
          <Text style={styles.DetailText}>Detail</Text>
          <Text style={styles.DetailText}>
            Detail Detail Detail Detail Detail Detail Detail Detail
          </Text>
          <Text style={styles.DetailText}>
            Detail Detail Detail Detail Detail Detail Detail Detail
          </Text>
          <Text style={styles.DetailText}>
            Detail Detail Detail Detail Detail Detail Detail Detail
          </Text>
          <Text style={styles.DetailText}>Detail Detail Detail </Text>
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
              height: "30%",
              right: "5%",
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
              height: "30%",
              left: "5%",
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontFamily: "robotoMed",
                color: colors.WhiteCol,
              }}
            >
              Book room
            </Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto"></StatusBar>
      </View>
    );
  }
}

export default RoomDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  RoomImg: {
    flex: 0.6,
  },
  RoomDetails: {
    flex: 0.9,

    alignItems: "flex-start",
  },
  RoomBook: {
    flex: 0.3,

    flexDirection: "row",
    justifyContent: "center",
  },
  DetailText: {
    fontFamily: "roboto",
    fontSize: 16,
    color: colors.primary,
    top: "10%",
    left: "5%",
  },
});
