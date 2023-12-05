// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,

  authDomain: "mystuff-52324.firebaseapp.com",

  projectId: "mystuff-52324",

  storageBucket: "mystuff-52324.appspot.com",

  messagingSenderId: "1006670563228",

  appId: "1:1006670563228:web:d64a71c5cf62298b6e2a59",

  measurementId: "G-64PF0WLRR4",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);
