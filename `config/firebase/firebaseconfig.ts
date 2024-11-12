// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0Z0U-ewWOveNLuWaB8tc-KfBcap2wOKo",
  authDomain: "fir-database-2719d.firebaseapp.com",
  projectId: "fir-database-2719d",
  storageBucket: "fir-database-2719d.firebasestorage.app",
  messagingSenderId: "653065060546",
  appId: "1:653065060546:web:d89976040c5d890c8bfb5b",
  measurementId: "G-MDK06L4KRR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;