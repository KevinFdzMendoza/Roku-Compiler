import { SidebarItem } from './SidebarItem.jsx'
import './SidebarStyles.css'
import projectIcon from './static/images/project-icon.svg'
import projectIconHover from './static/images/project-icon-hover.svg'
import projectIconSelected from './static/images/project-icon-selected.svg'
import txtEditorIcon from './static/images/txtEditor-icon.svg'
import txtEditorIconHover from './static/images/txtEditor-icon-hover.svg'
import txtEditorIconSelected from './static/images/txtEditor-icon-selected.svg'
import playIcon from './static/images/play-icon.svg'
import playIconHover from './static/images/play-icon-hover.svg'
import playIconSelected from './static/images/play-icon-selected.svg'
import consoleIcon from './static/images/console-icon.svg'
import consoleIconHover from './static/images/console-icon-hover.svg'
import consoleIconSelected from './static/images/console-icon-selected.svg'

export function Sidebar({isMobile, setSelected}) {
    const buttonsObj = [
        {
            "id": "FileManager",
            "iconClassName": "sidebar-element-button-icon",
            "textClassName": "sidebar-element-button-text",
            "icon": projectIcon,
            "hoverIcon": projectIconHover,
            "selectIcon": projectIconSelected,
            "text": "Archivos"
        },
        {
            "id": "TextEditor",
            "iconClassName": "sidebar-element-button-icon",
            "textClassName": "sidebar-element-button-text",
            "icon": txtEditorIcon,
            "hoverIcon": txtEditorIconHover,
            "selectIcon": txtEditorIconSelected,
            "text": "Editor"
        },
        {
            "id": "VideoPlayer",
            "iconClassName": "sidebar-element-button-icon",
            "textClassName": "sidebar-element-button-text",
            "icon": playIcon,
            "hoverIcon": playIconHover,
            "selectIcon": playIconSelected,
            "text": "Video"
        },
        {
            "id": "Terminal",
            "iconClassName": "sidebar-element-button-icon",
            "textClassName": "sidebar-element-button-text",
            "icon": consoleIcon,
            "hoverIcon": consoleIconHover,
            "selectIcon": consoleIconSelected,
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
