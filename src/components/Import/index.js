/**
 * 导入组件
 * props:
 * action: 导入链接
 * successContent: 成功提示内容
 * ImportSuccess: 导入成功回调
 */
import React from 'react'
import { UploadOutlined } from '@ant-design/icons';
import { Upload, Button, Modal, message } from 'antd'
import styles from './index.less'

class Export extends React.Component {
  render() {
    const {
      action,
      ImportSuccess,
      name,
      successContent,
      isBtn=true
    } = this.props
    const uploadProps = {
      action: `/admin${action}`,
      showUploadList: false,
      onChange: ({ file }) => {
        const { response } = file
        if (response) {
          if (response.code === 0) {
            Modal.success({
              title: '导入成功',
              content: successContent
                ? successContent(response.data)
                : `成功导入${response.data.success_num}数据`,
              onOk() {
                ImportSuccess && ImportSuccess(response.data)
              },
            })
            return
          }
          Modal.error({
            title: '导入失败',
            content: `${response.message}`,
          })
        }
      },
    }
    return isBtn?
  <div className={styles.templateImport}>
    <Upload {...uploadProps}>
      <Button icon={<UploadOutlined />} type="primary" className="mr10">
        {name || '导入'}
      </Button>
    </Upload>
  </div>
  :
  <Upload {...uploadProps}>
      <div style={{width:100}}> {name || '导入'}</div>
    </Upload>;
  }
}
export default Export
