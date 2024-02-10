import { SidebarItem } from './SidebarItem'
import './SidebarStyles.css'

export function Sidebar({isMobile, setSelected}) {
    const buttonsObj = [
        {
            "id": "FileManager",
            "iconClassName": "sidebar-element-button-icon",
            "textClassName": "sidebar-element-button-text",
            "icon": 'src/static/images/project-icon.svg',
            "hoverIcon": 'src/static/images/project-icon-hover.svg',
            "text": "Archivos"
        },
        {
            "id": "TextEditor",
            "iconClassName": "sidebar-element-button-icon",
            "textClassName": "sidebar-element-button-text",
            "icon": 'src/static/images/txtEditor-icon.svg',
            "hoverIcon": 'src/static/images/txtEditor-icon-hover.svg',
            "text": "Editor"
        },
        {
            "id": "VideoPlayer",
            "iconClassName": "sidebar-element-button-icon",
            "textClassName": "sidebar-element-button-text",
            "icon": 'src/static/images/play-icon.svg',
            "hoverIcon": 'src/static/images/play-icon-hover.svg',
            "text": "Video"
        },
        {
            "id": "Terminal",
            "iconClassName": "sidebar-element-button-icon",
            "textClassName": "sidebar-element-button-text",
            "icon": 'src/static/images/console-icon.svg',
            "hoverIcon": 'src/static/images/console-icon-hover.svg',
            "text": "Terminal"
        }
    ]

    const onSelected = (idSelected) => {
        if (typeof idSelected != "string" && idSelected.length == 0) return

        setSelected(idSelected)
    }

    return (
        <div className='sidebar'>
            <div className='sidebar-elements'>
                <SidebarItem content={buttonsObj} setSelectedButton={onSelected} isMobile={isMobile} />
            </div>
        </div>
    )
}
