// Import the functions you need from the SDKs you need
import { getApp, initializeApp } from "firebase/app";
import { getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBveVHEj-0DC1-4TRJa0c24iHFVFqIHtOU",
  authDomain: "prelo-a84e1.firebaseapp.com",
  projectId: "prelo-a84e1",
  storageBucket: "prelo-a84e1.firebasestorage.app",
  messagingSenderId: "400561492722",
  appId: "1:400561492722:web:83bbd4583521994c80f66b"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app)

export {db}