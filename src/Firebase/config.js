
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import {getAuth} from 'firebase/auth'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhPKc3Zx5o6-ssbTyIQTP8ZW_vqJmtz_w",
  authDomain: "miniblogs-ff70e.firebaseapp.com",
  projectId: "miniblogs-ff70e",
  storageBucket: "miniblogs-ff70e.firebasestorage.app",
  messagingSenderId: "1014050351372",
  appId: "1:1014050351372:web:dbd464374d5431c5794129"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore (app);

const auth = getAuth(app);

export { db, auth };