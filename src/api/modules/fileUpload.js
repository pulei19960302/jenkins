/**
 * Created by hetingfeng on 2018/11/1.
 */

import axios from 'axios';
import lrz from 'lrz';
import { Message } from 'element-ui';
import { constants } from '@/OMS/utils';

/**
 * 文件服务器（目前不支持多张）
 * 上传前统一压缩
 * @param file   传入file/base64
 * @returns res  error: oversize
 *               success: 将返回url
 */
const fileUpload = file => {
    const formData = new FormData();
    const fileTarget = constants.FILE_TARGET[process.env.NODE_ENV];
    if (file.size >= (1024 * 1024 * 10)) {
        Message.error('图片不能大于10M，请重新选择');
        Promise.reject({ oversize: true });
        return;
    }
    return (
        lrz(file, {
            quality: 0.5
        })
            .then(res => {
                // gif不压缩, 否者会变为静态图
                if (file.type === 'image/gif') formData.append(file.name, file);
                else formData.append(file.name, res.file);
                return axios(fileTarget,
                    {
                        method: 'post',
                        data: formData,
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
            })
            .catch(() => {
                Message.error('图片压缩失败，请重试');
            })
    );
};
export default fileUpload;
