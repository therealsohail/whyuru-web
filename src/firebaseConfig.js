import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBWLAdQIwUdiIcQ9iRdCtERLPs0osOaB_E",
  authDomain: "whyuru-web.firebaseapp.com",
  databaseURL: "https://whyuru-web.firebaseio.com",
  projectId: "whyuru-web",
  storageBucket: "whyuru-web.appspot.com",
  messagingSenderId: "954257930874",
  appId: "1:954257930874:web:dd2a7d90d395fc4ee9d9c3",
  measurementId: "G-454HYS8F2X",
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
