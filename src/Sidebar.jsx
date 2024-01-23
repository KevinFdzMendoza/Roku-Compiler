import { useState } from 'react'
import { SidebarElement } from './SidebarElement'
import './SidebarStyles.css'

export function Sidebar() {
    // const [count, setCount] = useState(0)

    return (
        <div className='sidebar-elements'>
            <SidebarElement />
        </div>
    )
}
