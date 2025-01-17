import styles from './index.module.css';

export const FormItems = ({ children }: { children: React.ReactNode }) => {
     return <div className={styles.formItems}>{children}</div>;
    };