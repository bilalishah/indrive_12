import { View, Text, Button, StyleSheet} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-gesture-handler'
import {  createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/`config/firebase/firebaseconfig';
import { Link } from 'expo-router';
interface Register{
    email:string;
    password:string
}
const Register = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const handlerRegister=()=>{

    createUserWithEmailAndPassword( auth,email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    
  });
}

  return (
  
     <SafeAreaProvider>
     <SafeAreaView style={styles.container}>
       <Text style={styles.title}>Register</Text>
       <TextInput
       style={styles.input}
            placeholder="useless placeholder"
         onChangeText={setEmail}
         value={email}
       />

       <TextInput
         style={styles.input}
         onChangeText={setPassword}
         value={password}
         placeholder="useless placeholder"
         keyboardType="numeric"
       />
       <Button title='Register' onPress={handlerRegister}/>
<button style={styles.linkContainer}><Link  style={styles.linkText}href='/login'>Already have an account?</Link></button>
     </SafeAreaView>
   </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#f2f2f2',
      justifyContent: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      textAlign: 'center',
    },
    input: {
      height: 48,
      marginVertical: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 20,
      paddingHorizontal: 12,
      backgroundColor: 'white',
    },
    linkContainer: {
      marginTop: 20,
      alignItems: 'center',
    },
    linkText: {
      color: '#0066cc',
      fontSize: 16,
    },
  });


export default Register

