import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  Animated,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import colors from "../config/colors";
import { Dimensions } from "react-native";

const imageWidth = Dimensions.get("window").width / 2;
class MyAccountScreen extends React.Component {
  fieldRef = React.createRef();

  state = {
    position: new Animated.ValueXY({ x: 0, y: -500 }),
  };

  onSubmit = () => {
    let { current: field } = this.fieldRef;

    //console.log(field.value());
  };

  formatText = (text) => {
    return text.replace(/[^+\d]/g, "");
  };

  SearchAnimation = () => {
    Animated.timing(this.state.position, {
      toValue: { x: 0, y: imageWidth / 1.5 },
      useNativeDriver: "true",
    }).start();
  };

  render() {
    this.SearchAnimation();
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.profileImg}
          source={require("../assets/ImgProfile6.jpeg")}
          resizeMode="stretch"
        >
          <Image
            source={require("../assets/ProfileAccountImage.png")}
            style={{
              height: imageWidth / 1.2,
              width: imageWidth / 1.2,
              borderRadius: imageWidth / 2,
              top: "5%",
            }}
          />
        </ImageBackground>
        <View style={styles.profileLabel}>
          <Text style={styles.AccountLabel}>General information</Text>
        </View>
        <ScrollView
          style={{
            flex: 2,
            paddingBottom: 10,
            top: "2%",
          }}
        >
          <View style={styles.profileData}>
            <TextInput
              placeholder="First name"
              keyboardType="default"
              style={{
                alignSelf: "center",
                height: "8%",
                width: "80%",
                borderWidth: 12,
                borderRadius: 10,
                borderColor: colors.quaternary,
                borderWidth: 2,
                backgroundColor: colors.WhiteCol,
                textAlign: "left",
                paddingLeft: "5%",
                color: "red",
              }}
            ></TextInput>

            <TextInput
              placeholder="Second name"
              keyboardType="default"
              style={{
                top: "3%",
                alignSelf: "center",
                height: "8%",
                width: "80%",
                borderWidth: 12,
                borderRadius: 10,
                borderColor: colors.quaternary,
                borderWidth: 2,
                backgroundColor: colors.WhiteCol,
                textAlign: "left",
                paddingLeft: "5%",
                color: "red",
              }}
            ></TextInput>

            <TextInput
              placeholder="Email address"
              keyboardType="email-address"
              style={{
                top: "6%",
                alignSelf: "center",
                height: "8%",
                width: "80%",
                borderWidth: 12,
                borderRadius: 10,
                borderColor: colors.quaternary,
                borderWidth: 2,
                backgroundColor: colors.WhiteCol,
                textAlign: "left",
                paddingLeft: "5%",
                color: "red",
              }}
            ></TextInput>

            <TextInput
              placeholder="Phone number"
              keyboardType="numeric"
              style={{
                top: "9%",
                alignSelf: "center",
                height: "8%",
                width: "80%",
                borderWidth: 12,
                borderRadius: 10,
                borderColor: colors.quaternary,
                borderWidth: 2,
                backgroundColor: colors.WhiteCol,
                textAlign: "left",
                paddingLeft: "5%",
                color: "red",
              }}
            ></TextInput>

            <TextInput
              placeholder="Password"
              keyboardType="default"
              style={{
                top: "12%",
                alignSelf: "center",
                height: "8%",
                width: "80%",
                borderWidth: 12,
                borderRadius: 10,
                borderColor: colors.quaternary,
                borderWidth: 2,
                backgroundColor: colors.WhiteCol,
                textAlign: "left",
                paddingLeft: "5%",
                color: "red",
              }}
            ></TextInput>

            <TextInput
              placeholder="Confirm password"
              keyboardType="default"
              style={{
                top: "15%",
                alignSelf: "center",
                height: "8%",
                width: "80%",
                borderWidth: 12,
                borderRadius: 10,
                borderColor: colors.quaternary,
                borderWidth: 2,
                backgroundColor: colors.WhiteCol,
                textAlign: "left",
                paddingLeft: "5%",
                color: "red",
              }}
            ></TextInput>

            <TouchableOpacity
              placeholder="Search room"
              style={{
                width: "80%",
                top: "25%",
                flexDirection: "row",
                backgroundColor: colors.primary,
                borderRadius: 100,
                borderColor: colors.primary,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                height: "9%",
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: "robotoMed",
                  color: colors.WhiteCol,
                }}
              >
                Update data
              </Text>
            </TouchableOpacity>

            <View style={{ height: 300 }} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default MyAccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WhiteCol,
  },
  profileImg: {
    flex: 0.7,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  profileData: {
    flex: 2,
  },
  profileLabel: {
    flex: 0.2,
    justifyContent: "center",
    borderBottomColor: colors.primary,
    shadowOpacity: 0.8,
    elevation: 2,
    bottom: "1%",
    width: "100%",
    shadowOffset: { width: 0, height: 10 },
  },
  Top: {
    flex: 0.3,
  },
  TopLabel: {
    flex: 0.3,

    justifyContent: "center",
    alignItems: "center",
  },
  AccountLabel: {
    fontFamily: "robotoMed",
    fontSize: 23,
    left: "10%",
    top: "8%",
    color: colors.quaternary,
  },
});
