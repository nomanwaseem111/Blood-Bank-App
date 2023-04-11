import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDAoS36fy7wTaHakQeyWPOWOyYH6iAoZlY",
  authDomain: "blood-bank-app-98b3b.firebaseapp.com",
  projectId: "blood-bank-app-98b3b",
  storageBucket: "blood-bank-app-98b3b.appspot.com",
  messagingSenderId: "1098931548552",
  appId: "1:1098931548552:web:7baa2805858f1e45c9ca3d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth() 
export const db = getFirestore(app);
export { app,auth };
