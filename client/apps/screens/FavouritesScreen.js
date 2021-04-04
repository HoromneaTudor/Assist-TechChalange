import React from 'react';
import {View,Text,Button, StyleSheet} from 'react-native';

const FavouritesScreen = ()=>{
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

export default FavouritesScreen;

const styles= StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    }
})