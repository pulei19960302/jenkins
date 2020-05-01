import config from 'services/target'
import axios from 'axios'
const newAxios = axios.create()


const uploadImage = (param,token) => {
  const { file, progress, success, error } = param
  const fileData = new FormData()
  fileData.append('token', token)
  fileData.append('file', file)
  fileData.append('key', `${file.name}`)
  return new Promise((resolve, reject) => {
    newAxios
      .post(config.qiniu_target, fileData, {
        onUploadProgress: progressEvent => {
          progress((progressEvent.loaded / progressEvent.total) * 100)
        },
      })
      .then(res => {
        success({
          url: `${config.qiniu_img_url}/${res.data.key}`,
        })
      })
      .catch(err => {
        console.log(err)
        error('系统异常')
      })
  })
}

export default uploadImage
