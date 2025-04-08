//Login
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }: any) => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const manejarLogin = async () => {
    if (!correo || !password) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    try {
      const data = await AsyncStorage.getItem('usuarios');
      const usuarios = data ? JSON.parse(data) : [];

      const usuario = usuarios.find((u: any) => u.email === correo &&
        u.password === password);

      if (usuario) {
        await AsyncStorage.setItem('usuarioActivo', JSON.stringify(usuario));
        navigation.replace('Home', { user: usuario.nombre });
      } else {
        Alert.alert('Error', 'Credenciales incorrectas');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo validar el usuario');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
        placeholder="Correo"
        style={styles.input}
        value={correo}
        onChangeText={setCorreo}
      />

      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Ingresar" onPress={manejarLogin} />

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>¿No tienes cuenta? Registrate</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10,
    marginBottom: 15, borderRadius: 5
  },
  registerText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#0066cc',
    textDecorationLine: 'underline'
  }
});

export default LoginScreen;