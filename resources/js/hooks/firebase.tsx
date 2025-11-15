import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {

  apiKey: "AIzaSyBi_sS5YpLCHkq9oiuGKsksVDzK08banv0",

  authDomain: "sms-login-d5091.firebaseapp.com",

  projectId: "sms-login-d5091",

  storageBucket: "sms-login-d5091.firebasestorage.app",

  messagingSenderId: "403385348718",

  appId: "1:403385348718:web:32245d7ffaace2d21bac7f"

};

  
const app = initializeApp(firebaseConfig);


export { app };