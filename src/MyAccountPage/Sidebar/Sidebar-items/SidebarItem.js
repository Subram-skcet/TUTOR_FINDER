import React from 'react'
import './SidebarItem.css'
const SidebarItem = ({field,Icon}) => {
  return (
    <div>
        <div className='sb-items'>
            <Icon size="2.5em"/>
            <p className='sb-para'>{field}</p>
        </div>
    </div>
  )
}

export default SidebarItem