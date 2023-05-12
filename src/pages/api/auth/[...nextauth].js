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
        async jwt({ token, user, account, isNewUser }) {
            if (account && user) {
                if(account.provider == "credentials") {
                    var aT = user.user.stsTokenManager.accessToken;
                    var aTE = user.user.stsTokenManager.expirationTime;
                    var rT = user.user.refreshToken;
                    var uID = user.user.uid;
                    var role = user.user.role;
                    var username = user.user.name;
                    var country = user.user.country;
                    var email = user.user.email;
                    var provider = "credentials";

                    if(role == "company") {
                        var companyname = user.user.companyname;
                        var phone = user.user.phone;
                        var employees_number = user.user.employees_number;
                    } else if (role == "user") {
                        var linkedin = user.user.linkedin;
                        var github = user.user.github;
                        var portfolio = user.user.portfolio;
                        var localization = user.user.localization;
                        var bio_text = user.user.bio_text;
                        var gender = user.user.gender;
                    }
                    
                    await fetch('https://us-central1-gamest-app.cloudfunctions.net/getUser', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({id: uID}),
                    })
                    .then(response => response.json())
                    .then(data => {
                        role = data.role;
                        username = data.surname ? data.name + " " + data.surname : data.name;
                        country = data.country;
                        phone = data.phone;
                        if(role == "company") {
                            companyname = data.companyname;
                            employees_number = data.employees_number;
                        } else {
                            linkedin = data.linkedin;
                            github = data.github;
                            portfolio = data.portfolio;
                            localization = data.localization;
                            bio_text = data.bio_text;
                            gender = data.gender;
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
                } else {
                    var aT = account.access_token;
                    var aTE = account.expires_at;
                    var rT = account.refreshToken;
                    var uID = user.id;
                    var role = user.role;
                    var username = user.name;
                    var country = user.country;
                    var email = user.email;
                    var provider = "Google";
                    var phone = user.phone;

                    if(role == "company") {
                        var companyname = user.companyname;
                        var employees_number = user.employees_number;
                    } else if (role == "user") {
                        var linkedin = user.linkedin;
                        var github = user.github;
                        var portfolio = user.portfolio;
                        var localization = user.localization;
                        var bio_text = user.bio_text;
                        var gender = user.gender;
                    }
                }


            return {
                ...token,
                accessToken: aT,
                accessTokenExpires: aTE,
                refreshToken: rT,
                uid: uID,
                isNewUser: isNewUser,
                role: role,
                companyname: companyname || null,
                username: username || null,
                country: country || null,
                email: email || null,
                provider: provider || null,
                phone: phone || null,
                employees_number: employees_number || null,
                linkedin: linkedin || null,
                github: github || null,
                portfolio: portfolio || null,
                localization: localization || null,
                bio_text: bio_text || null,
                gender: gender || null
            };
            }
            return token;
        },

        async session({ session, token }) {
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            session.user.accessTokenExpires = token.accessTokenExpires;
            session.user.uid = token.uid;
            session.user.role = token.role;
            session.user.isNewUser = token.isNewUser;
            session.user.country = token.country;
            if (token.companyname) session.user.companyname = token.companyname;
            if (token.username) session.user.username = token.username;
            if (token.email) session.user.email = token.email;
            if (token.provider) session.user.provider = token.provider;
            if (token.phone) session.user.phone = token.phone;
            if (token.employees_number) session.user.employees_number = token.employees_number;
            if (token.linkedin) session.user.linkedin = token.linkedin;
            if (token.github) session.user.github = token.github;
            if (token.portfolio) session.user.portfolio = token.portfolio;
            if (token.localization) session.user.localization = token.localization;
            if (token.bio_text) session.user.bio_text = token.bio_text;
            if (token.gender) session.user.gender = token.gender;

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