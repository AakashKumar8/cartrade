// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA571tsHIVOZG14dZTsebvQD58iUABPSSg",
  authDomain: "walmart-750b4.firebaseapp.com",
  projectId: "walmart-750b4",
  storageBucket: "walmart-750b4.firebasestorage.app",
  messagingSenderId: "646981086570",
  appId: "1:646981086570:web:abae896526533432b58913",
  measurementId: "G-Z3CKXWSB6L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export const db=getFirestore(app);
export default app;