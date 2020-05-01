import moment from 'moment'
export const mobileReg = /^1[0-9]\d{9}$/ // 手机号
export const emailReg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/ //邮箱
// 身份证
export const icNoReg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
export const bankCardReg = /^\d{6,32}$/ // 银行卡号


export const DATE_RANGE = {
  前7天: [moment().subtract(7, 'days'), moment()],
  前30天: [moment().subtract(30, 'days'), moment()],
  今日: [moment().startOf('day'), moment()],
  本周: [moment().startOf('week'), moment()],
  本月: [moment().startOf('month'), moment()],
}
