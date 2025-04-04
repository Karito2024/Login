import React, { useState } from 'react'
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

const LoginScreen = ({ navigation }: any) => {
    //Estado para el usuario y contraseña
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');

    //Función para validar y redirigir
    const manejarLogin = () => {
        if (!usuario || !password) {
            Alert.alert('Error', 'Todos los campos son obligatorios');
            return;
        }
        //Simular la autenticacion
        if (usuario === 'admin' && password === '1234') {
            navigation.navigate('Home', { user: usuario });
        } else {
            Alert.alert('Error', 'Credenciales incorrectas');
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesion</Text>

            <TextInput
                style={styles.imput}
                placeholder="Usuario"
                value={usuario}
                onChangeText={(text) => setUsuario(text)} />
            <TextInput
                style={styles.imput}
                placeholder="Contraseña"
                secureTextEntry={true}
                value={password} 
                onChangeText={(text) => setPassword(text)} />
            <Button title='Ingresar' onPress={manejarLogin} />
        </View>
    )
}
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
    button: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#333',
        borderRadius: 5,
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})

export default LoginScreen
