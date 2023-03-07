import StandardBlockDivision from 'components/StandardBlockDivision/StandardBlockDivision'

import styles from '../../styles/user/SearchJob.module.css'
import useRequireAuth from 'components/useRequireAuth/useRequireAuth'
import Image from 'next/image'

export default function Dashboard () {    
    const session = useRequireAuth();
    if (!session) {return <div>Loading...</div>}
    
    
    return (
        <>
        <StandardBlockDivision 
            leftChildren={
                <div className={styles.scrollBar}>
                    <div className={`${styles.baseArea}`}>
                        <h3>Tools</h3>
                        <ul className={`${styles.listSearch} ${styles.scrollBar}`}>
                            <li>React</li>
                            <li>Next.js</li>
                            <li>Node.js</li>
                            <li>Express</li>
                            <li>PostgreSQL</li>
                        </ul>
                    </div>

                    <div className={`${styles.baseArea}`}>
                        <h3>Experience</h3>
                        <ul className={`${styles.listSearch} ${styles.scrollBar}`}>
                            <li>0 - 1 year</li>
                            <li>2 - 3 years </li>
                            <li>4 - 5 years</li>
                            <li>5+ years</li>
                        </ul>
                    </div>

                    <div className={`${styles.baseArea}`}>
                        <h3>Salary</h3>
                        <form className={styles.rangeSearch}>
                            <input type="number" placeholder='Minimum' name="minimum" />
                            <input type="number" placeholder='Maximum' name="maximum" />
                        </form>
                    </div>

                    <div className={styles.searchButton}>Search</div>
                </div>
            }
            
            rightChildren={
                <div className={styles.scrollBar}>
                    <div className={styles.vacancyArea}>
                        <div className={styles.vacancyRight}>
                            <span className={styles.calendar}>
                                <Image src="https://i.imgur.com/ICodYAI.png" alt="calendar" width={150} height={150} />
                            </span>
                            <div className={styles.vacancyDescription}>
                                <h2>Title</h2>
                                <div className={styles.vacancyOptions}>
                                    <div className={styles.vacancyOptionsLine}>
                                        <p>Location: </p>
                                        <p>Salary: </p>
                                        <p>Languages: </p>
                                    </div>
                                    <div className={[styles.vacancyOptionsLine, styles.vacancyOptionValue].join(" ")}>
                                        <p>Somewhere over the rainbow</p>
                                        <p>$ 9999,99</p>
                                        <p>Portuguese, Latin</p>
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
            }
        />
                
                
        </>
    )
}