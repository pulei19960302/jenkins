import React from 'react'
import styles from './index.less'

// 颜色 ⚪球球
export default ({ color }) => {

    return (
        <div className={styles.colorBall} style={{ background: Array.isArray(color) ? color[color.length - 1] : color }}></div>
    )
}