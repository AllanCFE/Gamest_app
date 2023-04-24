import StandardBlockDivision from 'components/StandardBlockDivision/StandardBlockDivision'

import styles from '../../styles/company/Dashboard.module.css'
import Image from 'next/image'
import userRequireAuth from 'components/useRequireAuth/useRequireAuth'
import { useEffect, useState } from 'react';

export default function Dashboard () {

    const session = userRequireAuth();
    if (!session) return <div>Loading...</div>

    // Retrieve data from API via POST request
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch('/api/company/dashboard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: session?.user?.id })
        })
        .then(res => res.json())
        .then(data => {
            setData(data);
            setLoading(false);
        })
        
    }, [])

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
                        <div>Failed to load</div>
                        :
                        <div>Teste</div>    
                    }
                </>
            }
        />
                
                
        </>
    )
}

