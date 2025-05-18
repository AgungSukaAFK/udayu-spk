// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBarEflAVPkBlmBlmUd6gIQGpp2q07Zb8M",
    authDomain: "udayu-spk.firebaseapp.com",
    projectId: "udayu-spk",
    storageBucket: "udayu-spk.firebasestorage.app",
    messagingSenderId: "256454406473",
    appId: "1:256454406473:web:aeb5956021e7ada59daa98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);