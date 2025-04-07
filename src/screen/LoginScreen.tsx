import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const LoginScreen = ({ navigation }: any) => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [correo, setCorreo] = useState('');

  const manejarLogin = async () => {
    if (!usuario || !password) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    try {
      const userData = await AsyncStorage.getItem('usuarios');
      const usuarios = userData ? JSON.parse(userData) : [];//parsear el string a un objeto
      const usuario = usuarios.find((u: any) => u.email === correo && u.password === password);
      if (usuario) {
        // Si el usuario existe, guardar la información en AsyncStorage y navegar a Home
        await AsyncStorage.setItem('usuarios', JSON.stringify(usuario));
        navigation.navigate('Home', { user: usuario.nombre });
      } else {
        // Si el usuario no existe, mostrar un mensaje de error
        Alert.alert('Error', 'Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Error al iniciar sesión');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
        style={styles.imput}
        placeholder="Usuario"
        value={usuario}
        onChangeText={setUsuario}
      />
      <TextInput
        style={styles.imput}
        placeholder="Contraseña"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Ingresar" onPress={manejarLogin} />

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>¿No tienes cuenta?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  imput: {
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  registerText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#0066cc',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
// export default LoginScreen;