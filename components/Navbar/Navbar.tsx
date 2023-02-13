import styles from './Navbar.module.css'

export default function Navbar () {
    return (
        <nav className={styles.nav}>
            <span className={styles.logo}>
                Logo
            </span>

            <span className={styles.menuOptions}>
                <div className={[styles.option].join(' ')}>
                    Notificações
                </div>
                <div className={[styles.option].join(' ')}>
                    Perfil
                </div>
            </span>
        </nav>
    )
}