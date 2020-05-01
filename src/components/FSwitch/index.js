import React, { PureComponent } from 'react'
import { Switch } from 'antd'
class FSwitch extends PureComponent{
    toogle=(e)=>{
        const { onChange,values=[1,0] } = this.props
        onChange(e?values[0]:values[1])
    }
    render(){
        const { toogle } = this
        const { value,values=[1,0],texts=['是','否'],tips,tipStyle,...race } = this.props
        return <div>
            <Switch {...race} onChange={toogle} checked={value===values[0]?true:false} checkedChildren={texts[0]} unCheckedChildren={texts[1]}></Switch>
            {
                !!tips && <span style={{fontSize:12,color:'rgba(0,0,0,0.35)',...tipStyle}}>{value===values[0]?tips[0]:tips[1]}</span>
            }
        </div>
    }
}

export default FSwitch