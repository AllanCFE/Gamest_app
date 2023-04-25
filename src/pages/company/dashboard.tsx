import StandardBlockDivision from 'components/StandardBlockDivision/StandardBlockDivision'

import styles from '../../styles/company/Dashboard.module.css'
import Image from 'next/image'
import userRequireAuth from 'components/useRequireAuth/useRequireAuth'
import { useEffect, useState } from 'react';

export default function Dashboard () {

    // Retrieve data from API via POST request
    const [data, setData] = useState<object | null>(null);
    const [isLoading, setLoading] = useState(false);
    const session = userRequireAuth();
    
    useEffect(() => {
        if(typeof session != 'undefined') {
            setLoading(true);
            fetch('http://127.0.0.1:5001/gamest-app/us-central1/getVacancys', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: session?.user?.uid })
            })
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
        }
        
    }, [session])

    if (!session) return <div>Loading...</div>

    return (
        <>
        <StandardBlockDivision 
            leftChildren={
                <>
                    <div className={styles.companyTop}>
                        <span className={styles.companyLogo}>
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

                </>
            }
            rightChildren={
                <>
                    {isLoading ? 
                        <div>Loading</div>
                        :
                        <>
                            {Object.keys(data ?? {}).map((vacancy: any, index: any) => (
                                <div className={styles.vacancyArea} key={index}>
                                    <div className={styles.vacancyRight}>
                                        <span className={styles.calendar}>
                                            <Image src="https://i.imgur.com/ICodYAI.png" alt="calendar" width={150} height={150} />
                                        </span>
                                        <div className={styles.vacancyDescription}>
                                            <h2>{vacancy.title}</h2>
                                            <div className={styles.vacancyOptions}>
                                                <div className={styles.vacancyOptionsLine}>
                                                    <p>Location: </p>
                                                    <p>Salary: </p>
                                                    <p>Experience: </p>
                                                </div>
                                                <div className={[styles.vacancyOptionsLine, styles.vacancyOptionValue].join(" ")}>
                                                    <p>{vacancy.location}</p>
                                                    <p>${vacancy.salary}</p>
                                                    <p>{vacancy.experience} years</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.vacancyLeft}>
                                        <span className={styles.editButton}>Edit</span>
                                        <span className={styles.deleteButton}>Delete</span>
                                    </div>
                                </div>
                            ))}
                        </>
                    }
                </>
            }
        />
                
                
        </>
    )
}

