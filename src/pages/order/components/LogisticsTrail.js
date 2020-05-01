import { Modal, Timeline } from 'antd'
import { PureComponent } from 'react';

class LogisticsTrail extends PureComponent {
  state={
    logistics: []
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if(nextProps.modalVisible  && nextProps.modalVisible !== this.props.modalVisible){
      const { logistics, order } = nextProps
      const { id, logistics_sn, express_code } = order
      if(logistics){
        this.setState({ logistics: nextProps.logistics })
      }else{
        $api.order.getLogistics({id, sn: logistics_sn, code: express_code}).then( res => {
          this.setState({ logistics: res.data })
        })
      }
    }
  }
  render(){
    const { onCancel, modalVisible } = this.props
    const {logistics } = this.state
    const modalOpts = {
      title: '物流详情',
      width: 550,
      visible: modalVisible,
      destroyOnClose: true,
      maskClosable: false,
      onCancel,
      footer: null,
    }
    return (
      <Modal {...modalOpts}>
        <Timeline>
          {
            logistics.map((text,index)=><Timeline.Item key={index}>{text}</Timeline.Item>)
          }
        </Timeline>
      </Modal>
    )
  }
  
}

export default LogisticsTrail
