import styles from '@/styles/signup/company.module.css'
import Image from 'next/image'
import countries from 'countries-list'
import { useRouter } from 'next/router'

import { auth, db } from '../../../Firebase/Firebase.config'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, updateDoc, setDoc } from 'firebase/firestore'

import LeftImage from '../../../public/signup/left.png'
import { useState } from 'react'
import { getSession, signIn } from 'next-auth/react'

export default function SignUpCompany (props: any) {
    const router = useRouter()
    
    const [formValues, setFormValues] = useState({ 
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmpassword: "",
        companyname: "",
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
            if (formValues.name == "" || formValues.surname == "" || formValues.email == "" || formValues.password == "" || formValues.confirmpassword == "" || formValues.companyname == "" || formValues.country == "") {
                alert("Please fill all the fields");
                return;
            }
        } else {
            if (formValues.companyname == "" || formValues.country == "") {
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
        // Expressão regular para verificar se o email é válido
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Testa a validade do email
        if (!regex.test(formValues.email) && router.query.provider == 'credentials') {
            alert("Invalid e-mail")
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
                    const user = userCredential.user;
                    
                    // Update user profile
                    const userRef = doc(db, "users", user.uid);
    
                    setDoc(userRef, {
                        name: formValues.name,
                        surname: formValues.surname,
                        email: formValues.email,
                        companyname: formValues.companyname,
                        country: formValues.country,
                        provider: router.query.provider,
                        role: "company"
                    }).then(() => {
                        // Update successful
                        signIn("credentials", { email: formValues.email, password: formValues.password, callbackUrl: "/company/dashboard"});
                    }).catch((error) => {
                        // An error occurred
                        alert(error);
                    });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(`${errorMessage}`);
                });
        } else {
            // Update user profile
            const userRef = doc(db, "users", props.user.uid);

            updateDoc(userRef, {
                companyname: formValues.companyname,
                country: formValues.country,
                provider: router.query.provider,
                role: "company"
            }).then(() => {
                // Update successful
                router.push(`/company/dashboard`);
            }).catch((error) => {
                // An error occurred
                alert(error);
            });
        }
    };

    return (
        <main className={styles.main}>
            <div className={styles.left}>
                <Image src={LeftImage} alt="signup"/>
            </div>

            <div className={styles.right}>
                <div className={`${styles.holder} ${router.query.provider == 'credentials' ? "" : styles.holderNoC}`}>
                    <form className={styles.formArea} onSubmit={handleSignUp} >
                        {router.query.provider == 'credentials' ? 
                            <div className={`${styles.formLine}`}>
                                <span className={`${styles.inputSpan} `}>
                                    <label htmlFor="name">Name:</label>
                                    <input type="text" name="name" placeholder="Name" className={styles.inputSpace} onChange={handleInputChange}/>
                                </span>
                                <span className={styles.inputSpan}>
                                    <label htmlFor="surname">Surname:</label>
                                    <input type="text" name="surname" placeholder="Surname" className={styles.inputSpace} onChange={handleInputChange}/>
                                </span>
                            </div>
                        : "" }
                        
                        {router.query.provider == 'credentials' ? 
                            <div className={`${styles.formLine}`}>
                                <span className={styles.inputSpan}>
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" name="email" placeholder="Email" className={styles.inputSpace} onChange={handleInputChange}/>
                                </span>
                            </div>
                        : "" }
                        
                        {router.query.provider == 'credentials' ?
                            <div className={`${styles.formLine}`}>
                                <span className={styles.inputSpan}>
                                    <label htmlFor="password">Password:</label>
                                    <input type="password" name="password" placeholder="Password" className={styles.inputSpace} onChange={handleInputChange}/>
                                </span>
                                <span className={styles.inputSpan}>
                                    <label htmlFor="confirmpassword">Confirm Password:</label>
                                    <input type="password" name="confirmpassword" placeholder="Confirm Password" className={styles.inputSpace} onChange={handleInputChange}/>
                                </span>
                            </div>
                        : "" }
                        

                        {router.query.provider == 'credentials' ? 
                            <>
                                <div className={styles.formLine}>
                                    <span className={styles.inputSpan}>
                                        <label htmlFor="companyname">Company Name:</label>
                                        <input type="text" name="companyname" placeholder="Company Name" className={styles.inputSpace} onChange={handleInputChange}/>
                                    </span>
                                </div>

                                <div className={styles.formLine}>
                                    <span className={styles.inputSpan}>
                                        <label htmlFor="country">Country:</label>
                                        <select name="country" className={styles.inputSpace} onChange={handleSelectChange}>
                                            <option value="" disabled selected>Select your country</option>
                                            {Object.keys(countries.countries).map((id) => {
                                                const countryObj = (countries.countries as any)[id]
                                                const countryName = (countryObj.name as string)
                                                return <option key={id} value={countryName}>{countryName}</option>
                                            })}
                                        </select>
                                    </span>
                                </div>
                            </>
                        : 
                            <>
                                <div className={styles.formLine}>
                                    <span className={styles.inputSpan}>
                                        <label htmlFor="companyname">Company Name:</label>
                                        <input type="text" name="companyname" placeholder="Company Name" className={styles.inputSpace} onChange={handleInputChange}/>
                                    </span>
                                    <span className={styles.inputSpan}>
                                        <label htmlFor="country">Country:</label>
                                        <select name="country" className={styles.inputSpace}  onChange={handleSelectChange}>
                                            <option value="" disabled selected>Select your country</option>
                                            {Object.keys(countries.countries).map((id) => {
                                                const countryObj = (countries.countries as any)[id]
                                                const countryName = (countryObj.name as string)
                                                return <option key={id} value={countryName}>{countryName}</option>
                                            })}
                                        </select>
                                    </span>
                                </div>
                            </>
                        }


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