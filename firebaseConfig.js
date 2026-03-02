// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXtRv3mUGlZeFMPQUFEcb3sOycHWEKJrs",
  authDomain: "studysmart-cloud.firebaseapp.com",
  projectId: "studysmart-cloud",
  storageBucket: "studysmart-cloud.firebasestorage.app",
  messagingSenderId: "393532542437",
  appId: "1:393532542437:web:1bbb4d6f97c5e003eb330c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
