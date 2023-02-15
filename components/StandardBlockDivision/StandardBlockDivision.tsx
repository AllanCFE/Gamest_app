import Navbar from 'components/Navbar/Navbar'
import styles from './StandardBlockDivision.module.css'

interface StandardLeftProps {
    leftChildren: React.ReactNode,
    rightChildren: React.ReactNode,
    leftClass?: string,
    rightClass?: string
}

export default function StandardLeft({leftChildren, rightChildren, leftClass = "", rightClass = ""}: StandardLeftProps) {
    return (
        <>
            <Navbar/>
            <main className={styles.main}>
                <div className={`${styles.leftHolder} ${leftClass}`}>
                    {leftChildren}
                </div>
                <div className={`${styles.rightHolder} ${rightClass}`}>
                    {rightChildren}
                </div>
            </main>
        </>
    )
}               