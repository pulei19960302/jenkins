/**
 * 上传图片带展示列表
 * props:
 * pic 默认图片链接 string|array
 * fileTotalCount 允许上传图片张数默认20,
 * canEdit 是否可编辑默认true,
 * desc 上传默认文本
 * uploadButton 上传按钮,
 * picSize 图片大小限制默认5M,
 * dataChange 内容改变回调
 */

import React from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import { PureComponent } from 'react'
import { PreviewImg } from 'components'
import { looseEqual, createUUID } from 'utils'
import config from 'services/target'
import axios from 'axios'
import styles from './index.less'

const newAxios = axios.create()

export default class UploadImg extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      fileList: [],
    }
  }

  initFileList(pic = []) {
    const fileList = []
    let newPic = []
    if (Array.isArray(pic)) {
      newPic = pic
    } else if (pic) {
      newPic = [pic]
    }
    if (newPic.length === this.state.fileList.length) { return }
    newPic.forEach((url) => {
      fileList.push({ url, uid: createUUID() })
    })
    this.setState({ fileList })
  }

  componentDidMount() {
    this.initFileList(this.props.pic)
  }

  UNSAFE_componentWillReceiveProps({ pic }) {
    if (!looseEqual(pic, this.props.pic)) {
      this.initFileList(pic)
    }
  }

  uploadImg = async file => {
    const { data: token } = await $api.common.getQiniuToken({}, { cache: true, cacheTimeout: +new Date() + 3600 * 1000 })
    const fileData = new FormData()
    fileData.append('token', token)
    fileData.append('file', file.file)

    const fileName = file.file.name
    const postfix = fileName.slice(fileName.lastIndexOf('.')) // 获取文件名后缀
    fileData.append('key', `${file.file.uid}${postfix}`)
    const { fileList } = this.state

    newAxios
      .post(config.qiniu_target, fileData)
      .then(res => {
        fileList.push({
          name: fileName,
          url: `${config.qiniu_img_url}/${res.data.key}`,
          uid: createUUID(),
        })
        this.setState({
          fileList: [...fileList]
        })
        if (this.props.dataChange) {
          const result = fileList.map(file => file.url)
          this.props.dataChange(result)
        }
      })
      .catch(err => {
        console.log(err)
        message.error('系统异常')
      })
  }

  onRemove = e => {
    let { fileList } = this.state
    const index = fileList.findIndex(item => (item.uid === e.uid))
    fileList.splice(index, 1)
    this.setState({ fileList: [...fileList] })
    if (this.props.dataChange) {
      const result = fileList.map(file => file.url)
      this.props.dataChange(result)
    }
  }
  // 上传之前校验
  beforeUpload = (file, picSize) => {
    const isJPG = file.type.match('image')
    if (!isJPG) {
      message.error('文件格式须为jpg、jpeg、png、gif')
    }
    const isLt = file.size / 1024 / 1024 < picSize
    if (!isLt) {
      message.error(`文件须小于${picSize}M`)
    }
    return new Promise((resolve, reject) => {
      if (isJPG && isLt) {
        resolve(file)
      } else {
        reject(file)
      }
    })
  }
  render() {
    const uploadBtn = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">{this.props.desc}</div>
      </div>
    )
    const { fileList } = this.state
    const {
      canEdit = true,
      fileTotalCount = 20,
      uploadButton = uploadBtn,
      picSize = 10,
    } = this.props

    return (
      <div className={`clearfix ${styles.uploadBox}`}>
        <Upload
          accept="image/*"
          listType="picture-card"
          fileList={fileList}
          onPreview={file => PreviewImg({ imgUrl: file.url || file.thumbUrl })}
          customRequest={this.uploadImg}
          disabled={!canEdit}
          onRemove={this.onRemove}
          beforeUpload={(file) => this.beforeUpload(file, picSize)}
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
