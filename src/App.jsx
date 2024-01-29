import { useState } from 'react'
import './AppStyles.css'
import { Sidebar } from './Sidebar'
import { FileManager } from './FileManager'
import { TextEditor } from "./TextEditor";

function App() {
    // const [count, setCount] = useState(0)

    return (
        <>
            <Sidebar />
            <FileManager />
            <TextEditor />
        </>
    )
}

export default App
