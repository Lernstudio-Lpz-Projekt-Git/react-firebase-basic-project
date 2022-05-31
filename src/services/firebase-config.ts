// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDzhpLS6kDf74DDCvpVmBfQlu1Dgb6rqqA",
  authDomain: "fir-basic-project-89b65.firebaseapp.com",
  projectId: "fir-basic-project-89b65",
  storageBucket: "fir-basic-project-89b65.appspot.com",
  messagingSenderId: "1070692515673",
  appId: "1:1070692515673:web:b52009a81fe425d99e1648",
};

// Initialize Firebase
const dbApp = initializeApp(firebaseConfig);
const getDB = getFirestore(dbApp);
// console.log(getDB);
export const db  = getDB;

