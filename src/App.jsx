import { useEffect, useState } from 'react'
import { BrandingBar } from './BrandingBar'
import { Sidebar } from './Sidebar'
import { FileManager } from './FileManager'
import { TextEditor } from "./TextEditor";
import { VideoPlayer } from "./VideoPlayer";
import { Terminal } from "./Terminal";
import './AppStyles.css'

function App() {
    const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 800px)").matches);

    // mock data while creating states of selecting components
    const [fileManagerRendered, setFileManagerRendered] = useState(false)
    const [textEditorRendered, setTextEditorRendered] = useState(true)
    const [videoPlayerRendered, setVideoPlayerRendered] = useState(true)
    const [terminalRendered, setTerminalRendered] = useState(true)

    const resetSelected = () => {
        setTextEditorRendered(true)
        setFileManagerRendered(false)
        setVideoPlayerRendered(false)
        setTerminalRendered(false)
    }

    useEffect(() => {
        // https://upmostly.com/tutorials/how-to-use-media-queries-in-react
        const query = "(max-width: 800px)";
        const media = window.matchMedia(query);
        if (media.matches !== isMobile) {
            setIsMobile(media.matches);
        }

        const resizeCallback = (e) => {
            setIsMobile(media.matches);
            if (media.matches) {
                resetSelected()
            }
        }
        window.addEventListener('resize', resizeCallback);

        return () => window.removeEventListener('resize', resizeCallback);
    }, [isMobile]);

    return (
        <>
            {/* Beautiful, but won't make it to the end release, no brand yet */}
            {/* <div className='compiler-branding'>
                <BrandingBar />
            </div> */}

            <SelectedComponents isMobile={isMobile} selectedObj={{fileManagerRendered, textEditorRendered, videoPlayerRendered, terminalRendered}} />
        </>
    )
}

function SelectedComponents({isMobile, selectedObj}) {
    if (typeof selectedObj != "object" || Object.keys(selectedObj).length === 0) return null

    const {fileManagerRendered, textEditorRendered, videoPlayerRendered, terminalRendered} = selectedObj

    if (isMobile) {
        let renderable = null

        // textEditor first
        if (textEditorRendered) {
            renderable = (
                <div className='mobile-editor'>
                    <TextEditor />
                </div>
            )
        } else if (fileManagerRendered) {
            renderable = (
                <div className='mobile-fileManager'>
                    <FileManager />
                </div>
            )
        } else if (videoPlayerRendered) {
            renderable = (
                <div className='mobile-videoPlayer'>
                    <VideoPlayer />
                </div>
            )
        } else if (terminalRendered) {
            renderable = (
                <div className='mobile-terminal'>
                    <Terminal />
                </div>
            )
        }

        return (
            <div className='mobile-panel'>
                {renderable}

                <div className='mobile-sidebar'>
                    <Sidebar />
                </div>
            </div>
        )
    } else {
        const devPanelRenderable = [null, null]
        let fileManagerRenderable = null

        if (fileManagerRendered) {
            fileManagerRenderable = (<div className='compiler-panel-fileManager'>
                <FileManager />
            </div>)
        }

        if (videoPlayerRendered) {
            devPanelRenderable[0] = (<div key="VideoPlayer" className='player-grid'>
                <VideoPlayer />
            </div>)
        }

        if (terminalRendered) {
            devPanelRenderable[1] = (<div key="Terminal" className='terminal-grid'>
                <Terminal />
            </div>)
        }

        return (
            <div className='compiler-panel'>
                <div className='compiler-panel-sidebar'>
                    <Sidebar />
                </div>

                {fileManagerRenderable}

                <div className={'dev-panel ' + (fileManagerRendered ? 'panel-col3' : 'panel-col2')}>
                    <div className={getEditorClass({videoPlayerRendered, terminalRendered})}>
                        <TextEditor />
                    </div>
                    {devPanelRenderable}
                </div>
            </div>
        )
    }
}

function getEditorClass(renderedComponents) {
    if (typeof renderedComponents != "object" || Object.keys(renderedComponents).length === 0) return ''
    const {videoPlayerRendered, terminalRendered} = renderedComponents

    if (videoPlayerRendered && terminalRendered) {
        return "editor-mini"
    } else if (terminalRendered) {
        return "editor-half-height"
    } else if (videoPlayerRendered) {
        return "editor-half-width"
    } else {
        return "editor-full"
    }
}

export default App
