import StandardBlockDivision from 'components/StandardBlockDivision/StandardBlockDivision'

import styles from '../../styles/user/Dashboard.module.css'
import Image from 'next/image'
import useRequireAuth from 'components/useRequireAuth/useRequireAuth'
import Link from 'next/link';

import DefaultAvatar from '../../../public/Default/Default_Avatar.png'
import { useEffect, useState } from 'react';
import { profile } from 'console';

export default function Dashboard () {

    const session = useRequireAuth();
    
    
    type ProfileInfo = {
        about: string;
        birthday: number;
        contact: {
            email: string;
            phone: string;
        }
        languages: string[];
        lastUpdate: {
            _seconds: number;
            _nanoseconds: number;
        };
        programming_languages: string[];
        workModel: string;
        tools: string[];
    }
    
    // Retrieve data from API via POST request
    const [profileInfo, setProfileInfo] = useState<ProfileInfo | null>(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if(typeof session != 'undefined') {
            setLoading(true);
            fetch('https://us-central1-gamest-app.cloudfunctions.net/getAllowedProfile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: session?.user?.uid })
            })
            .then(res => res.json())
            .then(data => {
                setProfileInfo(data);
                setLoading(false);
            })
        }
    }, [session]);

    
    
    if (!session) return <div>Loading...</div>
    const avatar = session.user.image ? session.user.image : DefaultAvatar;

    return (
        <>
        <StandardBlockDivision 
            leftChildren={
                <>
                    {isLoading ?
                        <div>Loading...</div>
                        :
                        <>
                            <div className={styles.companyTop}>
                                <span className={styles.companyLogo}>
                                    <Image src={avatar} alt="Company Logo" width={200} height={200} />
                                </span>
                                <span>
                                    <h2>Allan Echeverria</h2>
                                </span>
                                <span>
                                    <p className={styles.lastUpdated}>Last updated:
                                    {// Convert last update to string
                                        profileInfo?.lastUpdate != null &&
                                        new Date(profileInfo?.lastUpdate._seconds * 1000).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })
                                    }
                                    </p>
                                </span>
                            </div>
                            
                            <div className={styles.horizontalBar}></div>

                            <div className={styles.infoArea}>
                                <p><b>Age:</b> {
                                    // Convert birthday to age
                                    profileInfo?.birthday != null &&
                                    Math.floor((Date.now() - profileInfo?.birthday) / 31557600000)
                                }</p>
                                <p><b>Work model:</b> {profileInfo?.workModel} </p>
                                <p><b>Languages:</b></p>
                                <ul>
                                    {
                                        profileInfo?.languages != null && profileInfo?.languages.length > 0 ?                                        
                                            profileInfo?.languages.map((language, index) => {
                                                return <li key={index}>{language}</li>
                                            })
                                        :
                                            <li>None</li>
                                    }
                                </ul>
                                <p><b>Contact:</b></p>
                                <ul>
                                    {profileInfo?.contact != null && profileInfo?.contact.phone != null ?
                                        <li>{profileInfo?.contact.phone}</li>
                                        :
                                        <li>None</li>
                                    }
                                    {
                                        profileInfo?.contact != null && profileInfo?.contact.email != null ?
                                        <li><Link href={`mailto:${profileInfo?.contact.email}`}>{profileInfo?.contact.email}</Link></li>
                                        :
                                        <li>None</li>
                                    }
                                </ul>
                                <span 
                                className={styles.infoAreaButton}>Edit profile</span>
                            </div>
                        </>}

                </>
            }
            
            rightChildren={
                <div className={styles.scrollBar}>
                    COMING SOON
                </div>
            }
        />
                
                
        </>
    )
}