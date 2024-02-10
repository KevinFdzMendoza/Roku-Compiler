import { useState } from 'react'
import { HyperLinkItem } from './HyperLinkItem'
import './SidebarStyles.css'

export function SidebarItem({content, setSelectedButton, isMobile}) {
    if (typeof content != "object" || Object.keys(content).length === 0) return (null)
    const [selectedItems, setSelectedItems] = useState({"TextEditor": true});

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
                        >
                            <HyperLinkItem key={id}>
                                {element}
                            </HyperLinkItem>
                        </button> )
                    : null
                })
            }
        </>
    )
}
