
import { View, Text, Button, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from '@/`config/firebase/firebaseconfig';
import { Link, useRouter } from 'expo-router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User ID:', user.uid);
        router.push('/'); // Navigate to home screen when authenticated
      } else {
        console.log('User signed out');
      }
    });

    return () => unsubscribe(); // Cleanup on component unmount
  }, [router]);

  const handlerLogin = () => {
    if (!email || !password) {
      console.log("Please enter both email and password.");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('User logged in:', userCredential.user);
        router.push('/'); // Navigate to home on successful login
      })
      .catch((error) => {
        console.log('Login error:', error.message);
      });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        

        <Button  title="Login" onPress={handlerLogin} />
    
        <View style={styles.linkContainer}>
          <Link style={styles.linkText} href="/register">Don't have an account? Register</Link>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

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
button:  {
borderRadius:20
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

export default Login;
