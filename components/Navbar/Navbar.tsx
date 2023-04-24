import styles from './Navbar.module.css'
import GamestLogo from '../../public/Logos/Gamest.png'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import useRequireAuth from 'components/useRequireAuth/useRequireAuth'

export default function Navbar () {
    const router = useRouter();
    const userType = router.pathname[1]
    const session = useRequireAuth();

    const avatar = session?.user?.image || '/Default/Default_Avatar.png';

    return (
        <nav className={styles.nav}>
            <span className={styles.logo}>
                <Image src={GamestLogo} alt="Gamest" />
            </span>

            <span className={styles.menuOptions}>
                <div className={styles.dropdownArea}>
                    <div className={[styles.option, styles.profilePicture].join(' ')}>
                        <Image src={avatar} width={50} height={50} alt="Profile Picture" />
                        <div className={styles.rightProfilePicture}>
                            <div className={styles.notification}></div>
                            <div className={styles.arrowDown}></div>
                        </div>
                    </div>
                    <ul className={styles.dropdownContent}>
                        {userType == 'c' ? 
                            <>
                                <Link href='/company/dashboard'> <li className={styles.dropdownItem}> Dashboard </li> </Link>
                                <Link href='/company/editprofile'><li className={styles.dropdownItem}>Settings</li></Link>
                                <Link href='/company/cart'><li className={styles.dropdownItem}>Cart</li></Link>
                                <Link href='/company/saved'><li className={styles.dropdownItem}>Saved</li></Link>
                                <Link href='/company/searchprofile'><li className={styles.dropdownItem}>Search</li></Link>
                            </>
                            : 
                            <>
                                <Link href='/user/dashboard'> <li className={styles.dropdownItem}> Dashboard </li> </Link>
                                <Link href='/user/searchjob'><li className={styles.dropdownItem}>Search</li></Link>
                                <span className={[styles.horizontalBar, styles.dropdownItem].join(" ")}></span>
                                <Link href='/user/editprofile'><li className={styles.dropdownItem}>Settings</li></Link>
                                <Link href='/user/editprofessionalprofile'>  <li className={styles.dropdownItem}>Professional settings</li> </Link>
                            </>}
                        <span className={[styles.horizontalBar, styles.dropdownItem].join(" ")}></span>
                        <li className={[styles.dropdownItem, styles.exitButton].join(" ")} onClick={() => signOut()}>Sair</li>
                    </ul>
                </div>
                
            </span>
        </nav>
    )
}