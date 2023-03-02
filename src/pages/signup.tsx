import styles from '../styles/signup/signup.module.css'
import Image from 'next/image'

import LeftImage from '../../public/signup/left.png'
import CompanyImage from '../../public/signup/company.png'
import UserImage from '../../public/signup/user.png'
import Link from 'next/link'

export default function signUp () {
    return (
        <main className={styles.main}>
            <div className={styles.left}>
                <Image src={LeftImage} alt="signup"/>
            </div>

            <div className={styles.right}>
                <span className={styles.rightTitle}>
                    <h1>O que você está buscando?</h1>
                </span>
                <div className={styles.cardsArea}>
                    
                    <Link href='/signup/company'>
                        <div className={styles.card}>
                            <span>
                                <Image src={CompanyImage} alt="signup"/>
                            </span>
                            <span>
                                I’m a company looking for new talents to join my team
                            </span>
                        </div>
                    </Link>

                    <Link href='/signup/user'>
                        <div className={styles.card}>
                            <span>
                                <Image src={UserImage} alt="signup"/>
                            </span>
                            <span>
                                I’m a developer looking for new opportunities
                            </span>
                        </div>
                    </Link>
                </div>
            </div>
        </main>
    )
}