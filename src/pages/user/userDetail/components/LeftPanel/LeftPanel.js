import React, { PureComponent } from 'react'
import styles from './LeftPanel.less'
import { DownOutlined } from '@ant-design/icons';
import { Button, Menu, Dropdown, Avatar } from 'antd';
import { LinesEllipsis } from 'components'
import UserEdit from '@/pages/user/components/UserEdit'
import UserType from '@/pages/user/components/UserType'
import UserUpLevel from '@/pages/user/components/UserUpLevel'
import UserUpIntergral from '@/pages/user/components/UserUpIntergral'
import { getUserTypesEnum } from '../../../components/helper'
import { router, createUUID } from 'utils';

class LeftPanel extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showUserEdit: false,
      userInfo: {},
      showUserType: false,
      userTypeData: {},
      showUserLevel: false,
      userLevelData: {},
      userTypesEnum: {},
      firstInfo: [],// 直属上级
      secondInfo: [],// 直属下级
      partner: [], //合伙人
      showUserUpIntergral: false,
    }
  }
  componentDidMount() {
    this.getData()
  }
  // 地区展示
  getArea = ({ resideprovince_name, residecity_name, residecounty_name }) => {
    const temp = [resideprovince_name, residecity_name, residecounty_name]
    const area = temp.filter(el => el)
    return area.length ? area.join('-') : '--'
  }
  getData = async () => {
    const { id } = this.props
    const userTypesEnum = await getUserTypesEnum()
    this.setState({
      userTypesEnum
    })
    $api.user.userInfo({ member_id: id }).then(res => {
      this.setState({
        userInfo: res.data
      })
    })
    $api.user.userRelation({ member_id: id }).then(res => {
      const { firstInfo = [], secondInfo = [], partner = [] } = res.data
      this.setState({
        firstInfo,
        secondInfo,
        partner
      })
    })
  }
  userOperate = key => {
    switch (key) {
      case 'edit':
        this.toogleEdit(true)
        break
      case 'type':
        this.toogleUserTypeModal(true)
        break
      case 'switch':
        this.toogleUserLevelModal(true)
        break
      case 'switch_intergral':
        this.toogleUserIntergral(true)
        break
    }
  }
  // 切换用户编辑弹窗
  toogleEdit = showUserEdit => {
    this.setState({
      showUserEdit,
    })
  }
  // 切换用户类型弹窗
  toogleUserTypeModal = showUserType => {
    this.setState({
      showUserType,
    })
    const { id } = this.props
    const { member_type_id } = this.state.userInfo
    if (showUserType) {
      this.setState({
        userTypeData: {
          id,
          member_type_id
        }
      })
    }
  }
  toogleUserLevelModal = showUserLevel => {
    const { id } = this.props
    this.setState({
      showUserLevel,
    })
    if (showUserLevel) {
      this.setState({
        userLevelData: {
          id,
        }
      })
    }
  }
  toogleUserIntergral = showUserUpIntergral => {
    this.setState({
      showUserUpIntergral
    })
  }
  render() {
    const {
      userOperate,
      toogleEdit,
      toogleUserTypeModal,
      toogleUserLevelModal,
      getData,
      toogleUserIntergral
    } = this
    const {
      userInfo,
      showUserEdit,
      userTypeData,
      showUserType,
      showUserLevel,
      userLevelData,
      userTypesEnum,
      firstInfo,
      secondInfo,
      partner,
      showUserUpIntergral
    } = this.state
    const { reRender } = this.props
    const operations = [
      {
        name: '编辑资料',
        key: 'edit',
        permission: $api.user.userEdit.permission()
      },
      {
        name: '修改类型',
        key: 'type',
        permission: $api.user.userChangeType.permission(),
      },
      {
        name: '调整上级',
        key: 'switch',
        permission: $api.user.userUpLevel.permission(),
      },
      {
        name: '调整积分',
        key: 'switch_intergral',
        permission: $api.user.userUpIntergral.permission(),
      }
    ].filter(it => it.permission)
    const menu = (
      <Menu
        onClick={e => {
          userOperate(e.key)
        }}
      >
        {operations.map(it => (
          <Menu.Item key={it.key}>{it.name}</Menu.Item>
        ))}
      </Menu>
    )
    return (
      <div className={styles.leftContainer}>
        {
          operations.length > 0 &&
          <div style={{ textAlign: 'right' }}>
            <Dropdown overlay={menu}>
              <Button type="primary">
                操作 <DownOutlined />
              </Button>
            </Dropdown>
          </div>
        }
        <div className={styles.userInfo}>
          <div className={styles.userAvatarBox}>
            <Avatar
              size={100}
              src={userInfo.avatar}
            ></Avatar>
          </div>
          <LinesEllipsis
            style={{
              textAlign: 'center',
              fontSize: '18px',
              color: '#222',
              fontWeight: '500',
              marginTop: '14px',
            }}
            text={userInfo.nickname}
          ></LinesEllipsis>
          <div className={styles.phone}>{userTypesEnum[userInfo.member_type_id]}</div>
          <div className={styles.phone}>{userInfo.phone}</div>

          <div className={styles.UserInfoItemBox}>
            <UserInfoItem title="用户ID" text={userInfo.member_id} />
            <UserInfoItem title="性别" text={userInfo.gender === 1 ? '男' : userInfo.gender === 2 ? '女' : '保密'} />
            <UserInfoItem title="生日" text={userInfo.birthday} />
            <UserInfoItem title="注册时间" text={userInfo.created_at} />
            {/* <UserInfoItem title="职业" text="123" /> */}
            <UserInfoItem title="地区" text={this.getArea(userInfo)} />
          </div>
          <div className={styles.UserTeamItemBox}>
            {
              firstInfo[0] && <UserTeamItem reRender={reRender} member_id={firstInfo[0].member_id} desc="推荐人" nickname={firstInfo[0].nickname} avatar={firstInfo[0].avatar} />
            }
            {
              secondInfo[0] && <UserTeamItem reRender={reRender} member_id={secondInfo[0].member_id} desc="直属上级" nickname={secondInfo[0].nickname} avatar={secondInfo[0].avatar} />
            }
            {
              partner[0] && <UserTeamItem reRender={reRender} member_id={partner[0].member_id} desc="间接上级" nickname={partner[0].nickname} avatar={partner[0].avatar} />
            }
          </div>
        </div>
        <UserEdit
          userData={userInfo}
          toogle={toogleEdit}
          visible={showUserEdit}
          getList={getData}
        ></UserEdit>
        <UserType
          userTypeData={userTypeData}
          toogle={toogleUserTypeModal}
          visible={showUserType}
          getList={getData}
        ></UserType>
        <UserUpLevel
          userLevelData={userLevelData}
          toogle={toogleUserLevelModal}
          visible={showUserLevel}
          getList={getData}
        ></UserUpLevel>
        <UserUpIntergral
          uid={[this.props.id]}
          visible={showUserUpIntergral}
          toogle={toogleUserIntergral}
          fresh={getData}
        />
      </div>
    );
  }
}

export const UserInfoItem = function ({ title, text }) {
  return (
    <div style={{ display: 'flex', whiteSpace: 'nowrap' }}>
      <span className={styles.userInfoItemTitle}>{title}</span>
      <span className={styles.userInfoItemText}>{text || '--'}</span>
    </div>
  )
}

export const UserTeamItem = ({ reRender, desc, nickname, avatar, member_id }) => {
  const go = () => {
    router.push({
      pathname: `/user/userDetail/${member_id}`,
    })
    reRender(createUUID())
  }
  return (
    <div onClick={_ => { go() }} className={styles.UserTeamItem}>
      <div className={styles.UserTeamItemLeft}>
        <Avatar
          size={50}
          src={avatar}
        ></Avatar>
      </div>
      <div className={styles.UserTeamItemRight}>
        <div style={{ fontSize: 14, color: '#787878' }}>{desc}</div>
        <div style={{ fontSize: 14, color: '#222' }}>{nickname}</div>
      </div>
    </div>
  )
}

export default LeftPanel
