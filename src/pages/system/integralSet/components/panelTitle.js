import { QuestionCircleOutlined } from '@ant-design/icons';
import { Switch, Popover } from 'antd';
import styles from './panelTitle.less'
import XSwitch from './xSwitch'

export default function ({ title, help, onChange, desc, defaultChecked }) {
  const content = <div>{help}</div>
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      {
        help &&
        <Popover content={content}>
          <QuestionCircleOutlined className={styles.icon} />
        </Popover>
      }

      <XSwitch
        className={styles.switch}
        onChange={onChange}
        defaultChecked={defaultChecked}
        desc={desc}
      ></XSwitch>
    </div>
  );
}
