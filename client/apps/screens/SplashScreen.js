import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import colors from "../config/colors";
import { withNavigation } from "react-navigation";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  Animated,
  TouchableOpacity,
  TextInput,
  View,
} from "react-native";
import { Dimensions } from "react-native";
import Axios from "axios";
import DialogInput from "react-native-dialog-input";

const imageWidth = Dimensions.get("window").width / 2;
let forgpas = false;

class SplashScreen extends Component {
  state = {
    position: new Animated.ValueXY({ x: 0, y: -30 }),
    size: new Animated.Value(0),
    opacity: new Animated.Value(0),
    opacityMoto: new Animated.Value(0),
    opacityLogin: new Animated.Value(0),
    loginPressed: false,
    loginBtnDisable: false,
    email: "",
    password: "",
    loginStatus: "",
    InputBorderColorEmail: colors.quaternary,
    InputBorderColorPassword: colors.quaternary,
    timePassed: false,
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.state.loginPressed) {
  //     this.setState({ loginPressed: false });
  //     return true;
  //   }
  //   if (this.state.email !== nextState.email) {
  //     return false;
  //   }
  //   if (this.state.password !== nextState.password) {
  //     return false;
  //   }
  //   return true;
  // }

  _getPass = (text) => {
    this.setState({ password: text });
    //console.log(this.state.password);
  };

  _getEmail = (text) => {
    this.setState({ email: text });
    //console.log(this.state.email);
  };

  _emailValidation = (text) => {
    //console.log(text);
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reg.test(text) === false) {
      //console.log("Email is Not Correct");
      //this.setState({ email: text })
      this.setState({ loginStatus: "The email is not valid" });
      this.setState({ InputBorderColorEmail: colors.wrongInput });
      return false;
    } else {
      //this.setState({ email: text })
      //console.log("Email is Correct");
      return true;
    }
  };

  _passwordValidation = (text) => {
    if (text != "") return true;
    this.setState({ loginStatus: "The password field can't be empty" });
    this.setState({ InputBorderColorPassword: colors.wrongInput });
    return false;
  };

  _failedAttemptsPenality = () => {};

  login = (email1, password1) => {
    //this.setState({ loginBtnDisable: true });
    //console.log(this.state.loginBtnDisable);

    this.setState({ loginStatus: "" });
    if (
      this._emailValidation(this.state.email) &&
      this._passwordValidation(this.state.password)
    ) {
      Axios.post("https://api-ehotelplus.herokuapp.com/login", {
        email: email1,
        password: password1,
      }).then((response) => {
        //console.log(response);
        if (response.data.message) {
          //setLoginStatus(response.data.message);
          this.setState({ loginStatus: response.data.message });
          this.setState({ InputBorderColorEmail: colors.wrongInput });
          this.setState({ InputBorderColorPassword: colors.wrongInput });
          // this.setState({failedAttemptsLogin:failedAttemptsLogin+1})
          //console.log(response.data.message);
        } else {
          global.clientId = response.data[0].id;
          console.log(global.clientId);
          if (response.data[0].role == "administrator") {
            this.props.navigation.replace("MainMenuAdmin");
          } else {
            this.props.navigation.replace("MainMenu");
          }
        }
      });
    }
    //this.setState({ loginBtnDisable: false });
    //console.log(this.state.loginBtnDisable);
  };

  onFocusEmail() {
    this.setState({
      InputBorderColorEmail: colors.tertiary,
    });
  }

  onFocusPassword() {
    this.setState({
      InputBorderColorPassword: colors.tertiary,
    });
  }

  onBlurEmail() {
    this.setState({
      InputBorderColorEmail: colors.quaternary,
    });
  }

  onBlurPassword() {
    this.setState({
      InputBorderColorPassword: colors.quaternary,
    });
  }

  SplashAnimation = () => {
    Animated.parallel([
      Animated.spring(this.state.position, {
        toValue: { x: 0, y: imageWidth / 1.3 },
        speed: 2.5,
        bounciness: 17,
        useNativeDriver: true,
      }),

      Animated.timing(this.state.size, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),

      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),

      Animated.timing(this.state.opacityLogin, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  };

  SplashAnimation1 = () => {
    Animated.parallel([
      Animated.timing(this.state.position, {
        toValue: { x: 0, y: -imageWidth / 9 },
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
    ]).start();
  };

  componentDidMount() {
    setTimeout(() => this.setState({ timePassed: true }), 1900);
  }

  componentDidUpdate() {
    if (!this.state.timePassed) {
    } else {
      this.SplashAnimation1();
    }
  }

  render() {
    this.SplashAnimation();
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <DialogInput
            isDialogVisible={forgpas}
            title={"Password Recovery"}
            message={"Recover your password"}
            hintInput={"E-mail address"}
            submitInput={(inputText) => {}}
            closeDialog={() => {
              forgpas = false;
              this.forceUpdate();
            }}
          ></DialogInput>
        </View>
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

            <Animated.View
              style={{
                opacity: this.state.opacityMoto,
              }}
            >
              <Text style={styles.appMoto}>
                The perfect partner for your trip
              </Text>
            </Animated.View>
          </Animated.View>
        </Animated.View>

        <Animated.View
          style={{
            opacity: this.state.opacityLogin,
            height: 45,
            width: "80%",
            borderWidth: 2,
            borderRadius: 10,
            borderColor: this.state.InputBorderColorEmail,
            justifyContent: "center",
            paddingLeft: "5%",
            fontFamily: "roboto",
            bottom: "8%",
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

        <Animated.View
          style={{
            opacity: this.state.opacityLogin,
            height: 45,
            width: "80%",
            borderWidth: 2,
            borderRadius: 10,
            borderColor: this.state.InputBorderColorPassword,
            justifyContent: "center",
            paddingLeft: "5%",
            fontFamily: "roboto",
            bottom: "6%",
          }}
        >
          <TextInput
            placeholder="Password"
            color={colors.primary}
            secureTextEntry={true}
            autoCapitalize="none"
            onFocus={() => this.onFocusPassword()}
            onBlur={() => this.onBlurPassword()}
            onChangeText={this._getPass}
          />
        </Animated.View>

        <Animated.View
          style={{
            opacity: this.state.opacityLogin,
            textAlign: "left",
            alignSelf: "flex-end",
            marginRight: "11%",
            bottom: "5%",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              forgpas = true;

              this.forceUpdate();
            }}
          >
            <Text style={styles.forgetPass}>Forgot password?</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={{
            opacity: this.state.opacityLogin,
            width: "80%",
          }}
        >
          <TouchableOpacity
            style={{ top: 10 }}
            onPress={() => {
              this.setState({ loginBtnDisable: true });
              //console.log(this.state.loginBtnDisable);
              this.login(this.state.email, this.state.password);
              this.setState({ loginPressed: true });
              setTimeout(() => this.setState({ loginBtnDisable: false }), 800);
              //console.log(this.state.loginBtnDisable);
            }}
            disabled={this.state.loginBtnDisable}
          >
            <View style={styles.loginBtn}>
              <Text style={styles.loginBtnText}>Login</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
        <Text
          style={{
            alignItems: "center",
            justifyContent: "center",
            color: "red",
            top: 40,
          }}
        >
          {this.state.loginStatus}
        </Text>
        <Animated.View
          style={{
            opacity: this.state.opacityLogin,
          }}
        >
          <View style={styles.SignUpBtnText}>
            <Text>I'm a new user. </Text>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Signup");
              }}
            >
              <Text style={{ color: colors.secondary }}>Sign Up</Text>
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
    marginTop: "20%",
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

export default withNavigation(SplashScreen);
