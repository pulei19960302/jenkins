import React from 'react'
import { FSwitch } from 'components';
export default ({className, onChange, defaultChecked, name, desc }) => {
  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center' }}>
      {name && (
        <div
          style={{
            color: 'rgba(0,0,0,0.85)',
            fontWeight: 'bold',
            fontSize: 14,
            width: 94,
          }}
        >
          {name}
        </div>
      )}
      <FSwitch onChange={onChange} value={defaultChecked} texts={['是','否']}></FSwitch>
      <div className="ml8" style={{ color: 'rgba(0,0,0,0.65)', fontSize: 12 }}>
        {defaultChecked ? `已开启${desc[0] || ''}` : `已关闭${desc[1] || ''}`}
      </div>
    </div>
  )
}
