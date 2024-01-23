import { useState } from 'react'
import './AppStyles.css'
import { Sidebar } from './Sidebar'
import { FileManager } from './FileManager'

function App() {
    // const [count, setCount] = useState(0)

    return (
        <>
            <Sidebar />
            <FileManager />
        </>
    )
}

export default App
