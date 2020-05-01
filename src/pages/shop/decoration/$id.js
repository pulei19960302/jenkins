import React,{PureComponent} from 'react'
import { Page } from 'components'
import { Row,Button,Col } from 'antd'
import ComponentsBox from './components/ComponentsBox'
import PageContent from './components/PageContent'
import { DragDropContext } from 'react-beautiful-dnd';
import { getFilterComponents,generateSelectedComponents,idFindList,handleDataTofields,Faker } from './components/fields'
import ComponentsConfig from './components/ComponentsConfig'
import Priview from './components/Priview'
import styles from './index.less'

const idToStateMap = {
    baseComponentsBox:'baseComponentItems',
    marketComponentsBox:'marketComponentItems',
    pageContent:'selected'
}

class Decoration extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            id:props.match.params.id,
            baseComponentItems: getFilterComponents('base'),
            marketComponentItems:getFilterComponents('market'),
            selected: [],
            activeComponent:{},
            forceDestory:false,
            submitLoading:false,
            pageSet:Faker,
            showPriview:false
        };
    }

    getStateList=(dropid)=>{
        return this.state[idToStateMap[dropid]]
    }

    componentDidMount(){
       this.getPage()
    }
    getPage=async ()=>{
        const { id,pageSet } = this.state
        const { data } = await $api.shop.getPageContent({
            page_dev_id:id
        })
        pageSet.content = data.content
        this.setState({
            selected:handleDataTofields(data.items || []),
            pageSet:{
                ...pageSet
            }
        },()=>{
            this.toogleComponentActive(0)
        })
    }

    onComponentFocus=(item,index)=>{
        if(item.active)return
        const { activeComponent } = this.state
        // 已经存在正在设置的组件
        if(activeComponent.id){
            // 强行卸载掉
            this.forceFresh()
        }
        this.toogleComponentActive(index)
    }
    forceFresh=()=>{
        return new Promise(res=>{
            this.setState({
                forceDestory:true
            },()=>{
                res(true)
                this.setState({
                    forceDestory:false
                })
            })
        })
    }
    onComponentDel=(item,index)=>{
        const selected = this.state.selected.slice(0)
        const { activeComponent } = this.state
        selected.splice(index,1)
        this.setState({
            selected,
        })
        if(activeComponent.id===item.id){
            this.setState({
                activeComponent:{}
            })
        }
    }
    toogleComponentActive = (index)=>{
        const selected = this.state.selected.slice(0)
        selected.forEach(it=>it.active = false)
        if(!selected[index])return
        selected[index].active = true
        this.setState({
            selected,
            activeComponent:selected[index]
        })
    }

    showPageSet=()=>{
        const { selected,pageSet } = this.state
        selected.forEach(it=>it.active = false)
        this.setState({
            selected:selected.slice(0),
            activeComponent:pageSet
        })
    }

    removeSelected=(index)=>{
        const selected = JSON.parse(JSON.stringify(this.state.selected))
        selected.splice(index,1)
        this.setState({
            selected
        })
    }

    reorderSelected = (startIndex, endIndex) => {
        const selected = JSON.parse(JSON.stringify(this.state.selected))
        const [removed] = selected.splice(startIndex, 1);
        selected.splice(endIndex, 0, removed);
        this.setState({
            selected
        })
    };

    addSelected=(source,destination)=>{
        const { selected } = this.state
        const list = this.getStateList(source.droppableId)
        const choosed = generateSelectedComponents(list[source.index].id)
        selected.splice(destination.index,0,choosed)
        this.setState({
            selected
        })
    }

    onDragEnd = result => {
        const { source, destination } = result;
        // 目的地不存在 或目的地不是页面内容区域
        if (!destination || destination.droppableId!=='pageContent') {
            // this.removeSelected(source.index)
            return;
        }
        // 当前区域拖拽
        if (source.droppableId === 'pageContent' && source.droppableId === destination.droppableId) {
            this.reorderSelected(source.index,destination.index)
        } 
        // 添加
        if(source.droppableId !== 'pageContent' && destination.droppableId === 'pageContent'){
            this.addSelected(source,destination)
        }
    }
    componentSubmit=(id,payload)=>{
        // 页面设置提交
        if(Faker.id===id){
            const { pageSet } = this.state
            pageSet.content = Object.assign(pageSet.content,payload)
            this.setState({
                pageSet:{
                    ...pageSet
                }
            })
            return
        }
        // 组件设置提交
       const selected = this.state.selected.slice(0)
       const { index } = idFindList(selected,id)
       if(index===null)return  //  子组件卸载触发 submit
       selected[index].content = Object.assign(selected[index].content,payload)
       this.setState({
          selected
       })
    }
    saveAll=async (isPriview=false)=>{
        await this.forceFresh()
        const { selected,id,pageSet } = this.state
        const params = {}
        params.content = {
            data:selected.map((it,i)=>{
                const o = {
                    component_id:+it.component_id,
                    content:JSON.stringify(it.content),
                    sort:i+1,
                }
                if(it.id.includes('cameFromBackend')){
                    o.id = +it.id.split('_')[1]
                }
                return o
            }),
            page_dev_id:id,
            ...pageSet.content
        }
        params.content = JSON.stringify(params.content)
        $api.shop.editPage(params,{success:true,loadingFn:this.toogleSubmitLoading}).then(async _=>{
            if(isPriview){
                // 接口调太快服务端竟然反应不过来
                // setTimeout(async _=>{
                    this.setState({
                        showPriview:true
                    },()=>{
                        this.priviewContext.fresh()
                    })
                // },100)
            }
        })
    }
    toogleSubmitLoading=(submitLoading)=>{
        this.setState({
            submitLoading
        })
    }
    prod=async _=>{
        const { id } = this.state
        await $api.shop.prod({page_dev_id_str:`${id}`},{success:true})
        return Promise.resolve(true)
    }
    tooglePriview=(showPriview)=>{
        this.setState({
            showPriview
        })
    }
    render(){
        const { baseComponentItems,marketComponentItems,selected,activeComponent,forceDestory,submitLoading,pageSet } = this.state
        const pageTitle = pageSet.content.name
        const { onComponentFocus,onComponentDel,componentSubmit,saveAll,prod,showPageSet,saveAllAndPriview } = this
        return (
            <Page style={{margin:-16}}>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Row type="flex">
                        <Col span={6}>
                            <ComponentsBox 
                                baseComponentItems={baseComponentItems}
                                marketComponentItems={marketComponentItems}
                            />
                        </Col>
                        <Col span={10}>
                            <PageContent pageTitle={pageTitle} onComponentDel={onComponentDel} onComponentFocus={onComponentFocus} selected={selected} />
                        </Col>
                        <Col span={8}>
                            {
                                !forceDestory && <ComponentsConfig activeComponent={activeComponent} submit={componentSubmit} />
                            }
                            
                        </Col>
                    </Row>
                </DragDropContext>
                <div className={styles.bottomBtnBox}>
                    <Button onClick={showPageSet} className="mr8">页面设置</Button>
                    {
                        $api.shop.editPage.permission() && 
                        <Button onClick={()=>{saveAll()}} loading={submitLoading} className="mr8">保存</Button>
                    }
                    <Button onClick={()=>{saveAll(true)}} loading={submitLoading} className="mr8">预览</Button>
                    {
                        $api.shop.prod.permission() && 
                        <Button onClick={prod} type="primary" loading={submitLoading}>发布</Button>
                    }
                </div>
                <Priview ref={child=>{this.priviewContext = child}} id={this.state.id} toogle={this.tooglePriview} showPriview={this.state.showPriview}></Priview>
            </Page>
        )
    }
}

export default Decoration