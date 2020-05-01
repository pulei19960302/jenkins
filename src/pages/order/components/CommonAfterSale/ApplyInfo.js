import { Descriptions } from 'antd'
import { PreviewImg } from 'components'
import styles from './index.less'

const ApplyInfo = ({ order }) => {
  const { img=[] } = order
  return (
    <div className={styles.blockContainer}>
      <p className={styles.blockTitle}>售后信息详情</p>
      <Descriptions column={1} bordered>
        <Descriptions.Item label="用户信息">
          {order.uid_name} {order.uid_phone}
        </Descriptions.Item>
        <Descriptions.Item label="退货原因">{order.reason_name}</Descriptions.Item>
        <Descriptions.Item label="问题描述">
          {order.description}
        </Descriptions.Item>
        <Descriptions.Item label="凭证提供">
          {
            img.map((src,index) => (
              <img
                key={index}
                src={src}
                className={styles.imgVoucher}
                onClick={() => {
                  PreviewImg({imgUrl: src})
                }}
              />
            ))
        }
        </Descriptions.Item>
      </Descriptions>
    </div>
  )
}

export default ApplyInfo
