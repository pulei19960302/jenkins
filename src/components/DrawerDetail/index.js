/**
 * 详情侧滑组件
 * props:
 * onCancel 取消回调 dataSource 传入的详情数据
 */

import React, { PureComponent } from 'react'
import { Drawer, Descriptions, Divider } from 'antd'
import { PreviewImg } from 'components'
import styles from './index.less'

export default class DrawerDetail extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: {},
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.dataSource &&
      this.props.dataSource !== nextProps.dataSource
    ) {
      this.setState({
        dataSource: nextProps.dataSource,
      })
    }
  }
  onClose = () => {
    this.props.close(false)
  }
  render() {
    const { visible, detailsFields } = this.props
    const { dataSource } = this.state
    return (
      <Drawer
        title="详情"
        placement="right"
        onClose={this.onClose}
        visible={visible}
        width={800}
      >
        <div className={styles.details_box}>
          {detailsFields &&
            detailsFields.map(firItem => {
              return (
                <div key={firItem.key}>
                  <Descriptions title={firItem.title} column={2}>
                    {firItem.content.map(secItem => {
                      return (
                        <Descriptions.Item label={secItem.titleName} key={secItem.key}>
                          {secItem.type ? (
                            <div>
                              {
                                dataSource[secItem.dataField] && dataSource[secItem.dataField].map((imgItem, index) => {
                                  return (
                                    <img
                                      key={index}
                                      src={imgItem}
                                      onClick={() => {
                                        PreviewImg({
                                          imgUrl: imgItem
                                        })
                                      }}
                                      alt=""
                                      className={styles.content_imgList}
                                    />
                                  )
                                })
                              }
                            </div>
                          ) : (
                              <span dangerouslySetInnerHTML={{ __html: dataSource[secItem.dataField] }}></span>
                            )}
                        </Descriptions.Item>
                      )
                    })}
                  </Descriptions>
                  <Divider />
                </div>
              )
            })}
        </div>
      </Drawer>
    )
  }
}
