import cn from 'classnames';
import styles from './index.module.scss'
export const Loader = ({type}: {type: 'page' | 'section'}) => {
    return (
        <span className={cn(styles.loader, styles[`type-${type}`])} />
    )
}