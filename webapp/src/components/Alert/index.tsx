import cn from 'classnames';
import styles from './index.module.scss';

type AlertProps = {color: 'red' | 'green' | 'yellow', children: string}

export const Alert = ({color, children} : AlertProps) => {
    return (
        <div className={cn(styles.alert, styles[color])}>
            {children}
        </div>
    )
}