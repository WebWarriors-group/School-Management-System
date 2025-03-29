import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {

    apiKey: "AIzaSyAFZQ_mDaRdoGsotG6jThYEtdN-NsrOo_A",
  
    authDomain: "mahadivulwewa-national-school.firebaseapp.com",
  
    projectId: "mahadivulwewa-national-school",
  
    storageBucket: "mahadivulwewa-national-school.firebasestorage.app",
  
    messagingSenderId: "465299916200",
  
    appId: "1:465299916200:web:b430c97ddd0970e46e499d",
  
    measurementId: "G-QJ2PYHLR8Y"
  
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };