import cn from 'classnames';
import styles from './index.module.scss';

export type ButtonProps = {
    children: React.ReactNode;
    loading?: boolean;
};  

export const SubmitButton = ({children, loading = false}: ButtonProps) => { 
    return <button className={cn(styles.button)} disabled={loading} type='submit'>{loading ? 'Loading...' : children}</button>;
}   