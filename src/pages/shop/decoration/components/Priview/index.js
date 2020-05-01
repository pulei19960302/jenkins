import React,{PureComponent} from 'react'
import { Drawer,Button } from 'antd'
import styles from './index.less'

export default class ComponentsBox extends PureComponent{
    constructor(props){
        super(props)
        this.iframe = React.createRef()
        this.state = {
            iframeVisible:true
        }
    }
    fresh=()=>{
         // iframe 跨域了 用不上 ref。 postMessage 又太麻烦
        this.setState({
            iframeVisible:false
        },()=>{
            setTimeout(()=>{
                this.setState({
                    iframeVisible:true
                })
            },0)
        })
    }
    render(){
        return (
            <Drawer
                title="预览"
                placement='left'
                closable={true}
                onClose={()=>{this.props.toogle(false)}}
                visible={this.props.showPriview}
                mask={false}
                width={500}
                className={styles.drawer}
            >
            <div className={styles.iframeContainer}>
                <div className="container">
                    <div className="top">
                        <Button className="fresh-btn" style={{margin:'10px 0'}} onClick={this.fresh}>刷新</Button>
                    </div>
                    {
                        this.state.iframeVisible &&
                        <iframe ref={this.iframe} className="iframe" title="priview" src={`http://mall.yongtaihejia.com//h5/index.html?developerDebug=1#/pages/activity/index1?id=${this.props.id}`} frameBorder="0"></iframe>
                    }
                </div>
            </div>
            </Drawer>
        )
    }
}