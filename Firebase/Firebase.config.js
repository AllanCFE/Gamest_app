// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import {  getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLICNEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: "gamest-app.appspot.com",
    messagingSenderId: "296934238352",
    appId: "1:296934238352:web:b8df3f525fdcc3e169d015",
    measurementId: "G-VQNQPEKHFG"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp : initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export {app, db, storage}
