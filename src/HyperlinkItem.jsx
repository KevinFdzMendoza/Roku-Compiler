export function HyperLinkItem({isHover, isClickDown, children}) {
    return (
        <section>
            <img className={children.iconClassName} src={isClickDown ? children.selectIcon : isHover ? children.hoverIcon : children.icon} />
            <span className={children.textClassName}>
                {children.text}
            </span>
        </section>
    )
}
