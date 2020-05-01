import React,{PureComponent} from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd';
import PageComponentItem from './PageComponentItem'
import styles from './PageContent.less'



class ComponentsBox extends PureComponent{
    
    render(){
        const { selected,onComponentFocus,onComponentDel,pageTitle } = this.props
        return (
            <div className={styles.PageContentContainer}>
                <div className="pageTitle">
                    <span>{pageTitle}</span>
                </div>
                <Droppable droppableId="pageContent">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                className={styles.PageContentBox}
                                style={{background:snapshot.isDraggingOver? '#effbef' : '#fff',}}
                                >
                                    {selected.map((item, index) => (
                                        <Draggable
                                            key={item.id}
                                            draggableId={item.id}
                                            index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={{
                                                        opacity:snapshot.isDragging? 0.5 : 1,
                                                        ...provided.draggableProps.style,
                                                    }}
                                                    >
                                                    <PageComponentItem
                                                        onComponentFocus={onComponentFocus} 
                                                        onComponentDel={onComponentDel}
                                                        item={item}
                                                        index={index}
                                                    ></PageComponentItem>
                                                </div>
                                                
                                            )}
                                        </Draggable>
                                    ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
        )
        
    }
}
export default ComponentsBox