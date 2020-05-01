import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Modal } from 'antd'
import { PreviewImg } from 'components'
import styles from './index.less'

@connect(({ loading }) => ({ loading }))
class BrandsDetails extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      detailsData: {},
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      this.props.brandsData !== nextProps.brandsData &&
      nextProps.brandsData !== undefined
    ) {
      const detailsData = nextProps.brandsData
      this.setState({
        detailsData,
      })
    }
  }
  handleCancel = () => {
    this.props.details(false)
  }
  render() {
    const { visible } = this.props
    const { detailsData } = this.state
    return (
      <Modal
        title="品牌详情"
        visible={visible}
        onCancel={this.handleCancel}
        footer={null}
      >
        <div className="clearfix">
          <div className="clearfix">
            <p className={styles.details_title}>排序：</p>
            <p className={styles.details_content}>{detailsData.sort}</p>
          </div>
          <div className="clearfix">
            <p className={styles.details_title}>品牌名称：</p>
            <p className={styles.details_content}>{detailsData.name}</p>
          </div>
          <div className="clearfix">
            <p className={styles.details_title}>品牌别名：</p>
            <p className={styles.details_content}>{detailsData.alias}</p>
          </div>
          <div className="clearfix">
            <p className={styles.details_title}>品牌LOGO：</p>
            <p className={styles.details_content}>
              <img
                src={detailsData.logo}
                alt=""
                width="100"
                onClick={() => {
                  PreviewImg({ imgUrl: detailsData.logo })
                }}
              />
            </p>
          </div>
          <div className="clearfix">
            <p className={styles.details_title}>品牌描述：</p>
            <p className={styles.details_content}>{detailsData.description}</p>
          </div>
        </div>
      </Modal>
    )
  }
}
export default BrandsDetails
