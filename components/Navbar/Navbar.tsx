import styles from './Navbar.module.css'
import GamestLogo from '../../public/Logos/Gamest.png'
import Image from 'next/image'
import { signOut } from 'next-auth/react'

export default function Navbar () {
    return (
        <nav className={styles.nav}>
            <span className={styles.logo}>
                <Image src={GamestLogo} alt="Gamest" />
            </span>

            <span className={styles.menuOptions}>
                <div className={[styles.option, styles.alertsIcon].join(' ')}>
                    <Image src='https://i.imgur.com/p5KwmdO.png' width={50} height={50} alt="Notification" />
                    <div className={styles.rightProfilePicture}>
                        <div className={styles.notification}></div>
                    </div>
                </div>

                <div className={styles.dropdownArea}>
                    <div className={[styles.option, styles.profilePicture].join(' ')} onClick={() => signOut()}>
                        <Image src='https://github.com/AllanCFE.png' width={50} height={50} alt="Profile Picture" />
                        <div className={styles.rightProfilePicture}>
                            <div className={styles.notification}></div>
                            <div className={styles.arrowDown}></div>
                        </div>
                    </div>
                    <ul className={styles.dropdownContent}>
                        <li className={styles.dropdownItem}>Meu Perfil</li>
                        <li className={styles.dropdownItem}>Perfil da Empresa</li>
                        <li className={styles.dropdownItem}>Dashboard</li>
                        <li className={styles.dropdownItem}>Configurações</li>
                        <span className={[styles.horizontalBar, styles.dropdownItem].join(" ")}></span>
                        <li className={[styles.dropdownItem, styles.exitButton].join(" ")} onClick={() => signOut()}>Sair</li>
                    </ul>
                </div>
                
            </span>
        </nav>
    )
}