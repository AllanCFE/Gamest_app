import Navbar from '../../../components/Navbar/Navbar'
import { signOut, getSession, useSession } from 'next-auth/react'
import styles from '../../styles/company/Dashboard.module.css'
import Image from 'next/image'

// <h1 onClick={() => signOut({ callbackUrl: '/signin' })}>Dashboard</h1>

export default function Dashboard () {
    const { data: session } = useSession()

    return (
        <div>
            <Navbar />
            <main className={styles.main}>
                <div className={styles.leftContent}>
                    <div className={styles.companyTop}>
                        <span>
                            <Image src="https://github.com/google.png" alt="Company Logo" width={200} height={200} />
                        </span>
                        <span>
                            <h2>Google</h2>
                        </span>
                    </div>
                    
                    <div className={styles.horizontalBar}></div>

                    <div className={styles.buttonsArea}>
                        <span>Button 1</span>
                        <span>Button 2</span>
                        <span>Button 3</span>
                    </div>

                </div>
                <div className={styles.rightContent}>
                    <div className={styles.vacancyArea}>
                        <div className={styles.vacancyRight}>
                            <span className={styles.calendar}>
                                <Image src="https://i.imgur.com/ICodYAI.png" alt="calendar" width={150} height={150} />
                            </span>
                            <div className={styles.vacancyDescription}>
                                <h2>Software Developer</h2>
                                <div className={styles.vacancyOptions}>
                                    <div className={styles.vacancyOptionsLine}>
                                        <p>Location: </p>
                                        <p>Salary: </p>
                                        <p>Experience: </p>
                                    </div>
                                    <div className={[styles.vacancyOptionsLine, styles.vacancyOptionValue].join(" ")}>
                                        <p>Remote</p>
                                        <p>$100,000</p>
                                        <p>5 years</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.vacancyLeft}>
                            <span className={styles.editButton}>Edit</span>
                            <span className={styles.deleteButton}>Delete</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

Dashboard.auth = true