import { SidebarItem } from './SidebarItem'
import './SidebarStyles.css'

export function Sidebar({setSelected}) {
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

    const onSelected = (idSelected) => {
        if (typeof idSelected != "string" && idSelected.length == 0) return

        setSelected(idSelected)
    }

    return (
        <div className='sidebar'>
            <div className='sidebar-elements'>
                <SidebarItem content={buttonsObj} setSelectedButton={onSelected} />
            </div>
        </div>
    )
}
