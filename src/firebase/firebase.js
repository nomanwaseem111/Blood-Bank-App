import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyD81nCVtarM2yA8rkjOJwG-lOO-p7pl52s",
  authDomain: "blood-bank-app-be90b.firebaseapp.com",
  projectId: "blood-bank-app-be90b",
  storageBucket: "blood-bank-app-be90b.appspot.com",
  messagingSenderId: "455629734296",
  appId: "1:455629734296:web:8395836efa919c704fabed",
  measurementId: "G-978MVLZWW0"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export {app,auth}