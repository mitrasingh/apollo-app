import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyByAaOFfbPtuLPdBBsR_59GP4WydYr-FBg",
    authDomain: "apollo-9beed.firebaseapp.com",
    projectId: "apollo-9beed",
    storageBucket: "apollo-9beed.appspot.com",
    messagingSenderId: "33609584926",
    appId: "1:33609584926:web:a3c8a0e85743fc2bd8390f",
    measurementId: "G-RLM6XKTT7P"
  };

  const app = initializeApp(firebaseConfig)

  export const auth = getAuth(app)

  export const db = getFirestore(app)