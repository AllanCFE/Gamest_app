import StandardBlockDivision from 'components/StandardBlockDivision/StandardBlockDivision'

import styles from '../../../styles/company/profiles/UserProfile.module.css'
import Image from 'next/image'
import useRequireAuth from 'components/useRequireAuth/useRequireAuth'
import Link from 'next/link';

export default function UserProfile () {

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
                    </div>

                </>
            }

            rightClass={styles.rightArea}
            
            rightChildren={
                <>
                    <div className={styles.aboutArea}>
                        <h2>About</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultricies varius blandit. Suspendisse vulputate, magna vel elementum lacinia, nunc nunc rutrum mauris, sit amet vestibulum leo turpis id felis. Fusce tempus rutrum dapibus. Nulla elementum, nisl at mattis rhoncus, sem elit efficitur elit, molestie tincidunt nulla lacus finibus nisl. Fusce elementum nibh at nulla maximus, vel aliquam tortor ultrices. Donec rutrum volutpat leo, quis rutrum ex sagittis a. </p>
                    </div>
                    <div className={`${styles.skillsArea} ${styles.scrollBar}`}>
                        <h3>Programming Languages</h3>
                        <div className={styles.skillsLine}>
                            <div className={styles.toolArea}>
                                <span>
                                    <Image src="https://i.imgur.com/cBgelzs.jpeg" alt="calendar" width={40} height={40} />
                                </span>
                                <span className={styles.experienceTimeArea}>
                                    <p>5</p>
                                    <p>years</p>
                                </span>
                            </div>
                            <div className={styles.toolArea}>
                                <span>
                                    <Image src="https://i.imgur.com/cBgelzs.jpeg" alt="calendar" width={40} height={40} />
                                </span>
                                <span className={styles.experienceTimeArea}>
                                    <p>5</p>
                                    <p>years</p>
                                </span>
                            </div>
                            <div className={styles.toolArea}>
                                <span>
                                    <Image src="https://i.imgur.com/cBgelzs.jpeg" alt="calendar" width={40} height={40} />
                                </span>
                                <span className={styles.experienceTimeArea}>
                                    <p>5</p>
                                    <p>years</p>
                                </span>
                            </div>
                        </div>

                        <h3>Engines and Tools</h3>
                        <div className={styles.skillsLine}>
                            <div className={styles.toolArea}>
                                <span>
                                    <Image src="https://i.imgur.com/cBgelzs.jpeg" alt="calendar" width={40} height={40} />
                                </span>
                                <span className={styles.experienceTimeArea}>
                                    <p>5</p>
                                    <p>years</p>
                                </span>
                            </div>
                            <div className={styles.toolArea}>
                                <span>
                                    <Image src="https://i.imgur.com/cBgelzs.jpeg" alt="calendar" width={40} height={40} />
                                </span>
                                <span className={styles.experienceTimeArea}>
                                    <p>5</p>
                                    <p>years</p>
                                </span>
                            </div>
                            <div className={styles.toolArea}>
                                <span>
                                    <Image src="https://i.imgur.com/cBgelzs.jpeg" alt="calendar" width={40} height={40} />
                                </span>
                                <span className={styles.experienceTimeArea}>
                                    <p>5</p>
                                    <p>years</p>
                                </span>
                            </div>
                        </div>

                        <h3>Professional History</h3>
                        <div className={styles.historyArea}>
                            <div className={styles.historyItem}>
                                <div className={styles.historyItemHeader}>
                                    <span className={styles.historyTitle}><h4>Unity Developer Senior</h4></span>
                                    <span><b>Ubisoft</b> | <span className={styles.historyDataFrame}>2017 - Current</span></span>
                                    
                                </div>
                                <div className={styles.historyItemBody}>
                                    <span><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultricies varius blandit. Suspendisse vulputate, magna vel elementum lacinia, nunc nunc rutrum mauris, sit amet vestibulum leo turpis id felis. Fusce tempus rutrum dapibus. Nulla elementum, nisl at mattis rhoncus, sem elit efficitur elit, molestie tincidunt nulla lacus finibus nisl. Fusce elementum nibh at nulla maximus, vel aliquam tortor ultrices. Donec rutrum volutpat leo, quis rutrum ex sagittis a. Sed commodo, nibh eget bibendum condimentum, sem sem malesuada justo, ut pretium augue libero id massa. Nullam vestibulum risus eu odio laoreet pharetra. Maecenas tincidunt neque sed arcu eleifend, sit amet lobortis lacus commodo. In hac habitasse platea dictumst. </p></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        />
                
                
        </>
    )
}