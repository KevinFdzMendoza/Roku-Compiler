import { useState } from 'react'

export function HyperLinkItem({children}) {
    // const [count, setCount] = useState(0)

    return (
        <section className={children.wrapperClassName}>
            <img className={children.iconClassName} src={children.icon} />
            <span className={children.textClassName}>
                {children.text}
            </span>
        </section>
    )
}
