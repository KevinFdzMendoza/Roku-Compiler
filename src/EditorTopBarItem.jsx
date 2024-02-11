import { useState } from 'react'
import { HyperLinkItem } from './HyperLinkItem.jsx'

export function EditorTopBarItem({children}) {
    // const [count, setCount] = useState(0)

    const params = {
        "iconClassName": children.iconClassName,
        "textClassName": children.textClassName,
        "text": children.title,
        "icon": children.icon
    }
    return (
        <div className={children.className}>
            <HyperLinkItem>
                {params}
            </HyperLinkItem>
        </div>
    )
}
