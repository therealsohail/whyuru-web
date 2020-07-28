import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBunyp5Tc1vh1keoAYr9BpjDmBctbRcDf0",
  authDomain: "whyuru-12061.firebaseapp.com",
  databaseURL: "https://whyuru-12061.firebaseio.com",
  projectId: "whyuru-12061",
  storageBucket: "whyuru-12061.appspot.com",
  messagingSenderId: "202515089807",
  appId: "1:202515089807:web:edffa2be67040c8571a3fa",
  measurementId: "G-1J3JDPLHG1",
};
// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
