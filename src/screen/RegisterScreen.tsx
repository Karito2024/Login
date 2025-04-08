//Registro
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState } from 'react'
import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

const RegisterScreen = ({ navigation }: any) => {
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const manejarRegistro = async () => {
        if (!nombre || !email || !pass) {
            Alert.alert('Error', 'Campos obligatorios');
            return;
        }

        try {
            const data = await AsyncStorage.getItem('usuarios');
            const usuarios = data ? JSON.parse(data) : [];
            const existe = usuarios.find((u: any) => u.email === email);
            if (existe) {
                Alert.alert('Error', 'El correo ya existe');
                return;
            }
            const nuevoUsuario = { nombre, email, password: pass };
            usuarios.push(nuevoUsuario); //Agregar el nuevo usuario al arreglo
            await AsyncStorage.setItem('usuarios', JSON.stringify(usuarios)); //Guardar el arreglo actualizado en AsyncStorage
            Alert.alert('Éxito', 'Registro Compleatado')
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Error', 'Error al guardar el usuario')
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registrarse</Text>

            <TextInput placeholder='Nombre' style={styles.inpunt}
                value={nombre} onChangeText={setNombre}></TextInput>
            <TextInput placeholder='Correo' style={styles.inpunt}
                value={email} onChangeText={setEmail}></TextInput>
            <TextInput placeholder='Contraseña' secureTextEntry style={styles.inpunt}
                value={pass} onChangeText={setPass}></TextInput>

            <Button title='Crear Cuenta' onPress={manejarRegistro}></Button>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    inpunt: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5
    },
})

export default RegisterScreen