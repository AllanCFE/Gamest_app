import { signOut } from "next-auth/react";

export default function Test () {
    return (
        <div>
            <h1 onClick={signOut} >Test</h1>
        </div>
    )
}