/**
 * Created by hetingfeng on 2019/1/17 0017.
 */
const finance = {
    PAYMENT_TYPES: [
        { label: '售后退款', value: 1 },
        { label: '取消退款', value: 2 },
        { label: '在线充值', value: 3 },
        { label: '直属合伙人奖励', value: 4 },
        { label: '上级合伙人奖励', value: 5 },
        { label: '金牌奖励', value: 6 },
        { label: '银牌奖励', value: 7 },
        //{ label: '平台分红', value: 8 },
        { label: '后台录款', value: 9 },
        { label: '佣金奖励', value: 10 },
        //{ label: '晋升奖励', value: 11 },
        //{ label: '活动奖励', value: 12 },
        { label: '粉丝下单奖励', value: 10 },
        { label: '钻石奖励', value: 14 },
        { label: '下单消费', value: 20 },
        { label: '提现', value: 21 },
        { label: '后台扣款', value: 22 },
        { label: '金牌奖励扣款', value: 23 },
        { label: '银牌奖励扣款', value: 24 },
        { label: '佣金奖励扣款', value: 25 },
        { label: '钻石扣款', value: 29 },
        { label: '直属合伙人扣款', value: 30 },
        { label: '上级合伙人扣款', value: 31 },
        { label: '粉丝下单扣款', value: 10 },
        { label: '金牌奖励', value: 6 },
        { label: '银牌奖励', value: 7 },
        { label: '售后扣款', value: 26 },
        { label: '售后补款', value: 33 },
    ], RECHARGE_TYPES: [
        { label: '全部', value: -1 },
        { label: '银行卡', value: 3 },
        { label: '支付宝', value: 2 },
        { label: '微信', value: 1 }
    ], RECHARGE_STATUS: [
        { value: 0, label: '未充值' },
        { value: 1, label: '充值中' },
        { value: 2, label: '充值成功' },
        { value: -1, label: '全部' }
    ], WITHDRAW_STATUS: [
        { label: '未审核', value: 0 },
        { label: '审核中', value: 1 },
        { label: '拒绝申请', value: 2 },
        { label: '提现成功', value: 3 },
        { label: '转银行处理', value: 4 },
        { label: '银行处理中', value: 5 },
        { label: '银行退回', value: 6 },
        { label: '提现失败', value: 7 },
    ], CHECK_STATUS: [
        { label: '未对账', value: 1 },
        { label: '已对账', value: 2 },
        { label: '异常', value: 3 },
        { label: '已冲正', value: 4 },
    ], CHECK_MONEY: [
        { label: '100元以下', value: 1 },
        { label: '100-200元', value: 2 },
        { label: '200-500元', value: 3 },
        { label: '500-1000元', value: 4 },
        { label: '1000元以上', value: 5 },
    ],

    // 20200213 add pulei 佣金提现的查询下拉数据修改
    COMMISSION_RECHARGE_TYPES: [
        { label: '全部', value: -2 },
        { label: '旺旺薪银行卡', value: 7 },
        { label: '旺旺薪支付宝', value: 9 }
    ],
    COMMISSION_WITHDRAW_STATUS: [
        { label: '未审核', value: 0 },
        { label: '审核中', value: 1 },
        { label: '拒绝申请', value: 2 },
        { label: '提现成功', value: 3 },
        { label: '旺薪提现处理中', value: 9 },
        { label: '旺旺薪提现退回', value: 10 },
    ],
    // end
}
export default finance;
