import StandardBlockDivision from 'components/StandardBlockDivision/StandardBlockDivision'

import styles from '../../styles/company/Saved.module.css'
import Image from 'next/image'
import userRequireAuth from 'components/useRequireAuth/useRequireAuth'
import { useRouter } from 'next/router';

export default function Saved () {

    const router = useRouter();
    console.log(router)
    const session = userRequireAuth();
    if (!session) return <div>Loading...</div>

    return (
        <>
        <StandardBlockDivision 
            leftChildren={
                <>
                </>
            }

            leftClass={styles.leftHide}

            rightClass={styles.rightClass}

            rightChildren={
                <>
                    <div className={styles.tabSelector}>
                        <span className={`${styles.tabItem}`}>Cart</span>
                        <span className={`${styles.tabItem} ${styles.tabSelected}`}>Saved</span>
                    </div>
                    <div className={styles.profilesHolder}>
                        <div className={styles.vacancyArea}>
                            <div className={styles.vacancyRight}>
                                <span className={styles.calendar}>
                                    <Image src="https://github.com/AllanCFE.png" alt="calendar" width={150} height={150} />
                                </span>
                                <div className={styles.vacancyDescription}>
                                    <h2>A.E.</h2>
                                    <p>Architectural Engineer</p>
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
                                <span className={styles.cartButton}>Add to cart</span>
                                <span className={styles.deleteButton}>Delete</span>
                            </div>
                        </div>
                    </div>
                </>
            }
        />
                
                
        </>
    )
}