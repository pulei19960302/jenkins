import React from 'react'
import { Col, Row, Divider, Spin } from 'antd'
import { connect } from 'dva'
import { Page, PageTitle } from 'components'
import Role from './component/Roles'
import CheckPermission from './component/CheckPermission'
import styles from './index.less'

@connect(({ security, loading }) => ({ ...security, loading }))
class Security extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }

  componentDidMount(){
    const { dispatch } = this.props
    dispatch({ type: 'security/getPermissionTree' }).then(_ => {
      dispatch({ type: 'security/getRolesList' })
    })
  }

  toggleLoading = () => {
    this.setState((prevState) => ({
      loading: !prevState.loading
    }))
  }

  render() {
    const {
      roles,
      selectedRole,
      dispatch,
      details,
      loading,
    } = this.props

    const loadSpin = loading.effects[`security/createRole`]
      || loading.effects[`security/deleteRole`]
      || loading.effects[`security/updateRole`]
      || loading.effects[`security/updateRolesList`]
      || loading.effects[`security/getRolesList`]

    return (
      <Page className={styles.page}>
        {
          loadSpin && (
            <div className={styles.loading}>
              <Spin />
            </div>
          )
        }
        <div className={styles.container}>
          <div className={styles.left}>
            <Role
              roles={roles}
              selectedRole={selectedRole}
              dispatch={dispatch} />
          </div>
          <div className={styles.right}>
            <CheckPermission
              details={details}
              selectedRole={selectedRole}
              dispatch={dispatch}
            />
          </div>
        </div>
      </Page>
    )
  }
}

export default Security