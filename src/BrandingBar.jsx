import { HyperLinkItem } from './HyperLinkItem.jsx'
import brandingIcon from "./static/images/branding-icon.svg"
import "./BrandingBarStyles.css"

export function BrandingBar() {
    return (
        <div className='brandingBar'>
            <HyperLinkItem>
                {{
                    "iconClassName": "brandingBar-icon",
                    "icon": brandingIcon,
                    "textClassName": "brandingBar-icon-noText",
                    "text": null
                }}
            </HyperLinkItem>
        </div>
    )
}
