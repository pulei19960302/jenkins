/**
 * 上传视频带展示列表
 * props:
 * value 默认图片链接 string|array
 * fileTotalCount 允许上传视频个数默认5,
 * canEdit 是否可编辑默认true,
 * desc 上传默认文本
 * uploadButton 上传按钮,
 * videoSize 图片大小限制默认100M,
 * dataChange 内容改变回调 
 */

import React from 'react'
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { PureComponent } from 'react'
import { PreviewVideo } from 'components'
import { looseEqual, createUUID } from 'utils'
import config from 'services/target'
import axios from 'axios'

const newAxios = axios.create()

export default class UploadVideo extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      fileList: [],
      loading: false
    }
  }

  initFileList(value = []) {
    const fileList = []
    let newFileList = []
    if (Array.isArray(value)) {
      newFileList = value
    } else if (value) {
      newFileList = [value]
    }
    if (newFileList.length === this.state.fileList.length) { return }
    newFileList.forEach((url) => {
      fileList.push({ url, name: value, uid: createUUID() })
    })
    this.setState({ fileList })
  }

  componentDidMount() {
    this.initFileList(this.props.value)
  }

  UNSAFE_componentWillReceiveProps({ value }) {
    if (!looseEqual(value, this.props.value)) {
      this.initFileList(value)
    }
  }

  uploadVideo = async file => {
    const { data: token } = await $api.common.getQiniuToken({}, { cache: true, cacheTimeout: +new Date() + 3600 * 1000 })
    const fileData = new FormData()
    fileData.append('token', token)
    fileData.append('file', file.file)

    const fileName = file.file.name
    const postfix = fileName.slice(fileName.lastIndexOf('.')) // 获取文件名后缀
    fileData.append('key', `${file.file.uid}${postfix}`)
    const { fileList } = this.state
    this.setState({ loading: true })
    newAxios
      .post(config.qiniu_target, fileData)
      .then(res => {
        fileList.push({
          name: `${config.qiniu_img_url}/${res.data.key}`,
          url: `${config.qiniu_img_url}/${res.data.key}`,
          uid: createUUID(),
        })
        this.setState({
          fileList: [...fileList]
        })
        if (this.props.onChange) {
          const result = fileList.map(file => file.url)
          this.props.onChange(result)
        }
        this.setState({ loading: false })
      })
      .catch(err => {
        this.setState({ loading: false })
        console.log(err)
        message.error('系统异常')
      })
  }

  onRemove = e => {
    let { fileList } = this.state
    const index = fileList.findIndex(item => (item.uid === e.uid))
    fileList.splice(index, 1)
    this.setState({ fileList: [...fileList] })
    if (this.props.onChange) {
      const result = fileList.map(file => file.url)
      this.props.onChange(result)
    }
  }

  // 上传之前校验
  beforeUpload = (file, videoSize) => {
    const isLt = file.size / 1024 / 1024 < videoSize
    if (!isLt) {
      message.error(`文件须小于${videoSize}M`)
    }
    return new Promise((resolve, reject) => {
      if (isLt) {
        resolve(file)
      } else {
        reject(file)
      }
    })
  }
  render() {
    const uploadBtn = <Button loading={this.state.loading} icon={<UploadOutlined />}>{this.props.desc || '上传视频'}</Button>
    const { fileList } = this.state
    const {
      canEdit = true,
      fileTotalCount = 20,
      uploadButton = uploadBtn,
      videoSize = 100,
    } = this.props
    return (
      <div>
        <Upload
          accept="video/*"
          fileList={fileList}
          onPreview={file => PreviewVideo({ videoSrc: file.url })}
          customRequest={this.uploadVideo}
          disabled={!canEdit}
          onRemove={this.onRemove}
          beforeUpload={(file) => this.beforeUpload(file, videoSize)}
          showUploadList={{
            showRemoveIcon: canEdit,
            showPreviewIcon: true,
          }}
        >
          {fileList.length < fileTotalCount ? uploadButton : null}
        </Upload>
      </div>
    )
  }
}
