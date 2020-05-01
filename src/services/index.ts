import { $axios, AxiosConfig } from './request'
import { btnPermission } from '@/utils/permission'

const originModule = require.context('./modules', true, /\.ts/)

const $api:any = {}

originModule.keys().forEach((it) => {
  let o = originModule(it).default
  Object.keys(o).forEach(key => {
    o[`_${key}`] = o[key]
    o[key] = function (params:{} = {}, config:AxiosConfig = {}, otherConfig:{} = {}) {
      return $axios(o[`_${key}`], params, config, otherConfig)
    }
    o[key].permission = function(){
        const urlArr = o[`_${key}`].split(' ')
        return btnPermission(urlArr[1]||urlArr[0])
    }
    o[key].url = o[`_${key}`].split(' ')[1] || o[`_${key}`].split(' ')[0]
  })
  $api[it.replace(/\.\/(.+)\.ts$/, '$1')] = originModule(it).default
})

export default $api
