import cn from 'classnames';
import styles from './index.module.scss';

type ButtonType = 'primary' | 'outline' | 'danger';

export type ButtonProps = {
    children: React.ReactNode;
    loading?: boolean;
    type?: ButtonType;
    onClick?: () => void;
};

export const Button = ({children, loading = false, type = 'primary', onClick}: ButtonProps) => { 
    return <button className={cn({[styles.button]: true, [styles.disabled]: loading, [styles.loading]: loading, [styles[`type-${type}`]]: true})} disabled={loading} onClick={onClick}>
        <span className={styles.text}>
            {children}
        </span>
    </button>;
}