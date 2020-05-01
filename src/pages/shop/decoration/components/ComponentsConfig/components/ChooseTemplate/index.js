import styles from './index.less'
import { idActive } from '../../../fields';

export default function ({ tplList, children, index, onActive, item, style, className, showCheckIcon }) {
    const onClick = () => {
        if (item.active) return
        onActive(
            idActive(tplList, item.id),
            item,
            index
        )
    }
    return (
        <div style={{ ...style }} onClick={onClick} className={`${styles.template} ${item.active ? styles.active : ''} ${className}`}>
            {children}
            {
                showCheckIcon && item.active && <img className={styles.icon} src={require('assets/shop/selected.png')} alt="" />
            }
        </div>
    )
}