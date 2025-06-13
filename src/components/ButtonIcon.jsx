import React from 'react'

export default function ButtonIcon({children,icon, bg, color, onClick, disabled}) {
  return (
    <div className="btn-icon" onClick={onClick} style={{backgroundColor: bg, color: color}} disabled={disabled}>
        <div className="btn-icon-text">
            {children}
        </div>
        <div className="btn-icon-icon">
            {icon}
        </div>
    </div>
  )
}
