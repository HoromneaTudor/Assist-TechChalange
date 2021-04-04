import React from 'react';
import {View,Text,Button, StyleSheet} from 'react-native';

const RoomsScreen = ()=>{
    return(
<View style={styles.container}>
    <Text>RoomsScreen</Text>
    <Button 
    title="Click here"
    onPress={()=>alert('Button Clicked!')}
    />
</View>
    );
}

export default RoomsScreen;

const styles= StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    }
})