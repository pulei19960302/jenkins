import axios from 'axios'
// import { Toast } from 'vant'
// import Router from '@/router'
// import local from '@/Global/utils/stroage'
import { message } from 'antd'
import Token from '@/utils/token'

export interface AxiosConfig{
    /** * loading */
    loading?: boolean;
    /** * loading文案 默认加载中 */
    loadingDesc?: string;
    /** * 登录拦截 默认 true */
    auth?: boolean;
    /** * 错误提示 默认 true */
    errorKill?: boolean;
    /** * 成功提示 默认 false */
    success?:boolean;
    /** * 成功提示 默认 操作成功 */
    successText?:string;
    /** * 直接调用三方api 默认 false */
    thirdApi?:boolean;
    /** * 关闭 loading 的 function 无需设置 */
    hideLoading?:any;
    /** * 数据是否缓存 默认 false */
    cache?:boolean;
    /**缓存过期 */
    cacheTimeout?: number;
    /** * 数据缓存更新 默认 false */
    cacheFresh?:boolean;
     /** * 控制 loading 的fn 尝试调用并且传入布尔值 */
    loadingFn?:(boo:boolean)=>{};
    /** * 不携带令牌 (由于服务端甚至登录都去校验别人登没登录) */
    delAuthorization?:boolean;
}

const axiosInstance = axios.create({
    timeout: 55000,
})

/**
 *
 * @param url
 * @param params
 * @param config
 */
// eslint-disable-next-line max-len
export const $axios = function (apiKey: string, params = {}, config: AxiosConfig = {}, otherConfig:any = {}) {
  const apiConfig = {
    loading: false,
    loadingDesc: 'loading...',
    auth: true,
    errorKill: true,
    success: false,
    successText: '操作成功',
    thirdApi: false,
    cache:false,
    cacheFresh:false,
    cacheTimeout:0,
    delAuthorization:false,
    ...config
  }

  const apiUrlArr = apiKey.split(' ')
  if(apiUrlArr.length===1){
    apiUrlArr.unshift('get')
  }

  if (otherConfig.headers) {
    otherConfig.headers.Authorization = `${Token.getToken()}`
  } else {
    otherConfig.headers = { Authorization: `${Token.getToken()}` }
  }
  if(apiConfig.delAuthorization){
      delete otherConfig.headers.Authorization
  }
  // 如果需要缓存
  if(apiConfig.cache && !apiConfig.cacheFresh){
    const paramsString = JSON.stringify(params)
    if($api.$cache && $api.$cache[`${apiUrlArr[1]}_${paramsString}`]){
        const cacheData = $api.$cache[`${apiUrlArr[1]}_${paramsString}`]
        if(!cacheData.cacheTimeout || +new Date()<cacheData.cacheTimeout){
            return Promise.resolve(cacheData.data)
        }
    }
  }
  if (apiConfig.loading) {
    apiConfig.hideLoading = message.loading(apiConfig.loadingDesc, 0)
  }
  const entendParams = {
      ...params,
    //   company_id:1
  }
  Object.keys(entendParams).forEach(it=>{
    if(entendParams[it]===''){
        delete entendParams[it]
    }
})
  apiConfig.loadingFn && apiConfig.loadingFn(true)
  return axiosInstance({
    method: apiUrlArr[0],
    url: apiUrlArr[1],
    data: entendParams,
    baseURL: apiUrlArr[1].includes('/im-server/') ? '' : '/admin',
    params: apiUrlArr[0].toLowerCase() === 'get' ? entendParams : {},
    ...otherConfig
  }).then((res: any) => {
    apiConfig.loading && apiConfig.hideLoading()
    apiConfig.loadingFn && apiConfig.loadingFn(false)
    if (apiConfig.thirdApi) {
      return res.data
    }
    if (res.data.code === 403 || res.data.code === 401) {
      if (apiConfig.auth) {
        (window as any).g_app._store.dispatch({
            type: 'app/logout',
        })
        message.error(res.data.message, 3)
      }
      throw res.data
    }
    if (res.data.code !== 0) {
      apiConfig.errorKill && message.error(res.data.message, 3)
      throw res.data
    }
    apiConfig.success && message.success(apiConfig.successText,3)
    // 缓存
    if(apiConfig.cache){
        const paramsString = JSON.stringify(params)
        if($api.$cache){
            $api.$cache[`${apiUrlArr[1]}_${paramsString}`] = {
                params,
                data:res.data,
                cacheTimeout:apiConfig.cacheTimeout
            }
        }else{
            $api.$cache = {
                [`${apiUrlArr[1]}_${paramsString}`]:{
                    params,
                    data:res.data,
                    cacheTimeout:apiConfig.cacheTimeout
                }
            }
        }
    }
    return res.data
  }).catch((err: any) => {
    apiConfig.loading && apiConfig.hideLoading()
    apiConfig.loadingFn && apiConfig.loadingFn(false)
    if (err.response) {
      switch (err.response.status) {
        case 500:
        message.error('500 系统异常', 3)
          break
        case 404:
        message.error('404 接口找不到了',3)
          break
        case 401:
            message.error(err.response.data.message,3)
            if (apiConfig.auth) {
                (window as any).g_app._store.dispatch({
                    type: 'app/logout',
                })
            }
            break
        default:
          console.log('fuck api', err.response)
      }
    } else {
      console.log(err)
    }
    // eslint-disable-next-line no-throw-literal
    throw err
  })
}
