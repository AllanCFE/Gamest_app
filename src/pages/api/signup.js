// Sign up a new user with email and password via Firebase

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../Firebase/Firebase.config";

export default async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await createUserWithEmailAndPassword(auth, email, password);
        res.status(200).json({ user });
    } catch (error) {
        res.status(400).json({ error });
    }
};