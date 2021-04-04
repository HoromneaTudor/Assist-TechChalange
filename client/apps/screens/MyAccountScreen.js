import React from 'react';
import {View,Text,Button, StyleSheet} from 'react-native';

const MyAccountScreen = ()=>{
    return(
<View style={styles.container}>
    <Text>MyAccountScreen</Text>
    <Button 
    title="Click here"
    onPress={()=>alert('Button Clicked!')}
    />
</View>
    );
}

export default MyAccountScreen;

const styles= StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    }
})