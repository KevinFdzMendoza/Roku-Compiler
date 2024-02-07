import { useState } from 'react'
import './AppStyles.css'
import { Sidebar } from './Sidebar'
import { FileManager } from './FileManager'
import { TextEditor } from "./TextEditor";
import { Terminal } from "./Terminal";

function App() {
    // const [count, setCount] = useState(0)

    // mock data while creating states of selecting components
    const renderedComponents = {
        // change this component to the videoplayer when created
        "VideoPlayer": {
            "component": (<div key="VideoPlayer" className='player-grid'>
                <TextEditor renderedComponents={{}} />
            </div>),
            "rendered": true
        },
        "Terminal": {
            "component": (<div key="Terminal" className='terminal-grid'>
                <Terminal />
            </div>),
            "rendered": true
        }
    }

    return (
        <>
            <Sidebar />
            <FileManager />
            <div className='dev-panel'>
                <div className={getEditorClass(renderedComponents)}>
                    <TextEditor renderedComponents={renderedComponents} />
                </div>
                <DevPanelComponents renderedComponents={renderedComponents} />
            </div>
        </>
    )
}

function DevPanelComponents({renderedComponents}) {
    const renderable = [undefined, undefined]

    if (renderedComponents.VideoPlayer.rendered) {
        renderable[0] = (renderedComponents.VideoPlayer.component)
    }

    if (renderedComponents.Terminal.rendered) {
        renderable[1] = (renderedComponents.Terminal.component)
    }

    return renderable
}

function getEditorClass(renderedComponents) {
    let VideoPlayerRendered = renderedComponents.VideoPlayer.rendered
    let TerminalRendered = renderedComponents.Terminal.rendered

    if (VideoPlayerRendered && TerminalRendered) {
        return "editor-mini"
    } else if (TerminalRendered) {
        return "editor-half-height"
    } else if (VideoPlayerRendered) {
        return "editor-half-width"
    } else {
        return "editor-full"
    }
}

export default App
