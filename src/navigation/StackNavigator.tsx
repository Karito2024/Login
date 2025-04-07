import React from 'react'
import { Screen } from 'react-native-screens'
import LoginScreen from '../screen/LoginScreen'
import HomeScreen from '../screen/HomeScreen'
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from '../screen/RegisterScreen';
import SplashScreen from '../screen/SplashScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name='Login' component={LoginScreen} options={{ title: 'Iniciar Sesión' }} />
      <Stack.Screen name='Register' component={RegisterScreen} options={{ title: 'Registro' }} />
      <Stack.Screen name='Home' component={HomeScreen} options={{ title: 'Bienvenido' }} />
      <Stack.Screen name='Splash' component={SplashScreen} options={{ title: 'Bienvenido' }} />
    </Stack.Navigator>
  )
}

export default StackNavigator;
