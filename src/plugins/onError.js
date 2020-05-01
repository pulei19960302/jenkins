import { message } from 'antd'

export default {
  onError(e, a) {
    e.preventDefault()
    if (e.message) {
      // message.error(e.message)
      console.log(e)
    } else {
      /* eslint-disable */
      console.error(e)
    }
  },
}
