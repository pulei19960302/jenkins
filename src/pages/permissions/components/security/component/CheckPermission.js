import { connect } from 'dva'
import React, { PureComponent } from 'react';
import { DownCircleOutlined } from '@ant-design/icons';
import { Checkbox, Row, Collapse, Divider, Button } from 'antd';
import classnames from 'classnames'
import lodash from 'lodash'
import { LinesEllipsis } from 'components'
import styles from '../index.less'

const { Panel } = Collapse
class CheckPermission extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }

  toggleLoading = () => {
    this.setState((prevState) => ({
      loading: !prevState.loading
    }))
  }

  handleSave = () => {
    const { selectedRole } = this.props
    const { details, dispatch } = this.props
    const selectedIds = []

    const returnIds = (items) => {
      items && items.forEach(el => {
        const { checked, id, children } = el
        checked && selectedIds.push(id)
        children && returnIds(children)
      })
    }

    returnIds(details)

    this.toggleLoading()
    $api.permissions.updateRolePermissions({
      role_id: selectedRole,
      route_ids: selectedIds
    }, { success: true }).then(_ => {
      this.toggleLoading()
      dispatch({
        type: 'app/queryUserInfo'
      })
    })
  }

  handleItemChecked = (e, item = {}) => {
    const { checked = false } = e && e.target
    const { dispatch } = this.props
    dispatch({
      type: 'security/updatePermissionTree',
      payload: {
        checked,
        item,
      }
    })
  }

  handleChangeAll = (e) => {
    const { checked = false } = e && e.target
    const { dispatch, details } = this.props
    const newDetails = details && lodash.cloneDeep(details)

    const changeAll = (items) => {
      items && items.forEach(el => {
        el.checked = checked
        el.children && changeAll(el.children)
      })
    }
    changeAll(newDetails)
    dispatch({
      type: 'security/updateState',
      payload: {
        details: newDetails
      }
    })
  }

  renderCollapse(details = []) {
    if (!details || !details.length) return null

    return details.map((item) => {
      const { name = '', id = '', children = [], checked = false } = item
      // const indeterminate = !checked && children && children.some(el => el.checked)

      return (
        <Collapse expandIcon={this.renderExpand} expandIconPosition="right" key={id}>
          <Panel
            header={
              <div style={{ display: 'inline-block' }} onClick={(e) => { e.stopPropagation() }}>
                <Checkbox
                  checked={checked}
                  // indeterminate={indeterminate}
                  onChange={(e) => {
                    this.handleItemChecked(e, item)
                  }}>{name}</Checkbox>
              </div>}>
            {this.renderSecondGroup(children)}
          </Panel>
        </Collapse>
      )
    })
  }

  renderSecondGroup(items = []) {
    if (!items || !items.length) return null
    const length = items.length

    return items.map((item, index) => {
      const { name = '', id = '', children = [], checked = false } = item
      // const indeterminate = !checked && children && children.some(el => el.checked)
      return (
        <div key={id}>
          <div className={styles.secondBox}>
            <Checkbox
              className={styles.secondLabel}
              checked={checked}
              // indeterminate={indeterminate}
              onChange={(e) => {
                this.handleItemChecked(e, item)
              }}>
              <LinesEllipsis text={name} maxLine="1" style={{minWidth: '50px'}}/>
            </Checkbox>
            <div className={styles.thirdBox}>
              {this.renderThirdGroup(children)}
            </div>
          </div>
          {
            index !== (length - 1) && (
              <Divider className={styles.secondDivider} />
            )
          }
        </div>
      )
    })
  }

  renderThirdGroup(items = []) {
    if (!items || !items.length) return null

    return items.map((item) => {
      const { name = '', checked = false, id = '' } = item
      return (
        <Checkbox
          key={id}
          checked={checked}
          onChange={(e) => {
            this.handleItemChecked(e, item)
          }} >
          <LinesEllipsis text={name} maxLine="1" style={{ minWidth: '50px' }} />
        </Checkbox>
      )
    })
  }

  renderExpand = (panelProps = {}) => {
    const { isActive = '' } = panelProps

    return (
      <DownCircleOutlined
        className={classnames(styles.expandIcon, {
          [styles.active]: isActive
        })} />
    );
  }

  render() {
    const { loading } = this.state
    const { details = [] } = this.props
    const checked = details && details.every(info => info.checked)
    // const indeterminate = !checked && details && details.some(info => info.checked)

    return (
      <div className={styles.permissions}>
        <div className={styles.checkAll}>
          <Checkbox
            checked={checked}
            // indeterminate={indeterminate}
            onChange={this.handleChangeAll}
          >选择全部权限</Checkbox>
        </div>
        {this.renderCollapse(details)}
        {
          $api.permissions.updateRolePermissions.permission() && (
            <Button type="primary" className={styles.save} onClick={lodash.debounce(this.handleSave, 300)} loading={loading}>保存</Button>
          )
        }
      </div>
    )
  }
}

export default CheckPermission