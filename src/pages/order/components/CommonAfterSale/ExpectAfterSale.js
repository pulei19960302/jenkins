import { QuestionCircleOutlined } from '@ant-design/icons';
import { Popover } from 'antd';

const content = ({ order_total_fee, order_diff_fee, order_freight_fee, order_actual_fee }) => (
    <div style={{ width: 300 }}>
        <p>应付金额：￥{order_total_fee}</p>
        <p>优惠金额：￥{order_diff_fee}</p>
        <p>运费金额：￥{order_freight_fee}</p>
        <p>实付金额：￥{order_actual_fee}</p>
        <p>由于涉及优惠分摊，存在无法平均的计算具体的优惠分摊价格，故此数据仅作参考使用。</p>
    </div>
)

const ExpectAfterSale = (order) => {
    return (
        <div>
            预计售后金额&nbsp;
            <Popover placement="topLeft" title="提示" content={content(order)} trigger="hover">
                <QuestionCircleOutlined style={{ color: "#12C2C2" }} />
            </Popover>
        </div>
    );
}

export default ExpectAfterSale
