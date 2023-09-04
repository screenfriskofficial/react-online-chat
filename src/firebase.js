import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAvjpA7p6ICw5BFT1clCyrOJY90s-976bg",
    authDomain: "chat-a3407.firebaseapp.com",
    projectId: "chat-a3407",
    storageBucket: "chat-a3407.appspot.com",
    messagingSenderId: "441056496978",
    appId: "1:441056496978:web:0c2ad25eb4aecdbc393e8b",
    measurementId: "G-E5WV3FVEEG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()