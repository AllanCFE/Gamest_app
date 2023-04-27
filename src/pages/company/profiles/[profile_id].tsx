import StandardBlockDivision from 'components/StandardBlockDivision/StandardBlockDivision'

import styles from '../../../styles/company/profiles/UserProfile.module.css'
import Image from 'next/image'
import useRequireAuth from 'components/useRequireAuth/useRequireAuth'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import DefaultAvatar from '../../../../public/Default/Default_Avatar.png'

export default function UserProfile () {

    const session = useRequireAuth();
    const router = useRouter();
    const { profile_id } = router.query;

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
        programming_languages: {
            language: string;
            experience: number;
        }[];
        workModel: string;
        tools: {
            tool: string;
            experience: number;
        }[];
        image: string;
        professional_history: {
            company: string;
            current_work: boolean;
            description: string;
            end_date: number;
            start_date: number;
            title: string;
        }[];
        initials: string;
        name: string;
    }

    // Retrieve data from API via POST request
    const [profileInfo, setProfileInfo] = useState<ProfileInfo | null>(null);
    const [isLoading, setLoading] = useState(true);
    const [isError, setError] = useState(false);
    const [isAllowed, setAllowed] = useState(false);
    const [isChecked, setChecked] = useState(false);

    useEffect(() => {
        if(typeof session != 'undefined' && profile_id != undefined) {

            // First check if the user is allowed to access this profile
            fetch('https://us-central1-gamest-app.cloudfunctions.net/checkAllowedProfile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ u_id: profile_id, c_id: session?.user?.uid })
            })
            .then(res => res.json())
            .then(data => {
                // If there is an error, set error to true
                if(data.error) {
                    setError(true);
                    return;
                }
                // If there is no error, set isAllowed to data
                setAllowed(data);
                setChecked(true);
            })
        }
    }, [session]);

    useEffect(() => {
        if(isChecked) {
            if(isAllowed && profile_id != undefined) {
                // If the user is allowed, retrieve the profile info
                fetch('https://us-central1-gamest-app.cloudfunctions.net/getAllowedProfile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: profile_id })
                })
                .then(res => res.json())
                .then(data => {
                    // If there is an error, set error to true
                    if(data.error) {
                        setError(true);
                        setLoading(false);
                        return;
                    }
                    // If there is no error, set profileInfo to data
                    setProfileInfo(data);
                    setLoading(false);
                })
            } else if (profile_id != undefined) {
                fetch('https://us-central1-gamest-app.cloudfunctions.net/getBlockedProfile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: profile_id })
                })
                .then(res => res.json())
                .then(data => {
                    // If there is an error, set error to true
                    if(data.error) {
                        setError(true);
                        setLoading(false);
                        return;
                    }
                    // If there is no error, set profileInfo to data
                    setProfileInfo(data);
                    setLoading(false);
                })
            }
        }
    }, [isChecked, isAllowed]);
    
    if (!session || isLoading) return <div>Loading...</div>
    if (isError) return (
        <div className={styles.notAvailableArea}>Profile not available</div>
    )

    const avatar = profileInfo?.image ? profileInfo.image : DefaultAvatar;
    
    return (
        <>
        <StandardBlockDivision 
            leftChildren={
                <>
                    <div className={styles.companyTop}>
                        <span className={`${styles.companyLogo} ${isAllowed ? "" : styles.blocked}`}>
                            <Image src={avatar} alt="Company Logo" width={200} height={200} />
                        </span>
                        <span>
                            <h2>{isAllowed ? profileInfo?.name : profileInfo?.initials }</h2>
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
                        <p><b>Work model:</b> {
                                    profileInfo?.workModel != null ?
                                    profileInfo?.workModel
                                    :
                                    "None"
                        }</p>
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
                        {
                            isAllowed ?
                            <>
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
                            </>
                            :
                            <>
                                <div className={styles.buyProfileButton}>
                                    Add to cart
                                </div>
                            </>
                        }
                    </div>

                </>
            }

            rightClass={styles.rightArea}
            
            rightChildren={
                <>
                    <div className={styles.aboutArea}>
                        <h2>About</h2>
                        <p>{profileInfo?.about != undefined && profileInfo?.about != null && profileInfo?.about}</p>
                    </div>
                    <div className={`${styles.skillsArea} ${styles.scrollBar}`}>
                        <h3>Programming Languages</h3>
                        <div className={styles.skillsLine}>
                            {
                                // Show all programming languages
                                profileInfo?.programming_languages != null && profileInfo?.programming_languages.length >= 1 ?
                                    profileInfo?.programming_languages.map((language, index) => {
                                        return (
                                            isAllowed ?
                                            <div key={index} className={styles.toolArea}>
                                                <span>
                                                    <b>{language.language}</b>
                                                </span>
                                                <span className={styles.experienceTimeArea}>
                                                    {language.experience} year(s)
                                                </span>
                                            </div>
                                            :
                                            index <= 2 ?
                                            <div key={index} className={styles.toolArea}>
                                                <span>
                                                    <b>{language.language}</b>
                                                </span>
                                                <span className={styles.experienceTimeArea}>
                                                    {language.experience} year(s)
                                                </span>
                                            </div>
                                            :
                                            <div key={index} className={`${styles.toolArea} ${styles.blocked}`}>
                                                <span>
                                                    <b>{language.language}</b>
                                                </span>
                                                <span className={styles.experienceTimeArea}>
                                                    {language.experience} year(s)
                                                </span>
                                            </div>
                                        )
                                    })
                                :
                                "None available"
                            }
                        </div>

                        <h3>Engines and Tools</h3>
                        <div className={styles.skillsLine}>
                            {
                                // Show all tools
                                profileInfo?.tools != null && profileInfo?.tools.length >= 1 ?
                                    profileInfo?.tools.map((tool, index) => {
                                        return (
                                            isAllowed ?
                                            <div key={index} className={styles.toolArea}>
                                                <span>
                                                    <b>{tool.tool}</b>
                                                </span>
                                                <span className={styles.experienceTimeArea}>
                                                    {tool.experience} year(s)
                                                </span>
                                            </div>
                                            :
                                            index <= 2 ?
                                            <div key={index} className={styles.toolArea}>
                                                <span>
                                                    <b>{tool.tool}</b>
                                                </span>
                                                <span className={styles.experienceTimeArea}>
                                                    {tool.experience} year(s)
                                                </span>
                                            </div>
                                            :
                                            <div key={index} className={`${styles.toolArea} ${styles.blocked}`}>
                                                <span>
                                                    <b>{tool.tool}</b>
                                                </span>
                                                <span className={styles.experienceTimeArea}>
                                                    {tool.experience} year(s)
                                                </span>
                                            </div>
                                        )
                                    })
                                :
                                "None available"
                            }
                        </div>

                        <h3>Professional History</h3>
                        <div className={styles.historyArea}>
                            {
                                profileInfo?.professional_history != null && profileInfo?.professional_history.length >= 1 ?
                                    profileInfo?.professional_history.map((history, index) => {
                                        return (
                                            isAllowed ?
                                            <div key={index} className={styles.historyItem}>
                                                <div className={styles.historyItemHeader}>
                                                    <span className={styles.historyTitle}><h4>{history.title}</h4></span>
                                                    <span><b>{history.company}</b> | <span className={styles.historyDataFrame}>{history.start_date} - {history.current_work ? "Current" : history.end_date}</span></span>
                                                    
                                                </div>
                                                <div className={styles.historyItemBody}>
                                                    <span><p>{history.description}</p></span>
                                                </div>
                                            </div>
                                            :
                                            <div key={index} className={`${styles.historyItem} ${styles.blocked}`}>
                                                <div className={styles.historyItemHeader}>
                                                    <span className={styles.historyTitle}><h4>{history.title}</h4></span>
                                                    <span><b>{history.company}</b> | <span className={styles.historyDataFrame}>{history.start_date} - {history.current_work ? "Current" : history.end_date}</span></span>
                                                    
                                                </div>
                                                <div className={styles.historyItemBody}>
                                                    <span><p>{history.description}</p></span>
                                                </div>
                                            </div>
                                        )
                                    })
                                :
                                "None available"
                            }
                        </div>
                    </div>
                </>
            }
        />
                
                
        </>
    )
}