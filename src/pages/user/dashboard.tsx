import StandardBlockDivision from 'components/StandardBlockDivision/StandardBlockDivision'

import styles from '../../styles/user/Dashboard.module.css'
import Image from 'next/image'
import useRequireAuth from 'components/useRequireAuth/useRequireAuth'
import Link from 'next/link';

export default function Dashboard () {

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
                    
                    <div className={styles.horizontalBar}></div>

                    <div className={styles.infoArea}>
                        <p><b>Age:</b> 23</p>
                        <p><b>Work model:</b> Remote / Hybrid</p>
                        <p><b>Languages:</b></p>
                        <ul>
                            <li>English (Native)</li>
                            <li>Spanish (Intermediate)</li>
                            <li>German (Basic)</li>
                        </ul>
                        <p><b>Contact:</b></p>
                        <ul>
                            <li>123456789</li>
                            <li><Link href='mailto:example@email.com'>example@email.com</Link></li>
                        </ul>
                        <span 
                        className={styles.infoAreaButton}>Edit profile</span>
                    </div>

                </>
            }
            
            rightChildren={
                <div className={styles.scrollBar}>

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
                            <span className={styles.editButton}>Responder</span>
                            <span className={styles.deleteButton}>Desistir</span>
                        </div>
                    </div>

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
                            <span className={styles.waitButton}>Aguarde</span>
                            <span className={styles.deleteButton}>Desistir</span>
                        </div>
                    </div>

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
                            <span className={styles.waitButton}>Aguarde</span>
                            <span className={styles.deleteButton}>Desistir</span>
                        </div>
                    </div>

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
                            <span className={styles.waitButton}>Aguarde</span>
                            <span className={styles.deleteButton}>Desistir</span>
                        </div>
                    </div>
                </div>
            }
        />
                
                
        </>
    )
}