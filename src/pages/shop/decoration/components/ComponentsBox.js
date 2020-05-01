import React,{PureComponent} from 'react'
import { Collapse } from 'antd';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { IconFont } from 'components'

import styles from './ComponentsBox.less'

const { Panel } = Collapse;

class ComponentsBox extends PureComponent{
    render(){
        const { baseComponentItems,marketComponentItems } = this.props
        return (
        <div className={styles.componentContainer}>
            <div className={styles.componentBox}>
            <Collapse defaultActiveKey={['1','2']}>
                <Panel className={styles.componentsPanel} header="基本组件" key="1">
                    <div>
                        <Droppable droppableId="baseComponentsBox">
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        className={styles.componentDropBox}
                                        >
                                        {baseComponentItems.map((item, index) => (
                                            <Draggable
                                                key={item.id}
                                                draggableId={item.id}
                                                index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className={styles.componentsItem}
                                                        style={{
                                                            opacity:snapshot.isDragging? 0.5 : 1,
                                                            ...provided.draggableProps.style,
                                                        }}>
                                                        <IconFont style={{fontSize:36}} type={item.icon}></IconFont>
                                                        {item.name}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                </Panel>
                <Panel className={styles.componentsPanel} header="营销组件" key="2">
                <div>
                        <Droppable droppableId="marketComponentsBox">
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        className={styles.componentDropBox}
                                        style={{borderBottom:'none'}}
                                        >
                                        {marketComponentItems.map((item, index) => (
                                            <Draggable
                                                key={item.id}
                                                draggableId={item.id}
                                                index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className={styles.componentsItem}
                                                        style={{
                                                            opacity:snapshot.isDragging? 0.5 : 1,
                                                            ...provided.draggableProps.style,
                                                        }}>
                                                        <IconFont style={{fontSize:36}} type={item.icon}></IconFont>
                                                        {item.name}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>                       
                </Panel>
            </Collapse>
            </div>
        </div>)
    }
}
export default ComponentsBox