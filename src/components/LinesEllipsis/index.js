import React, { useState } from 'react'
import { Tooltip } from 'antd'
import LinesEllipsis from 'react-lines-ellipsis'
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)

const Ellipsis = ({ text, maxLine, style }) => {
  const defaultStyle = { whiteSpace: 'pre-wrap' }
  const [visible, changeVisible] = useState(false)
  const handleReflow = text => {
    changeVisible(text.clamped)
  }
  if (visible) {
    return (
      <Tooltip title={text}>
        <ResponsiveEllipsis
          text={text || ''}
          maxLine={maxLine}
          onReflow={handleReflow}
          style={{ ...defaultStyle, ...style }}
        />
      </Tooltip>
    )
  } else {
    return (
      <ResponsiveEllipsis
        style={{ ...defaultStyle, ...style }}
        text={text || ''}
        maxLine={maxLine}
        onReflow={handleReflow}
      />
    )
  }
}

export default Ellipsis
