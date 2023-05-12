import StandardBlockDivision from 'components/StandardBlockDivision/StandardBlockDivision'

import styles from '../../styles/user/EditProfile.module.css'
import Image from 'next/image'
import useRequireAuth from 'components/useRequireAuth/useRequireAuth'

import DefaultAvatar from '../../../public/Default/Default_Avatar.png'
import { useState } from 'react'

export default function EditProfile () {

    const session = useRequireAuth();
    
    const genders = [
        { value: "notdeclared", label: "Prefer not to say" },
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" }
    ]
    
    const [isLoading, setIsLoading] = useState(true);
    const [formValues, setFormValues] = useState({
        name: session?.user?.name,
        email: session?.user?.email,
        phone: session?.user?.phone || null,
        linkedin: session?.user?.linkedin || null,
        github: session?.user?.github || null,
        portfolio: session?.user?.portfolio || null,
        localization: session?.user?.localization || null,
        bio_text: session?.user?.bio_text || null,
        gender: session?.user?.gender || null,
    });
    const [passwordValues, setPasswordValues] = useState({
        newpassword: "",
        repeatnewpassword: ""
    });
    
    if (!session) return <div>Loading...</div>
    
    const avatar = session.user.image ? session.user.image : DefaultAvatar;
    if(isLoading) {
        setIsLoading(false);
        setFormValues({
            name: session.user.name,
            email: session.user.email,
            phone: session.user.phone || null,
            linkedin: session.user.linkedin || null,
            github: session.user.github || null,
            portfolio: session.user.portfolio || null,
            localization: session.user.localization || null,
            bio_text: session.user.bio_text || null,
            gender: session.user.gender || null,
        });
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        console.log(name, value);
        setPasswordValues({ ...passwordValues, [name]: value });
    };

    const handleUpdatePassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        // Verify if the fields are filled
        if(!passwordValues.newpassword || !passwordValues.repeatnewpassword) {
            alert("Please fill all the fields");
            return;
        }
        
        if(passwordValues.newpassword !== passwordValues.repeatnewpassword) {
            alert("Passwords don't match");
            return;
        }

        await fetch('https://us-central1-gamest-app.cloudfunctions.net/updatePassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                new_password: passwordValues.newpassword
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.status == 200) {
                alert("Password updated successfully");
            } else {
                alert("Error updating password");
            }
        })
        .catch(error => {
            console.log(error);
            alert("Error updating password");
        });
    };

    const handleUpdateProfile = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Verify if the fields are filled
        if(!formValues.name || !formValues.email || !formValues.gender || formValues.name == "" || formValues.email == "") {
            alert("Please fill all the required fields");
            return;
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

        // If the other fields are blank, set them to null
        const phone = formValues.phone ? formValues.phone : null;
        const linkedin = formValues.linkedin ? formValues.linkedin : null;
        const github = formValues.github ? formValues.github : null;
        const portfolio = formValues.portfolio ? formValues.portfolio : null;
        const localization = formValues.localization ? formValues.localization : null;
        const bio_text = formValues.bio_text ? formValues.bio_text : null;

        // Verify if linkedin is a link
        if(linkedin) {
            const linkedinRegex = /https:\/\/www.linkedin.com\/in\/\S+/;

            if (!linkedinRegex.test(linkedin)) {
                alert("Linkedin is not valid");
                return;
            }
        }

        // Verify if github is a link
        if(github) {
            const githubRegex = /https:\/\/github.com\/\S+/;

            if (!githubRegex.test(github)) {
                alert("Github is not valid");
                return;
            }
        }

        // Verify if portfolio is a link
        if(portfolio) {
            const portfolioRegex = /https:\/\/\S+/;

            if (!portfolioRegex.test(portfolio)) {
                alert("Portfolio is not valid");
                return;
            }
        }

        // Verify if bio text is not too long
        if(bio_text) {
            if(bio_text.length > 400) {
                alert("Bio text is too long");
                return;
            }
        }

        await fetch('https://us-central1-gamest-app.cloudfunctions.net/updateUserProfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: formValues.name,
                email: formValues.email,
                phone: phone,
                linkedin: linkedin,
                github: github,
                portfolio: portfolio,
                localization: localization,
                bio_text: bio_text,
                gender: formValues.gender,
                id: session.user.uid
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
                            <h2>Allan Echeverria</h2>
                        </span>
                        <span>
                            <p className={styles.lastUpdated}>Last updated: 2022/02/28</p>
                        </span>
                    </div>

                </>
            }

            leftClass={styles.leftHolder}
            rightClass={styles.rightHolder}
            
            rightChildren={
                <div className={styles.scrollBar}>

                    <form className={styles.form} onSubmit={handleUpdateProfile}>
                        <div className={styles.formGroup}>
                            <h2>Informações Básicas</h2>
                            <div className={styles.formLine}>
                                <span className={`${styles.inputSpan} ${styles.inputSpanEntireLine}`}>
                                    <label htmlFor="name">Name<span className={styles.required}>*</span></label>
                                    <input  onChange={handleInputChange} type="text" name="name" id="name" defaultValue={formValues.name as string}/>
                                </span>
                            </div>

                            <div className={styles.formLine}>
                                <span className={styles.inputSpan}>
                                    <label htmlFor="email">Email<span className={styles.required}>*</span></label>
                                    <input  onChange={handleInputChange} type="email" name="email" id="email" defaultValue={formValues.email as string}/>
                                </span>
                            </div>

                            <div className={styles.horizontalBar}></div>
                        </div>

                        

                        <div className={styles.formGroup}>
                            <h2>Additional Information</h2>
                            <div className={styles.formLine}>
                                <span className={styles.inputSpan}>
                                    <label htmlFor="phone">Phone</label>
                                    <input  onChange={handleInputChange} type="text" name="phone" id="phone" defaultValue={formValues.phone as string}/>
                                </span>

                                <span className={styles.inputSpan}>
                                    <label htmlFor="linkedin">Linkedin</label>
                                    <input  onChange={handleInputChange} type="text" name="linkedin" id="linkedin" defaultValue={formValues.linkedin as string}/>
                                </span>
                            </div>

                            <div className={styles.formLine}>
                                <span className={styles.inputSpan}>
                                    <label htmlFor="github">Github</label>
                                    <input  onChange={handleInputChange} type="text" name="github" id="github" defaultValue={formValues.github as string} />
                                </span>

                                <span className={styles.inputSpan}>
                                    <label htmlFor="portfolio">Portfolio</label>
                                    <input  onChange={handleInputChange} type="text" name="portfolio" id="portfolio" defaultValue={formValues.portfolio as string} />
                                </span>
                            </div>

                            <div className={styles.formLine}>
                                <span className={styles.inputSpan}>
                                    <label htmlFor="localization">Localization</label>
                                    <input  onChange={handleInputChange} type="text" name="localization" id="localization" defaultValue={formValues.localization as string} />
                                </span>
                                <span className={styles.inputSpan}>
                                    <label htmlFor="gender">Gender<span className={styles.required}>*</span></label>
                                    <select name="gender" id="gender" onChange={handleSelectChange}>
                                        {genders.map((option) => {
                                            if(option.value == formValues.gender) {
                                                return <option value={option.value} selected>{option.label}</option>
                                            } else {
                                                return <option value={option.value}>{option.label}</option>
                                            }
                                        })}
                                    </select>
                                </span>
                            </div>

                            <div className={styles.formLine}>
                                <span className={[styles.inputSpan, styles.inputSpanEntireLine].join(" ")}>
                                    <label htmlFor="bio">Bio</label>
                                    <textarea onChange={handleTextAreaChange} name="bio" id="bio" cols={30} rows={10} defaultValue={formValues.bio_text as string}></textarea>
                                </span>
                            </div>
                        </div>

                        <span>
                            <button className={styles.submitFormButton} type="submit">Save</button>
                        </span>
                    </form>

                    {session.user.provider == "credentials" ?
                        <form onSubmit={handleUpdatePassword}>
                            <div className={styles.formGroup}>
                                <h2>Update password</h2>

                                <div className={styles.formLine}>
                                    <span className={styles.inputSpan}>
                                        <label htmlFor="newpassword">New Password</label>
                                        <input type="password" name="newpassword" id="newpassword" onChange={handlePasswordChange}/>
                                    </span>
                                    <span className={styles.inputSpan}>
                                        <label htmlFor="repeatnewpassword">Repeat New Password</label>
                                        <input type="password" name="repeatnewpassword" id="repeatnewpassword" onChange={handlePasswordChange}/>
                                    </span>
                                </div>
                                
                                <div className={styles.horizontalBar}></div>
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