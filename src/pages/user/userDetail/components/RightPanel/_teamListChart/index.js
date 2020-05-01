import React, { PureComponent } from 'react'
import Item from './item'
import styles from './index.less'

class TeamListChart extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [
        [{ name: '赵日天', id: 1, modelIndex: -1 }],
        [
          { name: '赵日天之子', id: 2, f_id: 1, modelIndex: 3 },
          { name: '赵日天之子', id: 2, f_id: 1, modelIndex: 2 },
          { name: '赵日天之子', id: 2, f_id: 1, modelIndex: 2 },
          { name: '赵日天之子', id: 2, f_id: 1, modelIndex: 2 },
          { name: '赵日天之子', id: 2, f_id: 1, modelIndex: 2 },
          { name: '赵日天之子', id: 2, f_id: 1, modelIndex: 1 },
        ],
        [{ name: '赵日天之孙', id: 3, f_id: 2, modelIndex: 4 }],
      ],
    }
  }
  render() {
    const { dataSource } = this.state
    return (
      <div className={styles.container}>
        {dataSource.map(it => {
          return (
            <div>
              {it.map(item => (
                <Item modelIndex={item.modelIndex}></Item>
              ))}
            </div>
          )
        })}
      </div>
    )
  }
}

export default TeamListChart
