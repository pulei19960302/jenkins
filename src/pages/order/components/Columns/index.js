import React from 'react'
import style from './index.less'

function columns({ fields }) {
  return (
    <div className={style.columns}>
      {fields.map(field => (
        <div key={field.key} className={style.col} style={{ flex: field.span }}>
          {field.title}
        </div>
      ))}
    </div>
  )
}

export default columns
