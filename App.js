import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, View, SafeAreaView, Button, Alert,TextInput} from 'react-native';

export default function App() {
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePass] = React.useState("");
 
  return (
    <SafeAreaView style={styles.container}>
    <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePass}
        value={password}
      />
      
      <Button title='Login' style={styles.buttonlgn}></Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  
  },
  input:{
    borderWidth:1,
    borderColor:'black',
    padding:8,
    width:200,
  },
  buttonlgn:{
    width:500,
    bottom:40,

  },
  
});
