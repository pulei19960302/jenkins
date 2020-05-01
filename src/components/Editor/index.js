import React from 'react'
import uploadImage from './uploadImage'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

export default class EditorDemo extends React.Component {
  handleEditorChange = editorState => {
    const { onChange } = this.props
    onChange && onChange(editorState)
  }

  uploadFn = async param => {
    const { data: token } = await $api.common.getQiniuToken({},{cache:true,cacheTimeout:+new Date()+3600*1000})
    uploadImage(param,token)
  }

  render() {
    const { editorState, editorProps, style={} } = this.props
    return (
      <div className="my-component" style={{...style}}>
        <BraftEditor
          value={editorState}
          defaultValue={editorState}
          onChange={this.handleEditorChange}
          // imageControls={[]}
          imageResizable={false}
          media={{
            uploadFn: this.uploadFn,
            image:
              'image/png,image/jpeg,image/gif,image/webp,image/apng,image/svg',
            video: false,
            audio: false,
          }}
          {...editorProps}
        />
      </div>
    )
  }
}
