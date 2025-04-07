import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react'
import { Alert, Button, StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-gesture-handler';

const RegisterScreen = ({ navigation }: any) => {
    // Definición de estados para los campos del formulario
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    // Función para manejar el registro del usuario
    // Se encarga de validar los campos y guardar el usuario en AsyncStorage
    const manejarRegistro = async () => {
        // Validación de campos obligatorios
        // Si alguno de los campos está vacío, se muestra un mensaje de error
        if (!nombre || !email || !pass) {
            Alert.alert('Error', 'Campos obligatorios');
            return;
        }
        try {
            // Obtener los usuarios almacenados en AsyncStorage
            // Si no hay usuarios, se inicializa un array vacío
            const data = await AsyncStorage.getItem('usuarios');
            const usuarios = data ? JSON.parse(data) : [];//parsear el string a un objeto
            const existe = usuarios.find((u: any) => u.email === email);

            // Verificar si el correo ya existe en la lista de usuarios
            // Si existe, se muestra un mensaje de error y se detiene el registro
            if (existe) {
                Alert.alert('Error', 'El correo ya existe');
                return;
            }

            // Crear un nuevo objeto de usuario con los datos ingresados
            // y agregarlo al array de usuarios
            // Luego, se guarda el array actualizado en AsyncStorage
            const nuevoUsuario = { nombre, email, pass };
            usuarios.push(nuevoUsuario);
            await AsyncStorage.setItem('usuarios', JSON.stringify(usuarios));
            Alert.alert('Éxito', 'Usuario registrado con éxito');
            navigation.navigate('Login');

        // Si ocurre un error al guardar el usuario, se muestra un mensaje de error
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Error al guardar el usuario');
        }

    }
    // Renderizado del formulario de registro
    // Se utilizan TextInput para los campos de nombre, correo y contraseña
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registrarse</Text>
            <TextInput placeholder='Nombre' style={styles.input} value={nombre} onChangeText={setNombre}></TextInput>
            <TextInput placeholder='Correo' style={styles.input} value={email} onChangeText={setEmail}></TextInput>
            <TextInput placeholder='Contraseña' style={styles.input} value={pass} onChangeText={setPass}></TextInput>
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
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,

    }
})

export default RegisterScreen
