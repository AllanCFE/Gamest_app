import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";


export default function useRequireAuth() {
    const {data: session} = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!session && typeof session != "undefined") {
            router.push("/signin")
        }
    }, [session, router]);

    type MySession = (typeof session) & {
        user: {
            accessToken: string;
            refreshToken: string;
            accessTokenExpires: string;
            uid: string;
            role: string;
            isNewUser: boolean;
            companyname: string;
            username: string;
            country: string;
        },
    }

    return (session as MySession);
}