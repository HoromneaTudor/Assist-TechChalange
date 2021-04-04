import React, { Component, PureComponent, useState } from "react";
import { StatusBar } from "expo-status-bar";
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";
import { withNavigation } from "react-navigation";

import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  Animated,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  View,
  ScrollView,
} from "react-native";
import { Dimensions } from "react-native";
import { useEffect } from "react";
import Axios from "axios";
import { render } from "react-dom";

const imageWidth = Dimensions.get("window").width / 2;
let PostitionWrong = 1;
class SignUpScreen extends Component {
  state = {
    position: new Animated.ValueXY({ x: 0, y: -30 }),
    size: new Animated.Value(0),
    opacity: new Animated.Value(0),
    opacityMoto: new Animated.Value(0),
    opacityLogin: new Animated.Value(0),
    loginPressed: false,

    InputBorderColorFirstName: colors.quaternary,
    InputBorderColorLastName: colors.quaternary,
    InputBorderColorEmail: colors.quaternary,
    InputBorderColorPhoneNumber: colors.quaternary,
    InputBorderColorPassword: colors.quaternary,
    InputBorderColorConfirPassword: colors.quaternary,

    firstNameReq: "",
    lastNameReq: "",
    emailReq: "",
    phoneReq: "",
    passwordReq: "",
    confPassReq: "",

    firstNameErrorMsg: "",
    lastNameErrorMsg: "",
    emailErrorMsg: "",
    phoneErrorMsg: "",
    passwordErrorMsg: "",
    confPassErrorMsg: "",
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.loginPressed) {
      console.log("butonul de login a fost apasat" + this.state.loginPressed);
      this.setState({ loginPressed: false });
      return true;
    }
    //console.log(this.state.email+"   "+nextState.email);
    if (this.state.email !== nextState.email) {
      //console.log(this.state.writingEmail)
      //this.setState({writingEmail:false});

      return false;
    }
    if (this.state.password !== nextState.password) {
      //this.setState({writingPass:false});
      return false;
    }
    return true;

    //     const differentEmail = this.state.email !== nextState.email;
    //     console.log(differentEmail);
    //     if(differentEmail)
    //         return false;
    //   //const differentPass = this.props.password !== nextProps.props;
    //     const differentPass=this.state.pass!==nextState.password;
    //     //console.log(differentPass);
    //     if(differentPass)
    //         return false;

