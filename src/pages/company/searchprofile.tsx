import StandardBlockDivision from 'components/StandardBlockDivision/StandardBlockDivision'

import styles from '../../styles/company/SearchProfile.module.css'
import useRequireAuth from 'components/useRequireAuth/useRequireAuth'
import Image from 'next/image'

export default function Dashboard () {    
    const session = useRequireAuth();
    if (!session) {return <div>Loading...</div>}
    
    
    return (
        <>
        <StandardBlockDivision 
            leftChildren={
                <div className={`${styles.scrollBar} ${styles.leftAreaInner}`}>
                    <div className={`${styles.baseArea}`}>
                        <h3>Areas</h3>
                        <ul className={`${styles.listSearch} ${styles.scrollBar}`}>
                            <li>Animation</li>
                            <li>Art</li>
                            <li>Audio</li>
                            <li>Design</li>
                            <li>Production</li>
                            <li>Programming</li>
                            <li>QA</li>
                            <li>Marketing</li>
                        </ul>
                    </div>

                    <div className={`${styles.baseArea}`}>
                        <h3>Tools</h3>
                        <ul className={`${styles.listSearch} ${styles.scrollBar}`}>
                            <li>Unreal Engine</li>
                            <li>Unity</li>
                            <li>Photoshop</li>
                            <li>Illustrator</li>
                            <li>Blender</li>
                            <li>Maya</li>
                            <li>C#</li>
                            <li>Python</li>
                        </ul>
                    </div>

                    <div className={`${styles.baseArea}`}>
                        <h3>Experience</h3>
                        <ul className={`${styles.listSearch} ${styles.scrollBar}`}>
                            <li>0 - 1 year</li>
                            <li>2 - 5 years </li>
                            <li>5 - 7 years</li>
                            <li>7+ years</li>
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

            leftClass={styles.leftArea}
            
            rightChildren={
                <div className={styles.scrollBar}>
                    <div className={styles.profileArea}>
                        <div className={styles.profileRight}>
                            <span className={styles.calendar}>
                                <Image src="https://i.imgur.com/ICodYAI.png" alt="calendar" width={150} height={150} />
                            </span>
                            <div className={styles.profileDescription}>
                                <div className={styles.profileHeader}>
                                    <h2>Title</h2>
                                    <p>Unity Developer</p>
                                </div>
                                <div className={styles.profileOptions}>
                                    <div className={styles.profileOptionsLine}>
                                        <p>Tools: </p>
                                        <p>Salary: </p>
                                        <p>Languages: </p>
                                    </div>
                                    <div className={[styles.profileOptionsLine, styles.profileOptionValue].join(" ")}>
                                        <p>Unity, <span>Unreal</span>, Blender</p>
                                        <p>$ 9999,99</p>
                                        <p>C#, Java</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.profileLeft}>
                            <span className={styles.cartButton}>Add to cart</span>
                            <span className={styles.saveButton}>Save profile</span>
                        </div>
                    </div>
                </div>
            }
        />
                
                
        </>
    )
}