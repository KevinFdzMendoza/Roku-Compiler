import { useState } from 'react'
import { BrandingBar } from './BrandingBar'
import { Sidebar } from './Sidebar'
import { FileManager } from './FileManager'
import { TextEditor } from "./TextEditor";
import { VideoPlayer } from "./VideoPlayer";
import { Terminal } from "./Terminal";
import './AppStyles.css'

function App() {
    const [fileManagerRendered, setFileManagerRendered] = useState(true)

    // mock data while creating states of selecting components
    const renderedComponents = {
        "VideoPlayer": {
            "component": (<div key="VideoPlayer" className='player-grid'>
                <VideoPlayer />
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
    // function renderComponents() {
    //     setFileManagerRendered(true)
    // }

    return (
        <>
            {/* Beautiful, but won't make it to the end release, no brand yet */}
            {/* <div className='compiler-branding'>
                <BrandingBar />
            </div> */}

            <div className='compiler-panel'>
                <div className='compiler-panel-sidebar'>
                    <Sidebar />
                </div>

                <RenderFileManager rendered={fileManagerRendered} />

                <div className={'dev-panel ' + (fileManagerRendered ? 'compiler-panel-devDashBoard-1' : 'compiler-panel-devDashBoard-2')}>
                    <div className={getEditorClass(renderedComponents)}>
                        <TextEditor renderedComponents={renderedComponents} />
                    </div>
                    <DevPanelComponents renderedComponents={renderedComponents} />
                </div>
            </div>
        </>
    )
}

function RenderFileManager({rendered}) {
    return (rendered) ? (
        <div className='compiler-panel-fileManager'>
            <FileManager />
        </div>
    ) : (null)
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
