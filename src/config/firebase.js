// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPaoW325Sh-pxZpgMWsek3kcKnl5f6jg4",
  authDomain: "react-contact-app-270b8.firebaseapp.com",
  projectId: "react-contact-app-270b8",
  storageBucket: "react-contact-app-270b8.appspot.com",
  messagingSenderId: "192786093244",
  appId: "1:192786093244:web:2cf1f70239c1521f88ecb9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
