import React, { PureComponent } from 'react'
import { Card, Divider, Row, Col } from 'antd'
import moment from 'moment'
import InfiniteScroll from 'react-infinite-scroller';
import styles from '../index.less'
import { FORMAT } from '../../constants'

class Conversation extends PureComponent {
  constructor(props) {
    super(props)
    const { conversations = {} } = this.props
    const { msg_list = [], total = 0, loading = false } = conversations
    this.state = {
      page: 1,
      page_size: 20,
      hasMore: msg_list.length < total,
      loading: loading,
    }
  }

  UNSAFE_componentWillReceiveProps(nextprops) {
    const { conversations = {} } = nextprops
    const { msg_list = [], total = 0, loading = false } = conversations

    this.setState({
      hasMore: msg_list.length < total,
      loading,
    })
  }

  getConversations = () => {
    const { conversation_key, dispatch } = this.props
    const { page, page_size, hasMore, loading } = this.state

    if (!hasMore && loading) return

    this.setState((prevState) => ({
      page: prevState.page + 1,
      loading: true,
    }), () => {
      conversation_key && dispatch({
        type: 'workOrderDetail/getConversations',
        payload: { conversation_key, page, page_size }
      })

    })
  }

  renderList = () => {
    const { hasMore } = this.state
    const { conversations = {} } = this.props
    const { msg_list = [] } = conversations

    const result = msg_list && msg_list.map((list, index) => {
      const { created_at = '' } = list
      return (
        <div key={index}>
          <Row type="flex">
            <Col className={styles.img}><img src={list.person_head_picture}></img></Col>
            <Col>
              <div >
                <span className={styles.name}>{list.person_name}</span>
                <span className={styles.time}>{created_at && moment(created_at).format(FORMAT)}</span>
              </div>
              <div className={styles.content}>{list.content}</div>
            </Col>
          </Row>
          <Divider />
        </div>
      )
    })

    return (
      <div style={{ height: 'calc(100vh - 342px)', overflow: 'auto' }}>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.getConversations}
          className={styles.person}
          hasMore={hasMore}
          // loader={this.getLoader()}
          initialLoad={false}
          threshold={5}
          useWindow={false}
        >
          {result}</InfiniteScroll>
      </div>
    )
  }

  render() {
    return (
      <Card title="咨询信息" className={styles.card}>
        {this.renderList()}
      </Card>
    )
  }
}

export default Conversation