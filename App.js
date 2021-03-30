import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { Image, StyleSheet, Text, View, SafeAreaView, Button, Alert,TextInput} from 'react-native';
import Axios from 'axios'

export default function App() {
  const [first_name_req,onChangeFirstNameReq] = useState("");
  const [second_name_req,onChangeSecondNameReq] = useState("");
  const [email_req, onChangeEmailReq] = useState("");
  const [phone_req,onChangePhoneReq] = useState("");
  const [password_req, onChangePassReq] = useState("");
  const [username_req,onChangeUsernameReq] = useState("");

  const [email,onChangeEmail] = useState("");
  const [password,onChangePass] = useState("");

  const [loginStatus,setLoginStatus] = useState("");

  const register =()=>{
    Axios.post('http://192.168.1.6:3001/register',  //ipV4-ul vostru
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
    Axios.post('http://192.168.1.6:3001/login',
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

      <Text>First name:</Text>
      <TextInput
        style={styles.input}
        placeholder='e.g John'
        onChangeText={onChangeFirstNameReq}
        value={first_name_req}
      />
       <Text></Text>
      <Text>Second name:</Text>
      <TextInput
        style={styles.input}
        placeholder='e.g Smith'
        onChangeText={onChangeSecondNameReq}
        value={second_name_req}
      />
      <Text></Text>
       <Text>Email:</Text>
      <TextInput
        style={styles.input}
        keyboardType='email-address'
        placeholder='e.g. johnsmith@email.com'
        onChangeText={onChangeEmailReq}
        value={email_req}
      />
      <Text></Text>
       <Text>Phone:</Text>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        placeholder='07xxxxxxxx'
        onChangeText={onChangePhoneReq}
        value={phone_req}
      />
      <Text></Text>
       <Text>Username:</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeUsernameReq}
        value={username_req}
      />
       <Text></Text>
       <Text>Password:</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangePassReq}
        value={password_req}
      />
       <Text></Text>
      
      <Button title='Register' style={styles.buttonlgn} onPress={register}></Button>

      <Text></Text>
      <Text>Username:</Text>

    <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
      />
       <Text></Text>
       <Text>Password:</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangePass}
        value={password}
      />
       <Text></Text>
      <Button title='Login' style={styles.buttonlgn} onPress={login}></Button>

      <Text h1 style={styles.header}>{loginStatus}</Text>
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
