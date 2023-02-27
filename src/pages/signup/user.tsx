import styles from '@/styles/signup/user.module.css'
import Image from 'next/image'

import LeftImage from '../../../public/signup/left.png'

export default function signUpUser () {
    return (
        <main className={styles.main}>
            <div className={styles.left}>
                <Image src={LeftImage} alt="signup"/>
            </div>

            <div className={styles.right}>
                <div className={styles.holder}>
                    <form className={styles.formArea}>
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

                        <div className={styles.formLine}>
                            <span className={styles.inputSpan}>
                                <label htmlFor="birthday">Birthday:</label>
                                <input type="date" name="birthday" placeholder="Birthday" className={styles.inputSpace}/>
                            </span>
                        </div>

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

                        <div className={styles.formLine}>
                            <span className={styles.inputSpan}>
                                <label htmlFor="email">Email:</label>
                                <input type="email" name="email" placeholder="Email" className={styles.inputSpace}/>
                            </span>
                        </div>

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