import { HyperLinkItem } from './HyperLinkItem.jsx'
import "./BrandingBarStyles.css"

export function BrandingBar() {
    return (
        <div className='brandingBar'>
            <HyperLinkItem>
                {{
                    "iconClassName": "brandingBar-icon",
                    "icon": "src/static/images/branding-icon.svg",
                    "textClassName": "brandingBar-icon-noText",
                    "text": null
                }}
            </HyperLinkItem>
        </div>
    )
}
