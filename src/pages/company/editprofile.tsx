import StandardBlockDivision from 'components/StandardBlockDivision/StandardBlockDivision'

import styles from '../../styles/company/EditProfile.module.css'
import Image from 'next/image'
import useRequireAuth from 'components/useRequireAuth/useRequireAuth'
import countries from 'countries-list'

import DefaultAvatar from '../../../public/Default/Default_Avatar.png'

export default function EditProfile () {

    const session = useRequireAuth();
    if (!session) return <div>Loading...</div>

    console.log(session)

    const avatar = session?.user?.image || DefaultAvatar;

    return (
        <>
        <StandardBlockDivision 
            leftChildren={
                <>
                    <div className={styles.companyTop}>
                        <span className={styles.companyLogo}>
                            <Image src={avatar} alt="Company Logo" width={200} height={200} />
                        </span>
                        <span>
                            <h2>Allan Echeverria</h2>
                        </span>
                    </div>

                </>
            }

            leftClass={styles.leftHolder}
            rightClass={styles.rightHolder}
            
            rightChildren={
                <div className={styles.scrollBar}>

                    <form className={styles.form}>
                        <div className={styles.formGroup}>
                            <h2>Informações Básicas</h2>
                            <div className={styles.formLine}>
                                <span className={styles.inputSpan}>
                                    <label htmlFor="name">Company Name</label>
                                    <input type="text" name="name" id="name" defaultValue={session?.user?.companyname}/>
                                </span>

                                <span className={styles.inputSpan}>
                                    <label htmlFor="country">Country</label>
                                    <select name="country" id="country">
                                        <option value={session?.user?.country}>{session?.user?.country}</option>
                                        {Object.keys(countries.countries).map((id) => {
                                            const countryObj = (countries.countries as any)[id]
                                            const countryName = (countryObj.name as string)
                                            return <option key={id} value={countryName}>{countryName}</option>
                                        })}
                                    </select>
                                </span>
                            </div>

                            <div className={styles.formLine}>
                                <span className={styles.inputSpan}>
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name="email" id="email" defaultValue={ session?.user?.email as string }/>
                                </span>
                            </div>

                            <div className={styles.horizontalBar}></div>
                        </div>

                        <div className={styles.formGroup}>
                            <h2>Additional Information</h2>
                            <div className={styles.formLine}>
                                <span className={styles.inputSpan}>
                                    <label htmlFor="cellphone">Cellphone</label>
                                    <input type="text" name="cellphone" id="cellphone" />
                                </span>

                                <span className={styles.inputSpan}>
                                    <label htmlFor="employees">Number of employees</label>
                                    <input type="number" name="employees" id="employees" />
                                </span>
                            </div>
                            <div className={styles.horizontalBar}></div>
                        </div>

                        <div className={styles.formGroup}>
                            <h2>Responsible</h2>
                            
                            <div className={styles.formLine}>
                                <span className={styles.inputSpan}>
                                    <label htmlFor="responsiblename">Name</label>
                                    <input type="text" name="responsiblename" id="responsiblename" defaultValue={session?.user?.username} />
                                </span>
                                <span className={styles.inputSpan}>
                                    <label htmlFor="responsibleemail">Email</label>
                                    <input type="email" name="responsibleemail" id="responsibleemail" defaultValue={session?.user?.email as string}/>
                                </span>
                            </div>
                        </div>

                        <span>
                            <button className={styles.submitFormButton} type="submit">Save</button>
                        </span>
                    </form>

                    <form>
                        <div className={styles.formGroup}>
                            <h2>Update password</h2>

                            <div className={styles.formLine}>
                                <span className={styles.inputSpan}>
                                    <label htmlFor="currentpassword">Current Password</label>
                                    <input type="password" name="currentpassword" id="currentpassword" />
                                </span>

                            </div>

                            <div className={styles.formLine}>
                                <span className={styles.inputSpan}>
                                    <label htmlFor="newpassword">New Password</label>
                                    <input type="password" name="newpassword" id="newpassword" />
                                </span>
                                <span className={styles.inputSpan}>
                                    <label htmlFor="repeatnewpassword">Repeat New Password</label>
                                    <input type="password" name="repeatnewpassword" id="repeatnewpassword" />
                                </span>
                            </div>
                            
                            <div className={styles.horizontalBar}></div>
                        </div>
                    </form>
                    
                </div>
            }
        />
                
                
        </>
    )
}