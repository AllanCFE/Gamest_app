import StandardBlockDivision from 'components/StandardBlockDivision/StandardBlockDivision'

import styles from '../../styles/company/EditProfile.module.css'
import Image from 'next/image'
import useRequireAuth from 'components/useRequireAuth/useRequireAuth'
import countries from 'countries-list'

import DefaultAvatar from '../../../public/Default/Default_Avatar.png'
import { useState } from 'react'

export default function EditProfile () {

    const session = useRequireAuth();
    const avatar = session?.user?.image || DefaultAvatar;
    const [isLoading, setIsLoading] = useState(true);
    const [formValues, setFormValues] = useState({
        companyname: session?.user?.companyname,
        country: session?.user?.country,
        email: session?.user?.email,
        phone: session?.user?.phone || null,
        employees: session?.user?.employees_number || null,
        username: session?.user?.username,
    });

    const [passwordValues, setPasswordValues] = useState({
        newpassword: "",
        repeatnewpassword: "",
    });

    if (!session) return <div>Loading...</div>

    if(isLoading) {
        setIsLoading(false);
        console.log(session)
        setFormValues({
            companyname: session?.user?.companyname,
            country: session?.user?.country,
            email: session?.user?.email,
            phone: session?.user?.phone || null,
            employees: session?.user?.employees_number || null,
            username: session?.user?.username,
        });
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleUpdateProfile = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        
        // Verify if all the fields are filled
        {
            if (formValues.companyname === null || formValues.companyname === "") {
                alert("Company name is required");
                return;
            }
            else if (formValues.country === null || formValues.country === "") {
                alert("Country is required");
                return;
            }
            else if (formValues.email === null || formValues.email === "") {
                alert("Email is required");
                return;
            }
            else if (formValues.username === null || formValues.username === "") {
                alert("Username is required");
                return;
            }
            else if (formValues.phone === null || formValues.phone === "") {
                alert("Phone number is required");
                return;
            }
            else if (formValues.employees === null || formValues.employees === undefined) {
                alert("Number of employees is required");
                return;
            }
        }

        // Verify if the email is valid
        {
            const email = formValues.email as string;
            const emailRegex = /\S+@\S+\.\S+/;

            if (!emailRegex.test(email)) {
                alert("Email is not valid");
                return;
            }
        }


        fetch('http://127.0.0.1:5001/gamest-app/us-central1/updateUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                companyname: formValues.companyname,
                country: formValues.country,
                email: formValues.email,
                phone: formValues.phone,
                employees_number: formValues.employees,
                username: formValues.username,
                id: session?.user?.uid,
            })
        })
        .then(response => {response.json(); return response;})
        .then(data => {
            if (data.status === 200) {
                alert("Profile updated successfully");
            }
            else {
                alert("Error updating profile");
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    const handlePasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
        setPasswordValues({
            ...passwordValues,
            [name]: value
        });
    };

    const handleUpdatePassword = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Verify if all the fields are filled
        {
            if (passwordValues.newpassword === null || passwordValues.newpassword === "" || passwordValues.repeatnewpassword === null || passwordValues.repeatnewpassword === "") {
                alert("The fields cannot be empty");
                return;
            }
        }

        // Verify if the passwords match
        {
            if (passwordValues.newpassword !== passwordValues.repeatnewpassword) {
                alert("Passwords don't match");
                return;
            }
        }

        fetch('http://127.0.0.1:5001/gamest-app/us-central1/updatePassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                new_password: passwordValues.newpassword,
                id: session?.user?.uid,
            })
        })
        .then(response => {response.json(); return response;})
        .then(data => {
            if (data.status === 200) {
                alert("Password updated successfully");
                setPasswordValues({
                    newpassword: "",
                    repeatnewpassword: "",
                });
            }
            else {
                alert("Error updating password");
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };


    return (
        <>
        <StandardBlockDivision 
            leftChildren={
                <>
                    <div className={styles.companyTop}>
                        <span className={styles.companyLogo}>
                            <Image src={avatar} alt="Company Logo" width={200} height={200} />
                        </span>
                        <span>
                            <h2>{formValues.username}</h2>
                            <h4>{formValues.companyname}</h4>
                        </span>
                    </div>

                </>
            }

            leftClass={styles.leftHolder}
            rightClass={styles.rightHolder}
            
            rightChildren={
                <div className={styles.scrollBar}>

                    <form className={styles.form}  onSubmit={handleUpdateProfile}>
                        <div className={styles.formGroup}>
                            <h2>Informações Básicas</h2>
                            <div className={styles.formLine}>
                                <span className={styles.inputSpan}>
                                    <label htmlFor="name">Company Name</label>
                                    <input type="text" name="name" id="name" defaultValue={formValues.companyname} onChange={handleInputChange} />
                                </span>

                                <span className={styles.inputSpan}>
                                    <label htmlFor="country">Country</label>
                                    <select name="country" id="country" onChange={handleSelectChange} >
                                        <option value={formValues.country}>{formValues.country}</option>
                                        {Object.keys(countries.countries).map((id) => {
                                            const countryObj = (countries.countries as any)[id]
                                            const countryName = (countryObj.name as string)
                                            return <option key={id} value={countryName}>{countryName}</option>
                                        })}
                                    </select>
                                </span>
                            </div>

                            <div className={styles.formLine}>
                                <span className={styles.inputSpan}>
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name="email" id="email" defaultValue={ formValues.email as string } onChange={handleInputChange} />
                                </span>
                            </div>

                            <div className={styles.horizontalBar}></div>
                        </div>

                        <div className={styles.formGroup}>
                            <h2>Additional Information</h2>
                            <div className={styles.formLine}>
                                <span className={styles.inputSpan}>
                                    <label htmlFor="phone">Phone Number</label>
                                    <input type="text" name="phone" id="phone"  onChange={handleInputChange} defaultValue={formValues.phone as string}/>
                                </span>

                                <span className={styles.inputSpan}>
                                    <label htmlFor="employees">Number of employees</label>
                                    <input type="number" name="employees" id="employees"  onChange={handleInputChange} defaultValue={formValues.employees as number}/>
                                </span>
                            </div>
                            <div className={styles.horizontalBar}></div>
                        </div>

                        <div className={styles.formGroup}>
                            <h2>Responsible</h2>
                            
                            <div className={styles.formLine}>
                                <span className={styles.inputSpan}>
                                    <label htmlFor="responsiblename">Name</label>
                                    <input type="text" name="responsiblename" id="responsiblename" defaultValue={formValues.username}  onChange={handleInputChange} />
                                </span>
                            </div>
                        </div>

                        <span>
                            <button className={styles.submitFormButton} type="submit">Save</button>
                        </span>
                    </form>

                    <div className={`${styles.horizontalBar} ${styles.newSection}`}></div>

                    {session?.user?.provider == "credentials" ? 
                        <form onSubmit={handleUpdatePassword}>
                            <div className={styles.formGroup}>
                                <h2>Update password</h2>

                                <div className={styles.formLine}>
                                    <span className={styles.inputSpan}>
                                        <label htmlFor="newpassword">New Password</label>
                                        <input type="password" name="newpassword" id="newpassword"  onChange={handlePasswordChange} />
                                    </span>
                                    <span className={styles.inputSpan}>
                                        <label htmlFor="repeatnewpassword">Repeat New Password</label>
                                        <input type="password" name="repeatnewpassword" id="repeatnewpassword" onChange={handlePasswordChange} />
                                    </span>
                                </div>
                                
                            </div>

                            <span>
                                <button className={styles.submitFormButton} type="submit">Save</button>
                            </span>
                        </form>
                    :
                        ""
                    }
                    
                </div>
            }
        />
                
                
        </>
    )
}