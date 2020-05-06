import { PureComponent } from 'react'
import CustomerList from './components/CustomerList'
import ChatBox from './components/ChatBox'
import OperationPanel from './components/OperationPanel'
import { connect } from 'dva'
import styles from './index.less'

@connect(({ conversation, app }) => ({ conversation, ...app }))
class conversation extends PureComponent {
    state = {

    }
    componentDidMount() {
        if (this.props.isLogout) {
            this.props.dispatch({
                type: `conversation/updateState`,
                payload: { customerList: [], msgList: [], activeKey: "", showSearchList: false, page: 1, sort_type: 1 },
            })
            this.props.dispatch({
                type: `app/updateState`,
                payload: { isLogout: false },
            })
        }
        this.props.dispatch({ type: 'conversation/socketInit' })
    }
    componentWillUnmount() {
        // this.props.dispatch({type: 'conversation/closeSocket'})
    }

    render() {
        return (
            <div className={styles.page}>
                <div className={styles.left}>
                    <CustomerList />
                </div>
                <div className={styles.center}>
                    <ChatBox />
                </div>
                <div className={styles.right}>
                    <OperationPanel />
                </div>
            </div>
        )

    }
}

export default conversation