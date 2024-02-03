import { useState } from 'react'
import { HyperLinkItem } from './HyperLinkItem'
import './SidebarStyles.css'

export function SidebarItem() {
    // const [count, setCount] = useState(0)

    // Mock data 
    // Esta data debe venir de más arriba
    const buttonsObj = [
        {
            "id": "project-icon",
            "iconClassName": "sidebar-element-button-icon",
            "textClassName": "sidebar-element-button-text",
            "icon": 'src/static/images/project-icon.svg',
            "text": "Archivos"
        },
        {
            "id": "txtEditor-icon",
            "iconClassName": "sidebar-element-button-icon",
            "textClassName": "sidebar-element-button-text",
            "icon": 'src/static/images/txtEditor-icon.svg',
            "text": "Editor"
        },
        {
            "id": "console-icon",
            "iconClassName": "sidebar-element-button-icon",
            "textClassName": "sidebar-element-button-text",
            "icon": 'src/static/images/console-icon.svg',
            "text": "Terminal"
        },
        {
            "id": "play-icon",
            "iconClassName": "sidebar-element-button-icon",
            "textClassName": "sidebar-element-button-text",
            "icon": 'src/static/images/play-icon.svg',
            "text": "Video"
        }
    ]

    return (
        <>
            {
                buttonsObj.map(element => {
                    return (
                        <button key={element.id} className='sidebar-element-button'>
                            <HyperLinkItem key={element.id}>
                                {element}
                            </HyperLinkItem>
                        </button>
                    )
                })
            }
        </>
    )
}
