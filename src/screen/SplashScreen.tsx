import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';


const SplashScreen = ({ navigation }: any) => {
    useEffect(() => {
        const verificarSesion = async () => {
            const user = await AsyncStorage.getItem('usuarioActivo');
            setTimeout(() => {
                if (user) {
                    navigation.replace('Home', { user });
                } else {
                    navigation.replace('Login');
                }

            },2000);//2 segundos
       
        }
        verificarSesion();
    })
  return (
      <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.text}>Cargando...</Text>
     </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
   
    },
    text:{
        fontSize:30,
        fontWeight:'bold'
    }
})



export default SplashScreen
