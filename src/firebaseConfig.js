import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDP-yQ4Cy1lO6Rf5BNg99W8IarU_XSp9Gg",
  authDomain: "yugiho-403bd.firebaseapp.com",
  projectId: "yugiho-403bd",
  storageBucket: "yugiho-403bd.firebasestorage.app",
  messagingSenderId: "692022821026",
  appId: "1:692022821026:web:de5cd3c5b3470f556dd7fb",
  measurementId: "G-87J5MBNR4L"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
