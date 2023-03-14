import styles from './Navbar.module.css'
import GamestLogo from '../../public/Logos/Gamest.png'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

export default function Navbar () {
    return (
        <nav className={styles.nav}>
            <span className={styles.logo}>
                <Image src={GamestLogo} alt="Gamest" />
            </span>

            <span className={styles.menuOptions}>
                <div className={styles.dropdownArea}>
                    <div className={[styles.option, styles.profilePicture].join(' ')} onClick={() => signOut()}>
                        <Image src='https://github.com/AllanCFE.png' width={50} height={50} alt="Profile Picture" />
                        <div className={styles.rightProfilePicture}>
                            <div className={styles.notification}></div>
                            <div className={styles.arrowDown}></div>
                        </div>
                    </div>
                    <ul className={styles.dropdownContent}>
                        <Link href='/company/dashboard'>
                            <li className={styles.dropdownItem}>
                                Dashboard
                            </li>
                        </Link>
                        <Link href='/company/editprofile'><li className={styles.dropdownItem}>Settings</li></Link>
                        <Link href='/company/cart'><li className={styles.dropdownItem}>Cart</li></Link>
                        <Link href='/company/saved'><li className={styles.dropdownItem}>Saved</li></Link>
                        <Link href='/company/searchprofile'><li className={styles.dropdownItem}>Search</li></Link>
                        <span className={[styles.horizontalBar, styles.dropdownItem].join(" ")}></span>
                        <li className={[styles.dropdownItem, styles.exitButton].join(" ")} onClick={() => signOut()}>Sair</li>
                    </ul>
                </div>
                
            </span>
        </nav>
    )
}