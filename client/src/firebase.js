
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "property-plaza.firebaseapp.com",
  projectId: "property-plaza",
  storageBucket: "property-plaza.appspot.com",
  messagingSenderId: "902315706923",
  appId: "1:902315706923:web:f5aa455bfebd1de151786e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);