import StandardBlockDivision from 'components/StandardBlockDivision/StandardBlockDivision'

import styles from '../../styles/user/EditProfile.module.css'
import Image from 'next/image'
import useRequireAuth from 'components/useRequireAuth/useRequireAuth'

export default function EditProfile () {

    const session = useRequireAuth();
    if (!session) return <div>Loading...</div>

    return (
        <>
        <StandardBlockDivision 
            leftChildren={
                <>
                    <div className={styles.companyTop}>
                        <span className={styles.companyLogo}>
                            <Image src="https://github.com/AllanCFE.png" alt="Company Logo" width={200} height={200} />
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

                    <form className={styles.form}>
                        <div className={styles.formGroup}>
                            <h2>Informações Básicas</h2>
                            <div className={styles.formLine}>
                                <span className={styles.inputSpan}>
                                    <label htmlFor="name">Name</label>
                                    <input type="text" name="name" id="name" />
                                </span>

                                <span className={styles.inputSpan}>
                                    <label htmlFor="surname">Surname</label>
                                    <input type="text" name="surname" id="surname" />
                                </span>
                            </div>

                            <div className={styles.formLine}>
                                <span className={styles.inputSpan}>
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name="email" id="email" />
                                </span>

                                <span className={styles.inputSpan}>
                                    <label htmlFor="birthday">Birthday</label>
                                    <input type="date" name="birthday" id="birthday" />
                                </span>
                            </div>

                            <div className={styles.horizontalBar}></div>
                        </div>

                        <div className={styles.formGroup}>
                            <h2>Update password</h2>

                            <div className={styles.formLine}>
                                <span className={styles.inputSpan}>
                                    <label htmlFor="currentpassword">Current Password</label>
                                    <input type="password" name="currentpassword" id="currentpassword" />
                                </span>

                            </div>

                            <div className={styles.formLine}>
                                <span className={styles.inputSpan}>
                                    <label htmlFor="newpassword">New Password</label>
                                    <input type="password" name="newpassword" id="newpassword" />
                                </span>
                                <span className={styles.inputSpan}>
                                    <label htmlFor="repeatnewpassword">Repeat New Password</label>
                                    <input type="password" name="repeatnewpassword" id="repeatnewpassword" />
                                </span>
                            </div>
                            
                            <div className={styles.horizontalBar}></div>
                        </div>

                        <div className={styles.formGroup}>
                            <h2>Additional Information</h2>
                            <div className={styles.formLine}>
                                <span className={styles.inputSpan}>
                                    <label htmlFor="cellphone">Cellphone</label>
                                    <input type="text" name="cellphone" id="cellphone" />
                                </span>

                                <span className={styles.inputSpan}>
                                    <label htmlFor="linkedin">Linkedin</label>
                                    <input type="text" name="linkedin" id="linkedin" />
                                </span>
                            </div>

                            <div className={styles.formLine}>
                                <span className={styles.inputSpan}>
                                    <label htmlFor="github">Github</label>
                                    <input type="text" name="github" id="github" />
                                </span>

                                <span className={styles.inputSpan}>
                                    <label htmlFor="portfolio">Portfolio</label>
                                    <input type="text" name="portfolio" id="portfolio" />
                                </span>
                            </div>

                            <div className={styles.formLine}>
                                <span className={styles.inputSpan}>
                                    <label htmlFor="localization">Localization</label>
                                    <input type="text" name="localization" id="localization" />
                                </span>
                                <span className={styles.inputSpan}>
                                    <label htmlFor="gender">Gender</label>
                                    <select name="gender" id="gender">
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                        <option value="notdeclared">Prefer not to say</option>
                                    </select>
                                </span>
                            </div>

                            <div className={styles.formLine}>
                                <span className={[styles.inputSpan, styles.inputSpanEntireLine].join(" ")}>
                                    <label htmlFor="bio">Bio</label>
                                    <textarea name="bio" id="bio" cols={30} rows={10}></textarea>
                                </span>
                            </div>
                        </div>

                        <span>
                            <button className={styles.submitFormButton} type="submit">Save</button>
                        </span>
                    </form>
                    
                </div>
            }
        />
                
                
        </>
    )
}