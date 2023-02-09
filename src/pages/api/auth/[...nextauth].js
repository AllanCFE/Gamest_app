import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { FirestoreAdapter } from "@next-auth/firebase-adapter"
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'E-mail',
                    type: 'email',
                    placeholder: 'email@example.com',
                },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials, req) {
                const user = {
                    email: credentials.email,
                    password: credentials.password
                };

                if (user.email == 'a@a.com.br' && user.password == '123') {
                    return user
                }
                return null
            }
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
    pages: {
        signIn: '/signin',
    },
    callbacks: {
        async jwt({ token, user, account }) {
            if (account && user) {
            return {
                ...token,
                accessToken: user.token,
                refreshToken: user.refreshToken,
            };
            }

            return token;
        },

        async session({ session, token }) {
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            session.user.accessTokenExpires = token.accessTokenExpires;

            return session;
        },
    },
});