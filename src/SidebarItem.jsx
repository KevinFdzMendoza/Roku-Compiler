import { HyperLinkItem } from './HyperLinkItem'
import './SidebarStyles.css'

export function SidebarItem({content, setSelectedButton}) {
    if (typeof content != "object" || Object.keys(content).length === 0) return (null)

    const itemSelected = (e) => {
        if (e == null) return

        const id = (e.currentTarget ?? {}).id ?? ""
        setSelectedButton(id)
    }

    return (
        <>
            {
                content.map(element => {
                    return (typeof element.id === "string" && element.id.length > 0)
                    ? ( <button onClick={itemSelected} key={element.id} id={element.id} className='sidebar-element-button'>
                            <HyperLinkItem key={element.id}>
                                {element}
                            </HyperLinkItem>
                        </button> )
                    : null
                })
            }
        </>
    )
}