    //     return true ;
  }

  _getFirstName = (text) => {
    this.setState({ firstNameReq: text });
    console.log(this.state.firstNameReq);
  };

  _getLastName = (text) => {
    this.setState({ lastNameReq: text });
    console.log(this.state.lastNameReq);
  };

  _getEmail = (text) => {
    this.setState({ emailReq: text });
    console.log(this.state.emailReq);
  };

  _getPhone = (text) => {
    this.setState({ phoneReq: text });
    console.log(this.state.phoneReq);
  };

  _getPassword = (text) => {
    this.setState({ passwordReq: text });
    console.log(this.state.passwordReq);
  };

  _getPasswardConfirmation = (text) => {
    this.setState({ confPassReq: text });
    console.log(this.state.confPassReq);
  };

  _emailValidation = (text) => {
    console.log(text);
    let reg = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
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
    if (phonenumberLenght != 10) {
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

  _passwordConfirmationValidation = () => {
    if (this.state.confPassReq != "") {
      this.setState({ confPassErrorMsg: "" });
      return true;
    }
    this.setState({ confPassErrorMsg: "You need to complete this field" });
    this.setState({ InputBorderColorConfirPassword: colors.wrongInput });
    return false;
  };

  _passwordEquallytyConfirnation = () => {
    let PassConf = this._passwordConfirmationValidation();
    if (
      this._passwordValidation() &&
      PassConf &&
      this.state.confPassReq === this.state.passwordReq
    ) {
      this.setState({ confPassErrorMsg: "" });
      return true;
    } else if (PassConf == true) {
      this.setState({ confPassErrorMsg: "The passwords don't match" });
      this.setState({ InputBorderColorConfirPassword: colors.wrongInput });
      return false;
    }
    return false;
  };

  _firstNameValidation = () => {
    if (this.state.firstNameReq != "") {
      this.setState({ firstNameErrorMsg: "" });
      return true;
    }
    this.setState({ firstNameErrorMsg: "You need to complete this field" });
    this.setState({ InputBorderColorFirstName: colors.wrongInput });
    return false;
  };

  _lastNameValidation = () => {
    if (this.state.lastNameReq != "") {
      this.setState({ lastNameErrorMsg: "" });
      return true;
    }
    this.setState({ lastNameErrorMsg: "You need to complete this field" });
    this.setState({ InputBorderColorLastName: colors.wrongInput });
    return false;
  };

  _failedAttemptsPenality = () => {};

  register = () => {
    let var1 = this._firstNameValidation();
    let var2 = this._lastNameValidation();
    let var3 = this._emailValidation(this.state.emailReq);
    let var4 = this._phoneValidation();
    let var5 = this._passwordEquallytyConfirnation();

    if (var1 && var2 && var3 && var4 && var5) {
      Axios.post(
        "https://api-ehotelplus.herokuapp.com/register", //ipV4-ul vostru
        {
          first_name: this.state.firstNameReq,
          second_name: this.state.lastNameReq,
          email: this.state.emailReq,
          phone: this.state.phoneReq,
          //username: username_req,
          password: this.state.passwordReq,
        }
      ).then((response) => {
        //console.log(response);
        if (response.data.message) {
          this.setState({ registerStatus: response.data.message });
          console.log(response.data.message);
        } else {
          this.setState({
            registerStatus:
              "Registration was successful please log in from login menu",
          });
          console.log(response);
        }
      });
    } else {
      this.setState({ registerStatus: "Wrong creditentials" });
    }
  };

  onFocusFirstName() {
    this.setState({
      InputBorderColorFirstName: colors.tertiary,
    });
  }

  onFocusLastName() {
    this.setState({
      InputBorderColorLastName: colors.tertiary,
    });
  }

  onFocusEmail() {
    this.setState({
      InputBorderColorEmail: colors.tertiary,
    });
  }

  onFocusNumber() {
    this.setState({
      InputBorderColorPhoneNumber: colors.tertiary,
    });
  }

  onFocusPassword() {
    this.setState({
      InputBorderColorPassword: colors.tertiary,
    });
  }

  onFocusConfirmPassword() {
    this.setState({
      InputBorderColorConfirPassword: colors.tertiary,
    });
  }

  onBlurFirstName() {
    this.setState({
      InputBorderColorFirstName: colors.quaternary,
    });
  }

  onBlurLastName() {
    this.setState({
      InputBorderColorLastName: colors.quaternary,
    });
  }

  onBlurEmail() {
    this.setState({
      InputBorderColorEmail: colors.quaternary,
    });
  }

  onBlurNumber() {
    this.setState({
      InputBorderColorPhoneNumber: colors.quaternary,
    });
  }

  onBlurPassword() {
    this.setState({
      InputBorderColorPassword: colors.quaternary,
    });
  }

  onBlurConfirmPassword() {
    this.setState({
      InputBorderColorConfirPassword: colors.quaternary,
    });
  }

  SplashAnimation = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(this.state.opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(this.state.position, {
          toValue: { x: 0, y: imageWidth / 9 },
          useNativeDriver: true,
        }),

        Animated.timing(this.state.size, {
          toValue: 0.8,
          duration: 500,
          useNativeDriver: true,
        }),

        Animated.timing(this.state.opacityMoto, {
          toValue: 0,
          duration: 10,
          useNativeDriver: true,
        }),

        Animated.timing(this.state.opacityLogin, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  render() {
    const { navigation } = this.props;
    this.SplashAnimation();
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Animated.View
            style={{
              alignItems: "center",
              justifyContent: "center",
              transform: [
                { translateX: this.state.position.x },
                { translateY: this.state.position.y },
                { scale: this.state.size },
              ],
            }}
          >
            <Image
              resizemode="contain"
              source={require("../assets/SplashScrnLogo.png")}
              style={styles.logo}
            />

            <Animated.View
              style={{
                opacity: this.state.opacity,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.appTeam}> Atlas </Text>
            </Animated.View>
          </Animated.View>
        </View>

        <View style={{ height: "33%", width: "100%" }}>
          <ScrollView
            style={{
              bottom: "10%",
              left: "1%",
              width: "100%",
            }}
          >
            <Animated.View
              style={{
                opacity: this.state.opacityLogin,
                height: 45,
                width: "80%",
                borderWidth: 2,
                borderRadius: 10,
                borderColor: this.state.InputBorderColorFirstName,
                justifyContent: "center",
                left: "9%",
                paddingLeft: "5%",
                fontFamily: "roboto",
                top: "1%",
              }}
            >
              <TextInput
                placeholder="First name"
                color={colors.primary}
                onFocus={() => this.onFocusFirstName()}
                onBlur={() => this.onBlurFirstName()}
                onChangeText={this._getFirstName}
              />
            </Animated.View>
            <Text style={[styles.wrongDataInput, { top: "1%" }]}>
              {this.state.firstNameErrorMsg}
            </Text>
            <Animated.View
              style={{
                opacity: this.state.opacityLogin,
                height: 45,
                width: "80%",
                borderWidth: 2,
                borderRadius: 10,
                borderColor: this.state.InputBorderColorLastName,
                justifyContent: "center",
                left: "9%",
                paddingLeft: "5%",
                fontFamily: "roboto",
                top: "3%",
              }}
            >
              <TextInput
                placeholder="Last name"
                color={colors.primary}
                onFocus={() => this.onFocusLastName()}
                onBlur={() => this.onBlurLastName()}
                onChangeText={this._getLastName}
              />
            </Animated.View>
            <Text style={[styles.wrongDataInput, { top: "3%" }]}>
              {this.state.lastNameErrorMsg}
            </Text>
            <Animated.View
              style={{
                opacity: this.state.opacityLogin,
                height: 45,
                width: "80%",
                borderWidth: 2,
                borderRadius: 10,
                borderColor: this.state.InputBorderColorEmail,
                justifyContent: "center",
                left: "9%",
                paddingLeft: "5%",
                fontFamily: "roboto",
                top: "5%",
              }}
            >
              <TextInput
                placeholder="Email"
                color={colors.primary}
                keyboardType="email-address"
                autoCapitalize="none"
                onFocus={() => this.onFocusEmail()}
                onBlur={() => this.onBlurEmail()}
                onChangeText={this._getEmail}
              />
            </Animated.View>
            <Text style={[styles.wrongDataInput, { top: "5%" }]}>
              {this.state.emailErrorMsg}
            </Text>
            <Animated.View
              style={{
                opacity: this.state.opacityLogin,
                height: 45,
                width: "80%",
                borderWidth: 2,
                borderRadius: 10,
                borderColor: this.state.InputBorderColorPhoneNumber,
                justifyContent: "center",
                left: "9%",
                paddingLeft: "5%",
                fontFamily: "roboto",
                top: "7%",
              }}
            >
              <TextInput
                placeholder="Phone number"
                color={colors.primary}
                keyboardType="numeric"
                onFocus={() => this.onFocusNumber()}
                onBlur={() => this.onBlurNumber()}
                onChangeText={this._getPhone}
              />
            </Animated.View>
            <Text style={[styles.wrongDataInput, { top: "7%" }]}>
              {this.state.phoneErrorMsg}
            </Text>
            <Animated.View
              style={{
                opacity: this.state.opacityLogin,
                height: 45,
                width: "80%",
                borderWidth: 2,
                borderRadius: 10,
                borderColor: this.state.InputBorderColorPassword,
                justifyContent: "center",
                left: "9%",
                paddingLeft: "5%",
                fontFamily: "roboto",
                top: "9%",
              }}
            >
              <TextInput
                placeholder="Password"
                color={colors.primary}
                autoCapitalize="none"
                secureTextEntry={true}
                onFocus={() => this.onFocusPassword()}
                onBlur={() => this.onBlurPassword()}
                onChangeText={this._getPassword}
              />
            </Animated.View>
            <Text style={[styles.wrongDataInput, { top: "9%" }]}>
              {this.state.passwordErrorMsg}
            </Text>
            <Animated.View
              style={{
                opacity: this.state.opacityLogin,
                height: 45,
                width: "80%",
                borderWidth: 2,
                borderRadius: 10,
                borderColor: this.state.InputBorderColorConfirPassword,
                justifyContent: "center",
                left: "9%",
                paddingLeft: "5%",
                fontFamily: "roboto",
                top: "11%",
              }}
            >
              <TextInput
                placeholder="Confirm password"
                color={colors.primary}
                secureTextEntry={true}
                autoCapitalize="none"
                onFocus={() => this.onFocusConfirmPassword()}
                onBlur={() => this.onBlurConfirmPassword()}
                onChangeText={this._getPasswardConfirmation}
              />
            </Animated.View>
            <Text style={[styles.wrongDataInput, { top: "11%" }]}>
              {this.state.confPassErrorMsg}
            </Text>
            <Animated.View
              style={{
                opacity: this.state.opacityLogin,
                width: "80%",
                top: "19%",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.register();
                }}
              >
                <View style={styles.loginBtn}>
                  <Text style={styles.loginBtnText}>Sign up</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>

            <View style={{ height: 100, width: "10%" }} />
          </ScrollView>
        </View>

        <Animated.View
          style={{
            opacity: this.state.opacityLogin,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.SignUpBtnText}>
            <Text>I already have an account. </Text>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Text style={{ color: colors.secondary }}>Login</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        <StatusBar style="auto"></StatusBar>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  logo: {
    height: imageWidth * 1.6,
    width: imageWidth * 1.7,
  },
  appTeam: {
    color: colors.primary,
    fontSize: 130,
    left: 3,
    fontFamily: "freestyle",
  },
  appMoto: {
    color: colors.quaternary,
    fontSize: 15,
    right: 4,
    bottom: 30,
    fontFamily: "roboto",
  },
  loginBtnText: {
    color: "white",
    fontSize: 17,
    fontFamily: "roboto",
  },
  SignUpBtnText: {
    color: "black",
    fontSize: 14,
    fontFamily: "roboto",
    flexDirection: "row",
    justifyContent: "center",
  },
  loginBtn: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    left: "11%",
    height: imageWidth / 5,
  },
  forgetPassContainer: {
    textAlign: "left",
    alignSelf: "flex-end",
    marginRight: "11%",
    bottom: "5%",
  },
  forgetPass: {
    fontFamily: "roboto",
    fontSize: 12,
    color: colors.quaternary,
  },
  wrongDataInput: {
    color: colors.wrongInput,
    left: "11%",
    fontFamily: "roboto",
    fontSize: 12,
  },
});

export default withNavigation(SignUpScreen);
