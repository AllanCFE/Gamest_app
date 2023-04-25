import styles from '@/styles/signup/user.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router';
import countries from 'countries-list';

import { auth, db } from '../../../Firebase/Firebase.config'
import { doc, updateDoc, setDoc } from 'firebase/firestore'
import { getSession, signIn } from 'next-auth/react'

import LeftImage from '../../../public/signup/left.png'
import { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

export default function SignUpUser (props: any) {
    const router = useRouter();

    const [formValues, setFormValues] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmpassword: "",
        birthday: "",
        country: ""
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues((prevState) => ({ ...prevState, [name]: value }));
    };

    // Handle input change for select tag
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormValues((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // previne o comportamento padrão de submeter o formulário

        // Verify if all the fields are filled
        if (router.query.provider == 'credentials') {
            if (formValues.name == "" || formValues.surname == "" || formValues.email == "" || formValues.password == "" || formValues.confirmpassword == "" || formValues.birthday == "" || formValues.country == "") {
                alert("Please fill all the fields");
                return;
            }
        } else {
            if (formValues.birthday == "" || formValues.country == "") {
                alert("Please fill all the fields");
                return;
            }
        }

        // Verify if the passwords match
        if (formValues.password != formValues.confirmpassword && router.query.provider == 'credentials') {
            alert("Passwords don't match");
            return;
        }

        // Verify if the e-mail field is a valid e-mail
        // Regular expression to verify if the email is valid
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Test the email validity
        if (!regex.test(formValues.email) && router.query.provider == 'credentials') {
            alert("Invalid e-mail");
            return;
        }

        // Verify if the birthday is valid
        const birthday = new Date(formValues.birthday);
        const today = new Date();

        if (birthday > today) {
            alert("Invalid birthday");
            return;
        }

        let errorTexts = [];
        let error = false;
        // Verify security of password
        if (formValues.password.length < 6 && router.query.provider == 'credentials') {
            errorTexts.push("Password must have at least 6 characters\n");
            error = true;
        }
        if (formValues.password.length > 30 && router.query.provider == 'credentials') {
            errorTexts.push("Password must have at most 30 characters\n");
            error = true;
        }
        if (!/[A-Z]/.test(formValues.password) && router.query.provider == 'credentials') {
            errorTexts.push("Password must have at least one uppercase letter\n");
            error = true;
        }
        if (!/[a-z]/.test(formValues.password) && router.query.provider == 'credentials') {
            errorTexts.push("Password must have at least one lowercase letter\n");
            error = true;
        }
        if (!/[0-9]/.test(formValues.password) && router.query.provider == 'credentials') {
            errorTexts.push("Password must have at least one number\n");
            error = true;
        }
        if(error){
            alert(errorTexts.join(""));
            return;
        }

        if(router.query.provider == 'credentials'){
            createUserWithEmailAndPassword(auth, formValues.email, formValues.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    
                    const userRef = doc(db, "users", user.uid);

                    setDoc(userRef, {
                        name: formValues.name,
                        surname: formValues.surname,
                        birthday: formValues.birthday,
                        country: formValues.country,
                        provider: router.query.provider,
                        lastUpdate: new Date(),
                        role: "user"
                    }).then(() => {
                        const blockedProfileRef = doc(db, "blockedProfiles", user.uid);
                        const allowedProfileRef = doc(db, "allowedProfiles", user.uid);

                        setDoc(blockedProfileRef, {
                            lastUpdate: new Date(),
                            birthday: formValues.birthday,
                            workModel: null,
                            languages: null,
                            about: null,
                            programming_languages: null,
                            tools: null,
                            initials: formValues.name.charAt(0) + formValues.surname.charAt(0)
                        })
                        .then(() => {
                            setDoc(allowedProfileRef, {
                                lastUpdate: new Date(),
                                birthday: formValues.birthday,
                                workModel: null,
                                languages: null,
                                about: null,
                                programming_languages: null,
                                tools: null,
                                contact: {
                                    email: formValues.email,
                                    phone: null,
                                }
                            })
                            .then(() => {
                                signIn("credentials", { email: formValues.email, password: formValues.password, callbackUrl: "/user/dashboard"});
                            })
                            .catch((error) => {
                                alert(error);
                            });
                        })
                        .catch((error) => {
                            alert(error);
                        });
                    }).catch((error) => {
                        alert(error);
                    });
                }).catch((error) => {
                    const errorMessage = error.message;
                    alert(errorMessage);
                });
        } else {
            
            fetch('https://us-central1-gamest-app.cloudfunctions.net/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: props.user.email,
                    name: props.user.name,
                    uid: props.user.uid
                })
            })
                .then((response) => {
                    return (response.json());
                })
                .then((data) => {
                    // If there is an error, show it
                    if (data.error) {
                        alert(data.error);
                        return;
                    }

                    // If there is no error, sign in the user
                    const userRef = doc(db, "users", props.user.uid);

                    updateDoc(userRef, {
                        birthday: formValues.birthday,
                        country: formValues.country,
                        provider: router.query.provider,
                        lastUpdate: new Date(),
                        role: "user"
                    }).then(() => {

                        const blockedProfileRef = doc(db, "blockedProfiles", props.user.uid);
                        const allowedProfileRef = doc(db, "allowedProfiles", props.user.uid);

                        setDoc(blockedProfileRef, {
                            lastUpdate: new Date(),
                            birthday: formValues.birthday,
                            workModel: null,
                            languages: null,
                            about: null,
                            programming_languages: null,
                            tools: null,
                            initials: props.user.name.charAt(0),
                        })
                        .then(() => {                            
                            setDoc(allowedProfileRef, {
                                lastUpdate: new Date(),
                                birthday: formValues.birthday,
                                workModel: null,
                                languages: null,
                                about: null,
                                programming_languages: null,
                                tools: null,
                                contact: {
                                    email: props.user.email,
                                    phone: null,
                                }
                            })
                            .then(() => {
                                router.push('/user/dashboard')
                            })
                            .catch((error) => {
                                alert(error);
                            });

                        })
                        .catch((error) => {
                            alert(error);
                        });

                        
                    }).catch((error) => {
                        alert(error);
                    });
                })
        }
    }

    return (
        <main className={styles.main}>
            <div className={styles.left}>
                <Image src={LeftImage} alt="signup"/>
            </div>

            <div className={styles.right}>
                <div className={`${styles.holder}  ${router.query.provider == 'credentials' ? "" : styles.holderNoC}`}>
                    <form className={styles.formArea} onSubmit={handleSignUp}>

                        {router.query.provider == 'credentials' ?
                            <div className={styles.formLine}>
                                <span className={styles.inputSpan}>
                                    <label htmlFor="name">Name:</label>
                                    <input type="text" name="name" placeholder="Name" className={styles.inputSpace} onChange={handleInputChange} />
                                </span>
                                <span className={styles.inputSpan}>
                                    <label htmlFor="surname">Surname:</label>
                                    <input type="text" name="surname" placeholder="Surname" className={styles.inputSpace} onChange={handleInputChange} />
                                </span>
                            </div>
                        : ""}
                        

                        <div className={styles.formLine}>
                            <span className={styles.inputSpan}>
                                <label htmlFor="birthday">Birthday:</label>
                                <input type="date" name="birthday" placeholder="Birthday" className={styles.inputSpace} onChange={handleInputChange} />
                            </span>
                            <span className={styles.inputSpan}>
                                <label htmlFor="country">Country:</label>
                                <select name="country" className={styles.inputSpace} onChange={handleSelectChange}>
                                    {Object.keys(countries.countries).map((id) => {
                                        const countryObj = (countries.countries as any)[id]
                                        const countryName = (countryObj.name as string)
                                        return <option key={id} value={countryName}>{countryName}</option>
                                    })}
                                </select>
                            </span>
                        </div>

                        {router.query.provider == 'credentials' ?
                            <div className={styles.formLine}>
                                <span className={styles.inputSpan}>
                                    <label htmlFor="password">Password:</label>
                                    <input type="password" name="password" placeholder="Password" className={styles.inputSpace} onChange={handleInputChange} />
                                </span>
                                <span className={styles.inputSpan}>
                                    <label htmlFor="confirmpassword">Confirm Password:</label>
                                    <input type="password" name="confirmpassword" placeholder="Confirm Password" className={styles.inputSpace} onChange={handleInputChange} />
                                </span>
                            </div>
                        :""}
                        
                        {router.query.provider == 'credentials' ?
                            <div className={styles.formLine}>
                                <span className={styles.inputSpan}>
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" name="email" placeholder="Email" className={styles.inputSpace} onChange={handleInputChange} />
                                </span>
                            </div>
                        :""}

                        <button className={styles.submitButton} type="submit">Sign Up</button>
                    </form>

                    <div className={styles.disclaimer}>
                        <p>By signing up, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export async function getServerSideProps(context:any) {
    // Defines interface mySession with the user object
    interface mySession {
        user: {
        name?: string;
        email?: string;
        image?: string;
        role?: string;
        isNewUser?: boolean;
        };
    }
    const {req,res} = context
    const session = await (getSession({req}) as Promise<mySession>)

    return {
        props : {...session}
    }
}