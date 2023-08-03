import React, { useState, useEffect } from 'react'
import {
  StyleSheet, View, Text, Image, Alert
} from 'react-native';
import globalStyles from './global/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, Button } from 'react-native-paper'




const Login = ({ navigation }) => {
  const [usuario, guardarUsuario] = useState('')
  const [password, guardarPassword] = useState('')




  useEffect(() => {

    consumirApi()

  }, [])


  const consumirApi = async () => {


    try {


      const res = await fetch('http://129.80.238.214:3000/api/auth/login/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: `${usuario}`,
          password: `${password}`,
        }),
      });


      const resJson = await res.json();
      const token = resJson.token
      

      const res2 = await fetch(
        'http://129.80.238.214:3000/api/menu',
        {
          method: 'GET',
          headers: {
            'x-token': `${token}`,
          }
        },
      );


      const { tipo, status } = await res2.json();
   



     if (status === 1 && tipo === "MA") {

        await AsyncStorage.setItem('token', token)
        await AsyncStorage.setItem('user', usuario)
        await AsyncStorage.setItem('password', password)

        navigation.navigate('Dashboard')

      } else if (status === 1 && tipo === "TE") {
        await AsyncStorage.setItem('token', token)
        await AsyncStorage.setItem('user', usuario)
        await AsyncStorage.setItem('password', password)

        navigation.navigate('Dashboard')
      
      }else if(resJson.msg=="Usuario/Password no son correctos"){
        mostrarAlerta()
      }

      return





    } catch (err) {
      console.log(err);
    }


  }





  const mostrarAlerta = () => {

    Alert.alert('Error', 'Usuario y contraseña incorrecta', [{ text: 'Ok' }])
  }







  return (
<View style={{backgroundColor:'#fff'}}>

    <View style={globalStyles.contenedor}>
 
<Image source={require('../assets/img/bank.png')} style={styles.imagen} />  

      <TextInput
        label="Username"
        placeholder='Username'
        style={styles.input}
        onChangeText={guardarUsuario}
        value={usuario}

    
      />


      <TextInput
        label="Password"
        placeholder='Password'
        style={styles.input}
        onChangeText={guardarPassword}
        value={password}
        secureTextEntry={true}

      />
      <Button onPress={() => consumirApi()} style={styles.boton}><Text style={styles.btnText} >Iniciar sesion</Text></Button>

    </View>
    </View>


  )
}


const styles = StyleSheet.create({

  input: {
    marginBottom: 20,
    backgroundColor: 'transparent'

  }, imagen: {
    width:270,
    height:150,
    alignSelf: 'center',
    
  }, boton: {
    backgroundColor: '#C70039'

  }, btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase'


  }



})

export default Login
