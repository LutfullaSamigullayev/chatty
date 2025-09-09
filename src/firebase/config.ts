// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1TVV4dPqrDrB_vu8e8IkwVhVhfVtVZ_Q",
  authDomain: "chatty-webchat.firebaseapp.com",
  projectId: "chatty-webchat",
  storageBucket: "chatty-webchat.firebasestorage.app",
  messagingSenderId: "206464026674",
  appId: "1:206464026674:web:1b80345ee4b6840fc1d42b",
  databaseURL: "https://chatty-webchat-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()