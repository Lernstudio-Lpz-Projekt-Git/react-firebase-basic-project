import * as firebase from "firebase/app";
//import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import "firebase/auth";
// apiKey: process.env.REACT_APP_FIREBASE_KEY,
// 
const dbWeekApp = firebase.initializeApp( {
  apiKey: "AIzaSyDzhpLS6kDf74DDCvpVmBfQlu1Dgb6rqqA",
  authDomain: "fir-basic-project-89b65.firebaseapp.com",
  projectId: "fir-basic-project-89b65",
  storageBucket: "fir-basic-project-89b65.appspot.com",
  messagingSenderId: "1070692515673",
  appId: "1:1070692515673:web:b52009a81fe425d99e1648",
});

// Initialize Firebase
//const dbApp = firebase.initializeApp(firebaseConfig);
const getWeekDB = getFirestore(dbWeekApp);
export const firebasedb  = getWeekDB;
