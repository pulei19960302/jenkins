import { Avatar } from 'antd'
export const ToogleTeamList = function({activeIndex,teamInfo}) {
  const arr = [
    {
      title: '团队人数',
      color: '#2D9AFF',
      span: 8,
      num: teamInfo.teamNum
    },
    {
      title: '一级人数',
      color: '#FF9E2D',
      span: 8,
      num: teamInfo.firstNum
    },
    {
      title: '二级人数',
      color: '#35C237',
      span: 8,
      num: teamInfo.secondNum
    },
  ]
  arr.forEach((it, index) => {
    it.active = index === activeIndex
  })
  return arr
}
export const getColumns = function() {
  return [
    {
      title: '用户id',
      dataIndex: 'member_id',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      render: url => <Avatar size={40} src={url}></Avatar>,
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
    },
    // {
    //   title: '等级',
    //   dataIndex: 'level',
    // },
    {
      title: '类型',
      dataIndex: 'member_type_name',
    },
    // {
    //   title: '消费',
    //   dataIndex: 'consumption',
    // },
    {
      title: '余额',
      dataIndex: 'balance',
    },
    {
      title: '积分',
      dataIndex: 'integral',
    },
  ]
}
