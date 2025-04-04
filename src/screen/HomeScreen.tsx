import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-gesture-handler';


const HomeScreen = ({route}:any) => {
    const {user}= route.params;
  return (
    <View style={styles.container}>
        <Text style={styles.text}>Bienvenido,{user}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    text:{
        fontSize:22,
    }
})
export default HomeScreen
