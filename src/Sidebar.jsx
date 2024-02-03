import { useState } from 'react'
import { SidebarItem } from './SidebarItem'
import './SidebarStyles.css'

export function Sidebar() {
    // const [count, setCount] = useState(0)

    return (
        <div className='sidebar-elements'>
            <SidebarItem />
        </div>
    )
}
