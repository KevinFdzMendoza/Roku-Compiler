export function HyperLinkItem({isHover, children}) {
    return (
        <section>
            <img className={children.iconClassName} src={isHover ? children.hoverIcon : children.icon} />
            <span className={children.textClassName}>
                {children.text}
            </span>
        </section>
    )
}
