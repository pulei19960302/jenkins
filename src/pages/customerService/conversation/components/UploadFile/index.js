/**
 * 上传单个图片或视频
 * props
 * index 当前聊天列表的第几条消息 
 * size 图片大小限制默认30M,
 * progress 上传进度
 * uploadStatus 上传状态 start开始 end结束 error出错
 * uploadSuccess 内容改变回调
 */

import React from 'react'
import { Upload, message } from 'antd'
import { IconFont } from 'components'
import { PureComponent } from 'react'
import { createUUID } from 'utils'
import config from 'services/target'
import axios from 'axios'
import styles from '../index.less'

const newAxios = axios.create()

export default class UploadImg extends PureComponent {
  upload = async file => {
    const { data: token } = await $api.common.getQiniuToken({},{cache:true,cacheTimeout:+new Date()+3600*1000})
    const { uploadStatus } = this.props
    const fileData = new FormData()
    fileData.append('token', token)
    fileData.append('file', file.file)
    const fileName = file.file.name
    const postfix = fileName.slice(fileName.lastIndexOf('.')) // 获取文件名后缀
    fileData.append('key', `${file.file.uid}${postfix}`)
    const type = file.file.type.match('image') ? 'image' : 'video' //判断文件类型
    const uid = createUUID()
    newAxios
      .post(config.qiniu_target, fileData, {
        onUploadProgress: progressEvent => {
          let progress = parseInt((progressEvent.loaded / progressEvent.total) * 100) || 0
          uploadStatus({ type, uid, progress, uploadStatus: 'uploading' })
        },
      })
      .then(res => {
        uploadStatus({ type, uid, uploadStatus: 'uploadSuccess', url: `${config.qiniu_img_url}/${res.data.key}` })
      })
      .catch(err => {
        uploadStatus({ type, uid, uploadStatus: 'error' })
        console.log(err, '上传失败')
      })
  }
  // 上传之前校验
  beforeUpload = (file,size) => {
    const type = file.type.match(/image|video/)
    if (!type) {
      message.error('文件只能上传图片或视频')
    }
    const isLtSize = file.size / 1024 / 1024 < size
    if (!isLtSize) {
      message.error(`文件须小于${size}M`)
    }
    return new Promise((resolve, reject) => {
      if (type && isLtSize) {
        resolve(file)
      } else {
        reject(file)
      }
    })
  }
  render() {
    const {
      size = 50,
      disabled
    } = this.props

    return (
      <Upload
        className={styles.icon}
        accept="image/*,video/*"
        disabled={disabled}
        customRequest={this.upload}
        beforeUpload={(file) => this.beforeUpload(file, size)}
        showUploadList={false}
      >
        <IconFont type="icontupian" />
      </Upload>
    )
  }
}
