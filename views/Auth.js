


import React,{useEffect,useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert } from 'react-native';



const Auth = ({navigation}) =>{
    
  
    const [tokenstorage, setToken] = useState('');
    const [usuario, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [tokenapi, settokenapi] = useState('');
    const [tipo,settipo]=useState('')
   
   


    useEffect(()=>{
      const consumirPai =async()=>{

        try {
          const res2 = await fetch(
            'http://129.80.238.214:3000/api/menu',
            {
              method: 'GET',
              headers: {
                'x-token': `${tokenstorage}`,
              }
            },
          );
    
    
         const {tipo} = await res2.json();
        settipo(tipo)

        } catch (error) {
          console.log(error)
        }
      }
      consumirPai()
    })
   
    useEffect(()=>{
        const obtenerToken = async () =>{
          
          try {
          const tokenStorage = await AsyncStorage.getItem('token') 
          const userStorage = await AsyncStorage.getItem('user') 
          const passwordStorage =await AsyncStorage.getItem('password') 
          setToken(tokenStorage)
         setUser(userStorage)
         setPassword(passwordStorage)
     
        
        } catch (error) {
          console.log(error)
          
        }
        
        }
        
        obtenerToken()

      
        
        })

      

        console.log(usuario)
        console.log(password)

        useEffect(() => {
          consumirApi()
          if(tokenstorage!=tokenapi){
            navigation.navigate('Login')
         
          
         
              Alert.alert(
              'Alerta',
              'Token Vencido',
              [
             {text:'Ok',onPress:()=>{
              navigation.navigate('Login')
              
             
             }} 
             ]
               
            )
       
     
           }else if(tokenapi===tokenstorage && tipo==='MA') {
            navigation.navigate('Dashboard')
             
           }else if(tokenapi===tokenstorage && tipo==='TE'){
            navigation.navigate('DashboardAliado')
           }
       
    
        },[tokenstorage]);
    

        const  consumirApi = async () => {
        
            try {
           const res = await fetch('http://129.80.238.214:3000/api/auth/login/', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user : `${usuario}`,
              password: `${password}`,
            }),
          });
                const resJson = await res.json();
                  settokenapi(resJson.token)
              
                
              
                
                
              } catch (err) {
                console.log(err);
              }  
        
              //BackHandler.exitApp()
      
              
           
           
              
            }

           

         
        
    return(
       <></>
        )
}

export default Auth;