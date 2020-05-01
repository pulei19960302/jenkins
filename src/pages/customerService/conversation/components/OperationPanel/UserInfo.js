import { PureComponent } from 'react'
import { connect } from 'dva'
import { MobileOutlined } from '@ant-design/icons';
import { Descriptions, Avatar } from 'antd';

@connect(({ conversation }) => ({ ...conversation }))
class UserInfo extends PureComponent {
    state = {
        userInfo: {},
        userRelation: {
            firstInfo: [],
            secondInfo: [],
            partner: []
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log(nextProps, '========================')
        if (nextProps.activeKey && nextProps.activeKey !== this.props.activeKey) {
            console.log(nextProps.activeKey, this.props.activeKey)
            const { activeKey, customerList } = nextProps
            this.init(activeKey, customerList)
        }
    }
    componentDidMount(){
        const { activeKey, customerList } = this.props
        this.init(activeKey, customerList)
    }
    init(activeKey, customerList) {
        const customer = customerList.find(el => el.key === activeKey) || {}
        customer.person_id && this.getUserInfo(customer.person_id)
    }
    //  获取客户信息
    getUserInfo = (member_id) => {
        $api.user.userInfo({ member_id }).then(({ data }) => {
            this.setState({ userInfo: data })
        })
        $api.user.userRelation({ member_id }).then(({ data }) => {
            this.setState({ userRelation: data })
        })
    }
    // 地区展示
    getArea = ({ resideprovince_name, residecity_name, residecounty_name }) => {
        const temp = [resideprovince_name, residecity_name, residecounty_name]
        const area = temp.filter(el => el)
        return area.length ? area.join('-') : '--'
    }
    // 获取上下级展示
    getTeamItem = (item, rankName) => (
        <div className="partner">
            <Avatar src={item.avatar}
                alt=""
                className="avatar"
            />
            <div className="rank">{rankName}</div>
            <div className="nickName">{item.nickname}</div>
        </div>
    )

    render() {
        const { userInfo, userRelation } = this.state
        const { firstInfo, secondInfo, partner } = userRelation
        return (
            <div className="userInfo">
                <Avatar src={userInfo.avatar} alt="" className="avatar" />
                <div className="userName">{userInfo.nickname}</div>
                <p className="phone"><MobileOutlined /> {userInfo.phone || '--'}</p>
                <Descriptions title="" size="small" column={1} className="descriptions">
                    <Descriptions.Item label="用户ID">{userInfo.member_id || '--'}</Descriptions.Item>
                    <Descriptions.Item label="生日">{userInfo.birthday || '--'}</Descriptions.Item>
                    <Descriptions.Item label="注册时间">{userInfo.created_at || '--'}</Descriptions.Item>
                    <Descriptions.Item label="地区">{this.getArea(userInfo)}
                    </Descriptions.Item>
                    {/* <Descriptions.Item label="微信">xxx</Descriptions.Item> */}
                </Descriptions>
                {
                    firstInfo[0] && this.getTeamItem(firstInfo[0], '直属上级')
                }
                {
                    secondInfo[0] && this.getTeamItem(secondInfo[0], '间接上级')
                }
                {
                    partner[0] && this.getTeamItem(partner[0], '合伙人')
                }
            </div>
        );
    }
}

export default UserInfo