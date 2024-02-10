import { useState } from 'react'
import { HyperLinkItem } from './HyperLinkItem'
import './SidebarStyles.css'

export function SidebarItem({content, setSelectedButton, isMobile}) {
    if (typeof content != "object" || Object.keys(content).length === 0) return (null)

    const [selectedItems, setSelectedItems] = useState({"TextEditor": true});
    const [isMouseDown, setIsMouseDown] = useState({})
    const [hoverItem, setHoverItem] = useState({})

    const mouseEnter = (element) => setHoverItem({[element.id]: true})
    const mouseLeave = (element) => setHoverItem({[element.id]: false})
    const mouseDown = (element) => setIsMouseDown({[element.id]: true})
    const mouseUp = (element) => setIsMouseDown({[element.id]: false})
    const itemSelected = (element) => {
        if (element == null) return

        const id = element.id

        setSelectedItems((prevSelectedItems) => {
            if (isMobile) {
                if (prevSelectedItems[id] != null) return prevSelectedItems
                return {
                    [id]: !prevSelectedItems[id]
                }
            }

            if (id == "TextEditor") return prevSelectedItems
            return {
                ...prevSelectedItems,
                [id]: !prevSelectedItems[id]
            }
        });

        setSelectedButton(id);
    };

    return (
        <>
            {
                content.map(element => {
                    const id = element.id ?? ""

                    return (id.length > 0)
                    ? ( <button
                            onClick={() => itemSelected(element)}
                            key={id}
                            id={id}
                            className={`sidebar-element-button ${selectedItems[id] ? "selected" : "unSelected"}`}
                            onMouseEnter={() => mouseEnter(element)}
                            onMouseLeave={() => mouseLeave(element)}
                            onMouseDown={() => mouseDown(element)}
                            onMouseUp={() => mouseUp(element)}
                        >
                            <HyperLinkItem key={id} isHover={hoverItem[id]} isClickDown={isMouseDown[id] && !selectedItems[id]}>
                                {element}
                            </HyperLinkItem>
                        </button> )
                    : null
                })
            }
        </>
    )
}
