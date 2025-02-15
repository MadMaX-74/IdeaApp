import cn from 'classnames';
import styles from './index.module.scss';

export type ButtonProps = {
    children: React.ReactNode;
    loading?: boolean;
};

export const SubmitButton = ({children, loading = false}: ButtonProps) => { 
    return <button className={cn({[styles.button]: true, [styles.disabled]: loading, [styles.loading]: loading})} disabled={loading} type='submit'>
        <span className={styles.text}>
            {children}
        </span>
    </button>;
}