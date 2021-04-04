import React from 'react';
import {View,Text,Button, StyleSheet} from 'react-native';

const HomeScreen = ()=>{
    return(
<View style={styles.container}>
    <Text>FavouritesScreen</Text>
    <Button 
    title="Click here"
    onPress={()=>alert('Button Clicked!')}
    />
</View>
    );
}

export default HomeScreen;

const styles= StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    }
})