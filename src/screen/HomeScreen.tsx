import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Alert, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = ({ route, navigation }: any) => {
  const { user } = route.params;

  const cerrarSesion = async () => {
    try {
      await AsyncStorage.removeItem('usuario');
      navigation.replace('Login');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Error al cerrar sesión');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.text}>Bienvenido, {user}</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={cerrarSesion}>
          <Icon name="logout" size={20} color="#fff" />
          <Text style={styles.logoutText}>Cerrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    marginRight: 10,
  },
  logoutButton: {
    backgroundColor: '#f00',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 14,
  },
});

export default HomeScreen;
