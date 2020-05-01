import React from 'react'
import { Upload, message } from 'antd'
import { PureComponent } from 'react'
import config from 'services/target'
import axios from 'axios'

const newAxios = axios.create()

export default class UploadAttrImg extends PureComponent {
    upload = async file => {
        const { data: token } = await $api.common.getQiniuToken({}, { cache: true, cacheTimeout: +new Date() + 3600 * 1000 })
        const fileData = new FormData()
        fileData.append('token', token)
        fileData.append('file', file.file)
        const fileName = file.file.name
        const postfix = fileName.slice(fileName.lastIndexOf('.')) // 获取文件名后缀
        fileData.append('key', `${file.file.uid}${postfix}`)
        newAxios.post(config.qiniu_target, fileData).then(res => {
                this.props.uploadSuccess(`${config.qiniu_img_url}/${res.data.key}`)
            })
            .catch(err => {
                console.log(err, '上传失败')
                message.error('系统异常')
            })
    }
    // 上传之前校验
    beforeUpload = (file, size) => {
        const isLtSize = file.size / 1024 / 1024 < size
        if (!isLtSize) {
            message.error(`图片须小于${size}M`)
        }
        return new Promise((resolve, reject) => {
            if (isLtSize) {
                resolve(file)
            } else {
                reject(file)
            }
        })
    }
    render() {
        const {
            size = 1,
        } = this.props

        return (
            <Upload
                accept="image/*"
                customRequest={this.upload}
                beforeUpload={(file) => this.beforeUpload(file, size)}
                showUploadList={false}
            >
                {this.props.children}
            </Upload>
        )
    }
}
