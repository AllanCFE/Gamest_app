import styles from '@/styles/signup/user.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router';
import countries from 'countries-list';

import LeftImage from '../../../public/signup/left.png'
import { useState } from 'react';

export default function SignUpUser () {
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
        if (formValues.password != formValues.confirmpassword) {
            alert("Passwords don't match");
            return;
        }

        // Verify if the e-mail field is a valid e-mail
        // Regular expression to verify if the email is valid
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Test the email validity
        if (!regex.test(formValues.email)) {
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
        if (formValues.password.length < 6) {
            errorTexts.push("Password must have at least 6 characters\n");
            error = true;
        }
        if (formValues.password.length > 30) {
            errorTexts.push("Password must have at most 30 characters\n");
            error = true;
        }
        if (!/[A-Z]/.test(formValues.password)) {
            errorTexts.push("Password must have at least one uppercase letter\n");
            error = true;
        }
        if (!/[a-z]/.test(formValues.password)) {
            errorTexts.push("Password must have at least one lowercase letter\n");
            error = true;
        }
        if (!/[0-9]/.test(formValues.password)) {
            errorTexts.push("Password must have at least one number\n");
            error = true;
        }
        if(error){
            alert(errorTexts.join(""));
            return;
        }

        // Create the user
        // TODO

        // Redirect to the home page
        // router.push("/");
        alert("User created successfully");
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