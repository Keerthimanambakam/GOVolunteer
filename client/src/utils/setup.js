// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkIiGemm-uwK2fXd5EODF9wfhMDnT8G-s",
  authDomain: "anirudh-9d4b9.firebaseapp.com",
  projectId: "anirudh-9d4b9",
  storageBucket: "anirudh-9d4b9.appspot.com",
  messagingSenderId: "665169739447",
  appId: "1:665169739447:web:0c5011fdc99e0c3560d732",
  measurementId: "G-LELMF4KHRG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);