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
  FlatList,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import colors from "../config/colors";
import { Dimensions } from "react-native";
import Axios from "axios";

const imageWidth = Dimensions.get("window").width / 2;

class MyAccountScreen extends React.Component {
  fieldRef = React.createRef();

  state = {
    position: new Animated.ValueXY({ x: 0, y: -1000 }),
    positionLabel: new Animated.ValueXY({ x: -900, y: 0 }),
    positionCards: new Animated.ValueXY({ x: 0, y: 1000 }),
    renderMode: "",

    firstNameReq: "",
    lastNameReq: "",
    emailReq: "",
    phoneReq: "",
    passwordReq: "",
    confPassReq: "",
    clientId: global.clientId,
    tempoparyPassword: "",
  };

  changeCreditentials = () => {
    Axios.post("https://api-ehotelplus.herokuapp.com/getPassword", {
      clientId: this.state.clientId,
    }).then((response) => {
      this._setTemporaryPassword(response.data[0]);
      //console.log(response.data[0]);
    });

    if (this.state.firstNameReq != "") {
      Axios.post("https://api-ehotelplus.herokuapp.com/updateFirstName", {
        clientId: this.state.clientId,
        firstName: this.state.firstNameReq,
      }).then((response) => {});
    }
    if (this.state.lastNameReq != "") {
      Axios.post("https://api-ehotelplus.herokuapp.com/updateLastName", {
        clientId: this.state.clientId,
        lastName: this.state.lastNameReq,
      }).then((response) => {});
    }
    if (this.state.emailReq != "") {
      Axios.post("https://api-ehotelplus.herokuapp.com/updateEmail", {
        clientId: this.state.clientId,
        email: this.state.emailReq,
      }).then((response) => {});
    }
    if (this.state.phoneReq != "") {
      Axios.post("https://api-ehotelplus.herokuapp.com/updatePhoneNumber", {
        clientId: this.state.clientId,
        phone: this.state.phoneReq,
      }).then((response) => {});
    }
    if (this.state.passwordReq != "") {
      Axios.post("https://api-ehotelplus.herokuapp.com/updatePassword", {
        clientId: this.state.clientId,
        password: this.state.passwordReq,
      }).then((response) => {});
    }
  };

  _setTemporaryPassword = (text) => {
    this.setState({ tempoparyPassword: text });
  };

  _getFirstName = (text) => {
    this.setState({ firstNameReq: text });
    //console.log(this.state.firstNameReq);
  };

  _getLastName = (text) => {
    this.setState({ lastNameReq: text });
    //console.log(this.state.lastNameReq);
  };

  _getEmail = (text) => {
    this.setState({ emailReq: text });
    //console.log(this.state.emailReq);
  };

  _getPhone = (text) => {
    this.setState({ phoneReq: text });
    //console.log(this.state.phoneReq);
  };

  _getPassword = (text) => {
    this.setState({ passwordReq: text });
    //console.log(this.state.passwordReq);
  };

  _getPasswardConfirmation = (text) => {
    this.setState({ confPassReq: text });
    //console.log(this.state.confPassReq);
  };

