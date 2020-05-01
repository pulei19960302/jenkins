import styles from './index.less'
import { CloseCircleFilled } from '@ant-design/icons';
export default function({children,onDel,all,item,index}){
    const del = ()=>{
        const copy = all.slice(0)
        copy.splice(index,1)
        onDel(copy)
    }
    return (
        <div className={styles.chooseCouponItem}>
            {
                onDel && <CloseCircleFilled onClick={del} className="icon" />
            }
            <span style={{whiteSpace:"nowrap",overflow:"hidden",textOverflow:'ellipsis'}}>{children}</span>
        </div>
    );
}