import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import colors from '../config/colors';
import { Image, SafeAreaView, StyleSheet, Text,Animated, Button,TouchableHighlight,TouchableOpacity,TextInput,View} from 'react-native';
import {Dimensions} from 'react-native';
import { useEffect } from 'react';

const imageWidth = Dimensions.get('window').width/2;

function SplashScreen(props) {

    const position = new Animated.ValueXY({x:0,y:-30})
    const size = new Animated.Value(0)
    const opacity = new Animated.Value(0)
    const opacityMoto = new Animated.Value(0)
    const opacityLogin = new Animated.Value(0)

    Animated.sequence([
        Animated.parallel([
            Animated.spring(position,{
                toValue:{x:0,y:imageWidth/1.5},
                speed:2.5,
                bounciness:17,
                useNativeDriver:true,
               
            }),
                        
            Animated.timing(size,{
                
                toValue:1,
                duration:500,
                useNativeDriver:true,
             

            }),
         
             Animated.timing(opacity,{
                 toValue:1,
                 duration:1000, 
                 useNativeDriver:true,
              
             }),

             Animated.timing(opacityLogin,{
                toValue:0,
                duration:1000, 
                useNativeDriver:true,
             
            }),

        ]),
        Animated.parallel([
            Animated.timing(position,{
                toValue:{x:0,y:-imageWidth/5},                     
                useNativeDriver:true,
               
            }),
                        
            Animated.timing(size,{             
                toValue:0.7, 
                duration:500,
                useNativeDriver:true,         
            }),

            Animated.timing(opacityMoto,{
                toValue:0,
                duration:10,    
                useNativeDriver:true,
            }),

            Animated.timing(opacityLogin,{
                toValue:1,
                duration:1000, 
                useNativeDriver:true,
            }),
        ]),
        ]).start()

    
        const [text, onChangeText] = React.useState("Useless Text");
        return (          
            <SafeAreaView style={styles.container}>   
                <Animated.View style={{
                    alignItems:'center',
                    justifyContent:'center',
                    transform:[
                        { translateX: position.x},
                        { translateY: position.y },
                        { scale: size},  
                    ]
                }}> 
                
                <Image resizemode="contain" source={require("../assets/SplashScrnLogo.png")} style={styles.logo}/>
                
                <Animated.View style={{
                    opacity,
                    alignItems:'center',
                    justifyContent:'center',
                 }}>        

                <Text style={styles.appTeam}> Atlas </Text>

                <Animated.View style={{
                    opacity:opacityMoto,
                }}>

                <Text style={styles.appMoto}>The perfect partner for your trip</Text>

                </Animated.View>

                </Animated.View>     

                </Animated.View>
                
                <Animated.View style={{
                    opacity:opacityLogin,   
                    height: 45,
                    width:'80%',    
                    borderWidth: 2, 
                    borderRadius:10, 
                    borderColor:colors.inputBorders,
                    justifyContent:'center', 
                    paddingLeft:'5%',      
                    fontFamily:'roboto',    
                    bottom:'10%',
                }}>
             
                <TextInput placeholder="Username" color={colors.primary}/>
           
                </Animated.View>

                <Animated.View style={{
                    opacity:opacityLogin,   
                    height: 45,
                    width:'80%',    
                    borderWidth: 2, 
                    borderRadius:10, 
                    borderColor:colors.inputBorders,
                    justifyContent:'center', 
                    paddingLeft:'5%',      
                    fontFamily:'roboto',
                    bottom:'8%',   
                }}>
                <TextInput placeholder="Password" color={colors.primary}/>                         
                </Animated.View>
               

                <Animated.View style={{
                    opacity:opacityLogin,
                    width:'80%',            
                }}>

                <TouchableOpacity >
                    <View style={styles.loginBtn}>
                    <Text style={styles.loginBtnText} >Login</Text>
                    </View>
                </TouchableOpacity>    
                 </Animated.View>

                 <Animated.View style={{
                    opacity:opacityLogin,                     
                }}>
                    <Text style={styles.SignUpBtnText} >I'm a new user. Sign Up</Text>
                 </Animated.View>

                <StatusBar style="auto"></StatusBar>
            </SafeAreaView>
        );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
    logo:{
        height: imageWidth*1.6,
        width: imageWidth*1.7,
    },
    appTeam:{     
        color:colors.primary,
        fontSize:130,
        left:3,
        fontFamily:'freestyle',          
    },
    appMoto:{
        color:colors.quaternary,
        fontSize:15,
        right:4,
        bottom:30,
        fontFamily:'roboto',
    },
    loginBtnText:{
        color:'white',
        fontSize:17,
        fontFamily:'roboto',
    },
    SignUpBtnText:{
        marginTop:'20%',
        color:'black',
        fontSize:12,
        fontFamily:'roboto',
    },
    input:{
        
    },
    loginBtn:{
        backgroundColor:colors.secondary,
        borderRadius:10,   
        alignItems:'center',
        justifyContent:'center',
        height:imageWidth/5,
    },
   
})

export default SplashScreen;