  _emailValidation = (text) => {
    console.log(text);
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reg.test(text) === false) {
      //console.log("Email is Not Correct");
      //this.setState({ email: text })
      this.setState({ emailErrorMsg: "The email is not valid" });
      this.setState({ InputBorderColorEmail: colors.wrongInput });
      return false;
    } else {
      //this.setState({ email: text })
      //console.log("Email is Correct");
      this.setState({ emailErrorMsg: "" });
      return true;
    }
  };

  _phoneValidation = () => {
    let phonenumberLenght = this.state.phoneReq.length;
    if (phonenumberLenght != 10 || isNaN(this.state.phoneReq)) {
      this.setState({ phoneErrorMsg: "the phone number is not valid" });
      this.setState({ InputBorderColorPhoneNumber: colors.wrongInput });
      return false;
    }
    this.setState({ phoneErrorMsg: "" });
    return true;
  };

  _passwordValidation = () => {
    if (this.state.passwordReq != "") {
      this.setState({ passwordErrorMsg: "" });
      return true;
    }
    this.setState({ passwordErrorMsg: "You need to complete this field" });
    this.setState({ InputBorderColorPassword: colors.wrongInput });
    return false;
  };

  onSubmit = () => {
    let { current: field } = this.fieldRef;

    //console.log(field.value());
  };

  changeCreditentials = () => {
    Axios.post("https://api-ehotelplus.herokuapp.com/getPassword", {
      clientId: this.state.clientId,
    }).then((response) => {
      this._setTemporaryPassword(response.data[0]);
      console.log(response.data[0]);
    });

    if (this.state.firstNameReq != "") {
      Axios.post("https://api-ehotelplus.herokuapp.com/updateFirstName", {
        clientId: this.state.clientId,
        firstName: this.state.firstNameReq,
      }).then((response) => {});
    }
    if (this.state.lastNameReq != "") {
      Axios.post("https://api-ehotelplus.herokuapp.com/updateLastName", {
        clientId: this.state.clientId,
        lastName: this.state.lastNameReq,
      }).then((response) => {});
    }
    if (this.state.emailReq != "") {
      Axios.post("https://api-ehotelplus.herokuapp.com/updateEmail", {
        clientId: this.state.clientId,
        email: this.state.emailReq,
      }).then((response) => {});
    }
    if (this.state.phoneReq != "") {
      Axios.post("https://api-ehotelplus.herokuapp.com/updatePhoneNumber", {
        clientId: this.state.clientId,
        phone: this.state.phoneReq,
      }).then((response) => {});
    }
    if (this.state.passwordReq != "") {
      Axios.post("https://api-ehotelplus.herokuapp.com/updatePassword", {
        clientId: this.state.clientId,
        password: this.state.passwordReq,
      }).then((response) => {});
    }
  };

  _setTemporaryPassword = (text) => {
    this.setState({ tempoparyPassword: text });
  };

  _getFirstName = (text) => {
    this.setState({ firstNameReq: text });
    //console.log(this.state.firstNameReq);
  };

  _getLastName = (text) => {
    this.setState({ lastNameReq: text });
    //console.log(this.state.lastNameReq);
  };

  _getEmail = (text) => {
    this.setState({ emailReq: text });
    //console.log(this.state.emailReq);
  };

  _getPhone = (text) => {
    this.setState({ phoneReq: text });
    //console.log(this.state.phoneReq);
  };

  _getPassword = (text) => {
    this.setState({ passwordReq: text });
    //console.log(this.state.passwordReq);
  };

  _getPasswardConfirmation = (text) => {
    this.setState({ confPassReq: text });
    //console.log(this.state.confPassReq);
  };

  _emailValidation = (text) => {
    console.log(text);
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reg.test(text) === false) {
      //console.log("Email is Not Correct");
      //this.setState({ email: text })
      this.setState({ emailErrorMsg: "The email is not valid" });
      this.setState({ InputBorderColorEmail: colors.wrongInput });
      return false;
    } else {
      //this.setState({ email: text })
      //console.log("Email is Correct");
      this.setState({ emailErrorMsg: "" });
      return true;
    }
  };

  _phoneValidation = () => {
    let phonenumberLenght = this.state.phoneReq.length;
    if (phonenumberLenght != 10 || isNaN(this.state.phoneReq)) {
      this.setState({ phoneErrorMsg: "the phone number is not valid" });
      this.setState({ InputBorderColorPhoneNumber: colors.wrongInput });
      return false;
    }
    this.setState({ phoneErrorMsg: "" });
    return true;
  };

  _passwordValidation = () => {
    if (this.state.passwordReq != "") {
      this.setState({ passwordErrorMsg: "" });
      return true;
    }
    this.setState({ passwordErrorMsg: "You need to complete this field" });
    this.setState({ InputBorderColorPassword: colors.wrongInput });
    return false;
  };

  formatText = (text) => {
    return text.replace(/[^+\d]/g, "");
  };

  ShowPrivacyAnimation = () => {
    Animated.parallel([
      Animated.timing(this.state.position, {
        toValue: { x: 0, y: imageWidth / 6 },
        useNativeDriver: "true",
      }),
      Animated.timing(this.state.positionLabel, {
        toValue: { x: -900, y: 0 },
        useNativeDriver: "true",
      }),
    ]).start();
  };

  ShowGeneralAnimation = () => {
    Animated.parallel([
      Animated.timing(this.state.positionLabel, {
        toValue: { x: 0, y: -imageWidth },
        useNativeDriver: "true",
      }),
      Animated.timing(this.state.position, {
        toValue: { x: 0, y: -1000 },
        useNativeDriver: "true",
      }),
    ]).start();
  };

  ShowCardsAnimation = () => {
    Animated.parallel([
      Animated.timing(this.state.positionCards, {
        toValue: { x: 0, y: -imageWidth },
        useNativeDriver: "true",
      }),
      Animated.timing(this.state.position, {
        toValue: { x: 0, y: -1000 },
        useNativeDriver: "true",
      }),
      Animated.timing(this.state.positionLabel, {
        toValue: { x: -900, y: 0 },
        useNativeDriver: "true",
      }),
    ]).start();
  };

  Item = () => {
    const Cards = [
      {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "MasterCard",
      },
      {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        title: "Visa Card",
      },
      {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        title: "Visa Card",
      },
      {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        title: "Visa Card",
      },
      {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        title: "Visa Card",
      },
      {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        title: "Visa Card",
      },
    ];

    if (this.state.renderMode == "General") {
      return (
        <View style={{ top: "20%" }}>
          <Text
            style={{
              color: colors.primary,
              fontSize: 35,
              textAlign: "center",
              alignItems: "center",
              fontFamily: "freestyle",
            }}
          >
            Team Atlas
          </Text>
          <Text
            style={{
              color: colors.quaternary,
              fontSize: 15,
              textAlign: "center",
              alignItems: "center",
              fontFamily: "roboto",
            }}
          >
            Suceava 2021
          </Text>
          <Text
            style={{
              color: colors.quaternary,
              fontSize: 15,
              textAlign: "center",
              alignItems: "center",
              fontFamily: "roboto",
            }}
          >
            Version 2.1
          </Text>
        </View>
      );
    }

    if (this.state.renderMode == "Settings") {
      return (
        <View style={{ top: "20%" }}>
          <Text
            style={{
              color: colors.primary,
              fontSize: 35,
              textAlign: "center",
              alignItems: "center",
              fontFamily: "freestyle",
            }}
          >
            Team Atlas
          </Text>
          <Text
            style={{
              color: colors.quaternary,
              fontSize: 15,
              textAlign: "center",
              alignItems: "center",
              fontFamily: "roboto",
            }}
          >
            Suceava 2021
          </Text>
          <Text
            style={{
              color: colors.quaternary,
              fontSize: 15,
              textAlign: "center",
              alignItems: "center",
              fontFamily: "roboto",
            }}
          >
            Settings
          </Text>
        </View>
      );
    }

    if (this.state.renderMode == "Privacy") {
      return (
        <View>
          <ScrollView
            style={{
              paddingBottom: 10,
              top: "2%",
            }}
          >
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
              onChangeText={this._getFirstName}
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
              onChangeText={this._getLastName}
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
              onChangeText={this._getEmail}
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
              onChangeText={this._getPhone}
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
              onChangeText={this._getPassword}
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
              onChangeText={this._getPasswardConfirmation}
            ></TextInput>

            <TouchableOpacity
              onPress={() => {
                this.changeCreditentials();
              }}
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
          </ScrollView>
        </View>
      );
    }
    if (this.state.renderMode == "Cards") {
      return (
        <View style={{}}>
          <FlatList
            data={Cards}
            renderItem={() => {
              return (
                <View
                  style={{
                    height: "5%",
                    paddingBottom: "50%",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("../assets/CreditCard.png")}
                    resizeMode="contain"
                    style={{
                      padding: "25%",

                      height: "30%",

                      justifyContent: "center",
                      alignItems: "flex-start",
                    }}
                  ></Image>
                </View>
              );
            }}
            keyExtractor={(item) => item.id}
            style={{ height: "100%" }}
          />
          <View></View>
        </View>
      );
    }
    return (
      <View style={{ top: "20%" }}>
        <Text
          style={{
            color: colors.primary,
            fontSize: 35,
            textAlign: "center",
            alignItems: "center",
            fontFamily: "freestyle",
          }}
        >
          Team Atlas
        </Text>
        <Text
          style={{
            color: colors.quaternary,
            fontSize: 15,
            textAlign: "center",
            alignItems: "center",
            fontFamily: "roboto",
          }}
        >
          Suceava 2021
        </Text>
        <Text
          style={{
            color: colors.quaternary,
            fontSize: 15,
            textAlign: "center",
            alignItems: "center",
            fontFamily: "roboto",
          }}
        >
          Version 2.1
        </Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.profileImg}
          source={require("../assets/ImgProfile23.png")}
          resizeMode="stretch"
        >
          <View
            style={{
              height: "70%",
              width: "80%",
              justifyContent: "center",
              elevation: 20,
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: 200,
                width: 200,
                borderRadius: 100,
                backgroundColor: "rgba(52, 52, 52, 0.7)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "robotoMed",
                  fontSize: 100,
                  color: "#d6d6d6",
                }}
              >
                C
              </Text>
            </View>
          </View>
        </ImageBackground>
        <View style={{ flex: 0.1, flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.profileLabel}
            onPress={() => {
              this.setState({ renderMode: "General" });
            }}
          >
            <Text style={styles.AccountLabel}>About</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.profileLabel2}
            onPress={() => {
              this.setState({ renderMode: "Privacy" });
            }}
          >
            <Text style={styles.AccountLabel}>Privacy</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.1, flexDirection: "row", bottom: "4%" }}>
          <TouchableOpacity
            style={styles.profileLabel}
            onPress={() => {
              this.setState({ renderMode: "Cards" });
            }}
          >
            <Text style={styles.AccountLabel}>Cards</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.profileLabel2}
            onPress={() => {
              this.setState({ renderMode: "Settings" });
            }}
          >
            <Text style={styles.AccountLabel}>Settings</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.5 }}>
          <this.Item></this.Item>
        </View>
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
    flex: 0.4,
    zIndex: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  profileData: {
    flex: 2,
  },
  profileLabel: {
    justifyContent: "center",
    borderBottomColor: colors.primary,
    backgroundColor: colors.WhiteCol,
    shadowOpacity: 1,
    elevation: 10,
    borderRadius: 20,
    width: "45%",
    height: "60%",
    alignItems: "center",
    shadowOffset: { width: 0, height: 10 },
    left: "15%",
  },
  profileLabel2: {
    justifyContent: "center",
    borderBottomColor: colors.primary,
    backgroundColor: colors.WhiteCol,
    shadowOpacity: 1,
    elevation: 10,
    borderRadius: 20,
    width: "45%",
    height: "60%",
    alignItems: "center",
    left: "40%",
    shadowOffset: { width: 0, height: 10 },
  },

  TopLabel: {
    justifyContent: "center",
    alignItems: "center",
  },
  AccountLabel: {
    fontFamily: "robotoMed",
    fontSize: 19,

    color: colors.quaternary,
  },
});
