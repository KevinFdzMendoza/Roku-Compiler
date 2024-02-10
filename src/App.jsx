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
    const [fileManagerSelected, setFileManagerSelected] = useState(false)
    const [textEditorSelected, setTextEditorSelected] = useState(true)
    const [videoPlayerSelected, setVideoPlayerSelected] = useState(false)
    const [terminalSelected, setTerminalSelected] = useState(false)

    const setSelectedComponents = (selected) => {
        if (typeof selected != "string" && selected.length == 0) return
        if (isMobile) resetSelected()

        if (selected == "FileManager") {
            setFileManagerSelected(isMobile ? true : !fileManagerSelected)
        } else if (selected == "TextEditor") {
            setTextEditorSelected(isMobile ? true : !textEditorSelected)
        } else if (selected == "VideoPlayer") {
            setTerminalSelected(isMobile ? true : !terminalSelected)
        } else if (selected == "Terminal") {
            setVideoPlayerSelected(isMobile ? true : !videoPlayerSelected)
        }
    }

    const resetSelected = () => {
        setTextEditorSelected(false)
        setFileManagerSelected(false)
        setVideoPlayerSelected(false)
        setTerminalSelected(false)
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
                setTextEditorSelected(true)
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

            <SelectedComponents
                isMobile={isMobile}
                setSelectedFunc={setSelectedComponents}
                selectedObj={{fileManagerSelected, textEditorSelected, videoPlayerSelected, terminalSelected}}
            />
        </>
    )
}

function SelectedComponents({isMobile, setSelectedFunc, selectedObj}) {
    if (typeof selectedObj != "object" || Object.keys(selectedObj).length === 0) return null

    if (isMobile) {
        return renderMobileComponents(isMobile, setSelectedFunc, selectedObj)
    } else {
        return renderComponents(isMobile, setSelectedFunc, selectedObj)
    }
}

function renderMobileComponents(isMobile, setSelectedFunc, selectedObj) {
    const {fileManagerSelected, textEditorSelected, videoPlayerSelected, terminalSelected} = selectedObj
    let renderable = null

    // textEditor first
    if (textEditorSelected) {
        renderable = (
            <div className='mobile-editor'>
                <TextEditor />
            </div>
        )
    } else if (fileManagerSelected) {
        renderable = (
            <div className='mobile-fileManager'>
                <FileManager />
            </div>
        )
    } else if (videoPlayerSelected) {
        renderable = (
            <div className='mobile-videoPlayer'>
                <VideoPlayer />
            </div>
        )
    } else if (terminalSelected) {
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
                <Sidebar isMobile={isMobile} setSelected={setSelectedFunc} />
            </div>
        </div>
    )
}

function renderComponents(isMobile, setSelectedFunc, selectedObj) {
    const {fileManagerSelected, textEditorSelected, videoPlayerSelected, terminalSelected} = selectedObj
    const devPanelRenderable = [null, null]
    let fileManagerRenderable = null

    if (fileManagerSelected) {
        fileManagerRenderable = (<div className='compiler-panel-fileManager'>
            <FileManager />
        </div>)
    }

    if (videoPlayerSelected) {
        devPanelRenderable[0] = (<div key="VideoPlayer" className='player-grid'>
            <VideoPlayer />
        </div>)
    }

    if (terminalSelected) {
        devPanelRenderable[1] = (<div key="Terminal" className='terminal-grid'>
            <Terminal />
        </div>)
    }

    return (
        <div className='compiler-panel'>
            <div className='compiler-panel-sidebar'>
                <Sidebar isMobile={isMobile} setSelected={setSelectedFunc} />
            </div>

            {fileManagerRenderable}

            <div className={'dev-panel ' + (fileManagerSelected ? 'panel-col3' : 'panel-col2')}>
                <div className={getEditorClass({videoPlayerSelected, terminalSelected})}>
                    <TextEditor />
                </div>
                {devPanelRenderable}
            </div>
        </div>
    )
}

function getEditorClass(renderedComponents) {
    if (typeof renderedComponents != "object" || Object.keys(renderedComponents).length === 0) return ''
    const {videoPlayerSelected, terminalSelected} = renderedComponents

    if (videoPlayerSelected && terminalSelected) {
        return "editor-mini"
    } else if (terminalSelected) {
        return "editor-half-height"
    } else if (videoPlayerSelected) {
        return "editor-half-width"
    } else {
        return "editor-full"
    }
}

export default App
