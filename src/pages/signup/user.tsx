import styles from '@/styles/signup/user.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router';
import countries from 'countries-list';

import LeftImage from '../../../public/signup/left.png'

export default function SignUpUser () {
    const router = useRouter();

    return (
        <main className={styles.main}>
            <div className={styles.left}>
                <Image src={LeftImage} alt="signup"/>
            </div>

            <div className={styles.right}>
                <div className={`${styles.holder}  ${router.query.provider == 'credentials' ? "" : styles.holderNoC}`}>
                    <form className={styles.formArea}>

                        {router.query.provider == 'credentials' ?
                            <div className={styles.formLine}>
                                <span className={styles.inputSpan}>
                                    <label htmlFor="name">Name:</label>
                                    <input type="text" name="name" placeholder="Name" className={styles.inputSpace}/>
                                </span>
                                <span className={styles.inputSpan}>
                                    <label htmlFor="surname">Surname:</label>
                                    <input type="text" name="surname" placeholder="Surname" className={styles.inputSpace}/>
                                </span>
                            </div>
                        : ""}
                        

                        <div className={styles.formLine}>
                            <span className={styles.inputSpan}>
                                <label htmlFor="birthday">Birthday:</label>
                                <input type="date" name="birthday" placeholder="Birthday" className={styles.inputSpace}/>
                            </span>
                            <span className={styles.inputSpan}>
                                <label htmlFor="country">Country:</label>
                                <select name="country" className={styles.inputSpace}>
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
                                    <input type="password" name="password" placeholder="Password" className={styles.inputSpace}/>
                                </span>
                                <span className={styles.inputSpan}>
                                    <label htmlFor="confirmpassword">Confirm Password:</label>
                                    <input type="password" name="confirmpassword" placeholder="Confirm Password" className={styles.inputSpace}/>
                                </span>
                            </div>
                        :""}
                        
                        {router.query.provider == 'credentials' ?
                            <div className={styles.formLine}>
                                <span className={styles.inputSpan}>
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" name="email" placeholder="Email" className={styles.inputSpace}/>
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