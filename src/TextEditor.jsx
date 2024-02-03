import { useState, useRef } from 'react'
import { Editor } from '@monaco-editor/react'
import { Draggable } from "./Draggable"
import { EditorTopBarItem } from "./EditorTopBarItem"
import { HyperLinkItem } from './HyperLinkItem'
import "./TextEditorStyles.css"

export function TextEditor() {
    // const [count, setCount] = useState(0)

    // mock data
    const text = 'sub runUserInterface()<br/>    m.port = CreateObject("roMessagePort")<br/>    screen = createScreen()<br/><br/>    while true<br/>        msg = wait(0, m.port)<br/>	    msgType = type(msg)<br/>        if msgType = "roSGScreenEvent"<br/>            if msg.isScreenClosed() then return<br/>        else if msgType = invalid<br/>            ?"Invalid event"<br/>        end if<br/>    end while<br/>end sub<br/><br/>function createScreen() as object<br/>    screen = createObject("roSGScreen")<br/>    screen.setMessagePort(m.port)<br/><br/>    scene = screen.createScene("MainScene")<br/>    scene.allowBackgroundTask = true<br/>    screen.show()<br/><br/>    return screen<br/>end function<br/>'
    let newText = text.replaceAll("<br/>", "\n")

    // mock data
    const openedFiles = [
        {
            "name": "MainScene.xml",
            "icon": "",
            "path": "components",
            "selected": false,
            "text": text
        },
        {
            "name": "MainScene.brs",
            "icon": "",
            "path": "components",
            "selected": true,
            "text": text
        },
        {
            "name": "Add",
            "icon": "src/static/images/add-icon.svg",
            "path": "",
            "selected": false,
            "text": ""
        }
    ]
    const containerSizes = getContainerSizes() 
    const editorAttributes = getEditorAttributes()
    const renderableFiles = []
    for (const file of openedFiles) {
        const item = <EditorTopBarItem key={`${file.path}\\${file.name}`} >
            {{
                "className": file.selected ? "textEditor-fileSelector-element-selected" : "textEditor-fileSelector-element",
                "iconClassName": file.icon != "" ? "textEditor-fileSelector-element-icon": "textEditor-fileSelector-element-no-icon",
                "textClassName": file.name != "Add" ? "textEditor-fileSelector-element-text" : "textEditor-fileSelector-element-no-text",
                "title": file.name != "Add" ? file.name : null,
                "icon": file.icon != "" ? file.icon : null
            }}
        </EditorTopBarItem>
        renderableFiles.push(item)
    }

    return (
        <div className='textEditor' style={containerSizes}>
            <Draggable topClass={containerSizes.width != "100vw" ? "textEditor-fileSelector" : "textEditor-fileSelector-long"}>
                {renderableFiles}
            </Draggable>

            <Editor
                defaultValue={newText}
                beforeMount={editorAttributes.setEditorTheme}
                options={editorAttributes.options}
                theme={editorAttributes.theme} >
            </Editor>

            <div className='textEditor-debug-icon'>
                <HyperLinkItem>
                    {{
                        "iconClassName":"textEditor-textArea-icon",
                        "icon": "src/static/images/debug-icon.svg",
                        "textClassName": "textEditor-fileSelector-element-no-text",
                        "text": null
                    }}
                </HyperLinkItem>
            </div>
        </div>
    )
}

function getContainerSizes() {
    // mock data while creating new components
    let valorDeOtrosComponentes = {
        "VideoPlayer": {
            "rendered": true
        },
        "OutputTerminal": {
            "rendered": true
        }
    }

    const containerWidth = valorDeOtrosComponentes.VideoPlayer.rendered
        ? "536px"
        : "100vw"
    const containerHeight = valorDeOtrosComponentes.OutputTerminal.rendered
        ? "525px"
        : "100vh"

    return {
        width:containerWidth,
        height: containerHeight
    }
}

function getEditorAttributes() {
    return {
        // "CTAs": {
        //     "debug": {
        //         "iconClassName":"textEditor-textArea-icon",
        //         "icon": "src/static/images/debug-icon.svg",
        //         "textClassName": "textEditor-fileSelector-element-no-text",
        //         "text": null
        //     },
        //     "save": {

        //     }
        // },
        "options": {
            wordWrap: "on",
            bracketPairColorization: {
                enabled: true
            },
            minimap: {
                enabled: false
            },
            lineNumbersMinChars: 3
        },
        "setEditorTheme": (monaco) => {
            // https://code.visualstudio.com/api/references/theme-color
            monaco.editor.defineTheme('roku-editor', {
                base: 'vs-dark',
                inherit: false,
                rules: [],
                colors: {
                    "editor.foreground": "#F2E6FF",
                    "editor.background": "#303030",
                    "editor.selectionBackground": "#9659BF",
                    "editor.lineHighlightBackground": "#474747",
                    'editor.inactiveSelectionBackground': '#854A88',
                    "editor.findMatchBackground": "#867b92",
                    "editor.findMatchHighlightBackground": "#5a295d",
                    "editorLineNumber.foreground": "#727272",
                    "editorLineNumber.activeForeground": "#afafaf"
                }
            });
        },
        "theme": "roku-editor"
    }
}
