import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { FirestoreAdapter } from "@next-auth/firebase-adapter"
import CredentialsProvider from 'next-auth/providers/credentials';
import { auth, signInWithEmailAndPassword } from "../../../../Firebase/Firebase.config";

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            checks: console.log("Google") // Don't delete this line
        }),
        CredentialsProvider({
            id: 'credentials',
            name: 'credentials',
            credentials: {
                email: {
                    label: 'E-mail',
                    type: 'email',
                    placeholder: 'email@example.com',
                },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials, req) {
                // Try/catch block using signInWithEmailAndPassword
                try {
                    const user = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
                    return user;
                }
                catch (error) {
                    throw new Error(error);
                }
                
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
                if(account.provider == "credentials") {
                    var aT = user.user.stsTokenManager.accessToken;
                    var aTE = user.user.stsTokenManager.expirationTime;
                    var rT = user.user.refreshToken;
                    var uID = user.user.uid;
                } else {
                    var aT = account.access_token;
                    var aTE = account.expires_at;
                    var rT = account.refreshToken;
                    var uID = user.id;
                }


            return {
                ...token,
                accessToken: aT,
                accessTokenExpires: aTE,
                refreshToken: rT,
                uid: uID
            };
            }
            return token;
        },

        async session({ session, token }) {
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            session.user.accessTokenExpires = token.accessTokenExpires;
            session.user.uid = token.uid;
            session.user.role = "user";

            console.log(session)
            return session;
        },
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
        maxAge: 5*60*1000
    }
});