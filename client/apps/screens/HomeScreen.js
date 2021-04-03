import React, { useState } from "react";
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
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { Dimensions } from "react-native";
import { useEffect } from "react";
import Axios from "axios";

const imageWidth = Dimensions.get("window").width / 2;
const inputRef = useRef();
const [input, setInput] = useState("");
const pressed = () => {
  inputRef.current.clear();
};
function HomeScreen(props) {
  return (
    <View style={{ flex: 1 }}>
      <Text>Value is:{input}</Text>
      <TextInput
        ref={inputRef}
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => setInput(text)}
        value={input}
      />
      <Pressable onPress={pressed}>
        <Text>Clear it!</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});

export default HomeScreen;
