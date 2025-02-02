import cn from 'classnames';
import styles from './index.module.scss';

export type AlertProps = {color: 'red' | 'green' | 'yellow', children: string, hidden?: boolean}

export const Alert = ({color, children, hidden} : AlertProps) => {
    if (hidden) {
        return null
    }
    return (
        <div className={cn(styles.alert, styles[color])}>
            {children}
        </div>
    )
}