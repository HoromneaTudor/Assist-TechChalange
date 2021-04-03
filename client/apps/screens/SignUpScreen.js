import React, { Component, PureComponent, useState } from "react";
import { StatusBar } from "expo-status-bar";
import colors from "../config/colors";
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

class SignUpScreen extends Component {
  state = {
    position: new Animated.ValueXY({ x: 0, y: -30 }),
    size: new Animated.Value(0),
    opacity: new Animated.Value(0),
    opacityMoto: new Animated.Value(0),
    opacityLogin: new Animated.Value(0),
    loginPressed: false,
    email: "",
    password: "",
    loginStatus: "",
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

  _getPass = (text) => {
    this.setState({ password: text });
    console.log(this.state.password);
  };

  _getEmail = (text) => {
    this.setState({ email: text });
    console.log(this.state.email);
  };

  _emailValidation = (text) => {
    console.log(text);
    let reg = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
      //this.setState({ email: text })
      return false;
    } else {
      //this.setState({ email: text })
      console.log("Email is Correct");
      return true;
    }
  };

  _failedAttemptsPenality = () => {};

  register = () => {
    Axios.post(
      "https://mysql-ehotelplus.herokuapp.com/register", //ipV4-ul vostru
      {
        first_name: first_name_req,
        second_name: second_name_req,
        email: email_req,
        phone: phone_req,
        username: username_req,
        password: password_req,
      }
    ).then((response) => {
      console.log(response);
    });
  };

  login = (email1, password1) => {
    Axios.post("https://mysql-ehotelplus.herokuapp.com/login", {
      email: email1,
      password: password1,
    }).then((response) => {
      console.log(response);
      if (response.data.message) {
        //setLoginStatus(response.data.message);
        this.setState({ loginStatus: response.data.message });
        // this.setState({failedAttemptsLogin:failedAttemptsLogin+1})
        //console.log(response.data.message);
      }
      //else{
      //setLoginStatus(response.data[0].username);
      //this.setState({loginStatus:response.data[0].username});
      // }
    });
  };

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
                borderColor: colors.quaternary,
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
                onChangeText={this._getEmail}
              />
            </Animated.View>

            <Animated.View
              style={{
                opacity: this.state.opacityLogin,
                height: 45,
                width: "80%",
                borderWidth: 2,
                borderRadius: 10,
                borderColor: colors.quaternary,
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
                onChangeText={this._getPass}
              />
            </Animated.View>

            <Animated.View
              style={{
                opacity: this.state.opacityLogin,
                height: 45,
                width: "80%",
                borderWidth: 2,
                borderRadius: 10,
                borderColor: colors.quaternary,
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
                onChangeText={this._getPass}
              />
            </Animated.View>

            <Animated.View
              style={{
                opacity: this.state.opacityLogin,
                height: 45,
                width: "80%",
                borderWidth: 2,
                borderRadius: 10,
                borderColor: colors.quaternary,
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
                onChangeText={this._getPass}
              />
            </Animated.View>

            <Animated.View
              style={{
                opacity: this.state.opacityLogin,
                height: 45,
                width: "80%",
                borderWidth: 2,
                borderRadius: 10,
                borderColor: colors.quaternary,
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
                onChangeText={this._getPass}
              />
            </Animated.View>

            <Animated.View
              style={{
                opacity: this.state.opacityLogin,
                height: 45,
                width: "80%",
                borderWidth: 2,
                borderRadius: 10,
                borderColor: colors.quaternary,
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
                onChangeText={this._getPass}
              />
            </Animated.View>

            <Animated.View
              style={{
                opacity: this.state.opacityLogin,
                width: "80%",
              }}
            >
              <TouchableOpacity
                style={{ top: "200%" }}
                onPress={() => {
                  this.login(this.state.email, this.state.password);
                  this.setState({ loginPressed: true });
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
          }}
        >
          <View style={styles.SignUpBtnText}>
            <Text>I already have an account. </Text>
            <TouchableOpacity>
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
    bottom: "0%",
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
});

export default SignUpScreen;
