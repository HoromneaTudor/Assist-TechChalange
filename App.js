import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, View, SafeAreaView, Button, Alert,TextInput} from 'react-native';
import Axios from 'axios'

export default function App() {
  const [first_name_req,onChangeFirstNameReq] = React.useState("");
  const [second_name_req,onChangeSecondNameReq] = React.useState("");
  const [email_req, onChangeEmailReq] = React.useState("");
  const [phone_req,onChangePhoneReq] = React.useState("");
  const [password_req, onChangePassReq] = React.useState("");
  const [username_req,onChangeUsernameReq] = React.useState("");

  const [email,onChangeEmail] = React.useState("");
  const [password,onChangePass] = React.useState("");

  const [loginStatus,setLoginStatus] = React.useState("");

  const register =()=>{
    Axios.post('http://localhost:3001/register',
    {
        first_name: first_name_req,
        second_name: second_name_req,
        email: email_req,
        phone: phone_req,
        username: username_req,
        password: password_req
    }).then((response)=>{
      console.log(response);
    });
  };

  const login=()=>{
    Axios.post('http://localhost:3001/login',
    {
        email: email,
        password: password

    }).then((response)=>{
      console.log(response);
      if(response.data.message)
      {

        setLoginStatus(response.data.message);
        //console.log(response.data.message);
        

        
      }
      else{
        setLoginStatus(response.data[0].username);
        //console.log(response.data[0].username);

        //console.log(typeof(response));
        //console.log(response[0].lenght);
      }
    });
  };
 
  return (
    <SafeAreaView style={styles.container}>


      <TextInput
        style={styles.input}
        onChangeText={onChangeFirstNameReq}
        value={first_name_req}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeSecondNameReq}
        value={second_name_req}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmailReq}
        value={email_req}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePhoneReq}
        value={phone_req}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeUsernameReq}
        value={username_req}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassReq}
        value={password_req}
      />
      
      <Button title='Register' style={styles.buttonlgn} onPress={register}></Button>



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
      
      <Button title='Login' style={styles.buttonlgn} onPress={login}></Button>

      <h1>{loginStatus}</h1>
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
