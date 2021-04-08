import React from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import colors from "../config/colors";

class MyAccountScreen extends React.Component {
  fieldRef = React.createRef();

  onSubmit = () => {
    let { current: field } = this.fieldRef;

    //console.log(field.value());
  };

  formatText = (text) => {
    return text.replace(/[^+\d]/g, "");
  };

  render() {
    return (
      <View>
        <TextInput
          placeholder="First name"
          keyboardType="default"
          placeholderTextColor={colors.inputBorders}
          style={{
            top: 100,
            alignSelf: "center",
            height: "10%",
            width: "80%",
            borderWidth: 12,
            borderRadius: 10,
            borderColor: colors.inputBorders,
            borderWidth: 2,
            backgroundColor: colors.WhiteCol,
            textAlign: "center",
            color: "red",
          }}
        ></TextInput>

        <TextInput
          placeholder="Second name"
          keyboardType="default"
          placeholderTextColor={colors.inputBorders}
          style={{
            top: 120,
            alignSelf: "center",
            height: "10%",
            width: "80%",
            borderWidth: 12,
            borderRadius: 10,
            borderColor: colors.inputBorders,
            borderWidth: 2,
            backgroundColor: colors.WhiteCol,
            textAlign: "center",
            color: "red",
          }}
        ></TextInput>

        <TextInput
          placeholder="Email address"
          keyboardType="email-address"
          placeholderTextColor={colors.inputBorders}
          style={{
            top: 140,
            alignSelf: "center",
            height: "10%",
            width: "80%",
            borderWidth: 12,
            borderRadius: 10,
            borderColor: colors.inputBorders,
            borderWidth: 2,
            backgroundColor: colors.WhiteCol,
            textAlign: "center",
            color: "red",
          }}
        ></TextInput>

        <TextInput
          placeholder="Phone number"
          keyboardType="numeric"
          placeholderTextColor={colors.inputBorders}
          style={{
            top: 160,
            alignSelf: "center",
            height: "10%",
            width: "80%",
            borderWidth: 12,
            borderRadius: 10,
            borderColor: colors.inputBorders,
            borderWidth: 2,
            backgroundColor: colors.WhiteCol,
            textAlign: "center",
            color: "red",
          }}
        ></TextInput>

        <TextInput
          placeholder="Password"
          keyboardType="default"
          placeholderTextColor={colors.inputBorders}
          style={{
            top: 180,
            alignSelf: "center",
            height: "10%",
            width: "80%",
            borderWidth: 12,
            borderRadius: 10,
            borderColor: colors.inputBorders,
            borderWidth: 2,
            backgroundColor: colors.WhiteCol,
            textAlign: "center",
            color: "red",
          }}
        ></TextInput>

        <TextInput
          placeholder="Confirm password"
          keyboardType="default"
          placeholderTextColor={colors.inputBorders}
          style={{
            top: 200,
            alignSelf: "center",
            height: "10%",
            width: "80%",
            borderWidth: 12,
            borderRadius: 10,
            borderColor: colors.inputBorders,
            borderWidth: 2,
            backgroundColor: colors.WhiteCol,
            textAlign: "center",
            color: "red",
          }}
        ></TextInput>

        <Button
          title="Confirm"
          onPress={() => Alert.alert(" Button pressed")}
        />
      </View>
    );
  }
}

export default MyAccountScreen;
