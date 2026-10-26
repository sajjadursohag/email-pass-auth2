// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// DANGER--- Do Not Share in Public
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDei6pJbpu6sj0QryUyypLdORU1-5WFmQw",
  authDomain: "email-password-auth2-69da7.firebaseapp.com",
  projectId: "email-password-auth2-69da7",
  storageBucket: "email-password-auth2-69da7.firebasestorage.app",
  messagingSenderId: "1072961551422",
  appId: "1:1072961551422:web:7d33d140d7f2d9edc1656f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
