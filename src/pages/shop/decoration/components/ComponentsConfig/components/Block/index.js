import React,{PureComponent} from 'react'
import { Collapse } from 'antd';
import styles from './index.less'

const { Panel } = Collapse;


class Block extends PureComponent{
    render(){
        const { children,title } = this.props
        return(
            <div className={styles.Block}>
                <Collapse defaultActiveKey={['1']}>
                    <Panel header={title} key="1">
                        {children}
                    </Panel>
                </Collapse>
            </div>
        )
    }
}

export default Block