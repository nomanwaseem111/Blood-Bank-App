import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAqCojyp28IvImfR-2BjESMRwtVlVg9_ao",
  authDomain: "blood-bank-669a3.firebaseapp.com",
  projectId: "blood-bank-669a3",
  storageBucket: "blood-bank-669a3.appspot.com",
  messagingSenderId: "84876046626",
  appId: "1:84876046626:web:9c1f854971d4d9a296357b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth() 
export const db = getFirestore(app);
export { app,auth };
