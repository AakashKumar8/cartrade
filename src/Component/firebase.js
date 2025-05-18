// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; // ✅ For Realtime Database
import { getStorage } from "firebase/storage";   // ✅ For Firebase Storage

const firebaseConfig = {
  apiKey: "AIzaSyA571tsHIVOZG14dZTsebvQD58iUABPSSg",
  authDomain: "walmart-750b4.firebaseapp.com",
  databaseURL: "https://walmart-750b4-default-rtdb.firebaseio.com", // ✅ IMPORTANT for Realtime DB
  projectId: "walmart-750b4",
  storageBucket: "walmart-750b4.appspot.com", // ✅ Fixed typo here
  messagingSenderId: "646981086570",
  appId: "1:646981086570:web:abae896526533432b58913",
  measurementId: "G-Z3CKXWSB6L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getDatabase(app);       // ✅ Realtime Database export
export const storage = getStorage(app);   // ✅ Firebase Storage export

export default app;
