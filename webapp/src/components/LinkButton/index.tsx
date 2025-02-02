import { Link } from "react-router-dom"
import styles from './index.module.scss'

export const LinkButton = ({ to, children }: { to: string, children: React.ReactNode }) => {
    return (
        <Link className={styles.button} to={to}>{children}</Link>
    )
}