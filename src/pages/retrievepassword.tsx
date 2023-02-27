import styles from '@/styles/RetrievePassword.module.css';

import Image from "next/image";


import GamestLogo from '../../public/Logos/Gamest.png'
import loginImage from '../../public/login_img.png'

export default function RetrievePassword() {

  return (
    <>
      <div className={styles.holder}>
        
        <div className={styles.left}>
            <div className={styles.logo}>
                <Image src={GamestLogo} alt="logo" style={{objectFit: 'contain', maxHeight: '8vh'}}/>
            </div>

            <div className={[styles.form, styles.hide].join(" ")}>
                <h1 className={styles.centralText}>Forgot my password <span style={{whiteSpace: 'nowrap'}}>:(</span></h1>
                <form>

                <div className={styles.inputDiv}>
                    <label htmlFor="email" className={styles.label}>
                    Email:
                    </label>
                    <input
                    type="email"
                    name="email"
                    placeholder="email@example.com"
                    className={styles.inputSpace}
                    />
                </div>

                <div className={styles.buttonarea}>
                    <button className={styles.loginButton} type="submit">Submit</button>
                </div>

                </form>
            </div>

            <div className={[styles.form, styles.sentMail].join(" ")}>
                <h1 className={styles.centralText}>One step closer to retrieve your password <span style={{whiteSpace: 'nowrap'}}>:)</span></h1>
                <p>E-Mail sent to your mailbox. Be sure to check your spam folder.</p>
            </div>

        </div>
            
        <div className={styles.right}>
            <Image src={loginImage} alt="login_image" style={{objectFit: 'fill', maxWidth: '100%', maxHeight: '100%'}}/>
        </div>

      </div>

      <div className={styles.boxShadow}></div>
    </>
  )
}