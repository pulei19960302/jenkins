import React from 'react'
import style from './index.less'

function columns({ fields }) {
  return (
    <div className={style.columns}>
      {
        fields.map(field => {
          const { styles = {}, title = '' } = field
          const newTitle = (typeof title === 'function') ? title() : title
          return (
            <div key={field.key} className={style.col} style={{ flex: field.span, ...styles }}>
              {newTitle}
            </div>
          )
        })
      }
    </div>
  )
}

export default columns
