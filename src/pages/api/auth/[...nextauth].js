import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { FirestoreAdapter } from "@next-auth/firebase-adapter"

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    adapter: FirestoreAdapter({
        apiKey: process.env.NEXT_PUBLICNEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: "gamest-app.appspot.com",
        messagingSenderId: "296934238352",
        appId: "1:296934238352:web:b8df3f525fdcc3e169d015",
        measurementId: "G-VQNQPEKHFG"
    }),
    // ...
});