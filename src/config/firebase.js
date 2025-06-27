// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "koikichi-b5079.firebaseapp.com",
  projectId: "koikichi-b5079",
  storageBucket: "koikichi-b5079.appspot.com",
  messagingSenderId: "1075567685195",
  appId: "1:1075567685195:web:2e46d6fd03b533dc71e7ce",
  measurementId: "G-4VJMQBPQYJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
// const messaging = getMessaging(app);
const googleProvider = new GoogleAuthProvider();
export {storage, googleProvider};

