import React, { PureComponent } from 'react'
import { CommonTable } from 'components'
import { getConversationColumns, conversationSearchFields } from '../fields'
import Details from './Details'

class ConversationQuery extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showDetails: false,
      row: {},
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'dataManage/getConversationList'
    })
  }

  toggleDetails = () => {
    this.setState((prevState) => ({
      showDetails: !prevState.showDetails
    }))
  }

  handleViewDetails = (row = {}) => {
    const { key = '' } = row
    this.props.dispatch({
      type: 'dataManage/getConversationDetails',
      payload: {
        conversation_key: key,
      }
    })
    this.setState({ row })
    this.toggleDetails()
  }

  onSearch = (query) => {
    const { dispatch } = this.props
    dispatch({ type: 'dataManage/updateState', payload: { conversationQuery: query }, })
    dispatch({ type: 'dataManage/getConversationList', query, })
  }

  getList = (payload) => {
    const { dispatch } = this.props
    dispatch({ type: 'dataManage/getConversationList', payload, })
  }

  render() {
    const { showDetails, row } = this.state

    const {
      loading,
      list = [],
      pagination = {},
      conversationQuery = {},
      msg_list = [],
    } = this.props

    const searchProp = {
      search: conversationQuery,
    }

    return (
      <div>
        <CommonTable
          dataSource={list}
          pagination={pagination}
          searchFields={conversationSearchFields}
          columns={getConversationColumns.call(this)}
          loading={loading.effects['dispatchManage/getList']}
          onSearch={this.onSearch}
          getList={this.getList}
          searchProp={searchProp}
        />
        <Details
          visible={showDetails}
          onClose={this.toggleDetails}
          details={row}
          list={msg_list}
          loading={loading.effects['dispatchManage/getConversationDetails']}
        />
      </div>
    )
  }
}

export default ConversationQuery