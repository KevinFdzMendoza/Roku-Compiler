import { useState } from 'react'
import { HyperLinkItem } from './HyperLinkItem'
import "./FileManagerStyles.css";

class Node {
    constructor() {
        this.name = ""
        this.childNodes = {}
        this.isFolder = false
        this.item = ""
        this.parent = ""
    }

    set isFolder(isFolder) {
        this._isFolder = isFolder
    }
    get isFolder() {
        return this._isFolder
    }

    set item(item) {
        this._item = item
    }
    get item() {
        return this._item
    }

    set childNodes(node) {
        this._childNodes = node
    }
    get childNodes() {
        return this._childNodes
    }

    set parent(parent) {
        this._parent = parent
    }
    get parent() {
        return this._parent
    }

    set name(name) {
        this._name = name
    }
    get name() {
        return this._name
    }
}
// create class rootnode with the renderable item
class NodeTree {
    #children = []

    set root(root) {
        this._root = new Node()
        this._root.item = root.item
        this._root.childNodes = root.childNodes

        this.#children.push(this._root.item)
    }
    get root() {
        return this._root
    }

    /**
    * Adds node to a parent.
    * 
    *   - `newNode` as object: 
    * ```
    *   {
    *       "name": string with node name,
    *       "parent": string with parent name,
    *       "isFolder": boolean to declare if its folder or file
    *       "childNodes": object {} with tree node
    *   }
    *   ```
    * 
    * If no parent defined, node will be added to root node.
    */
    addNewNode(newNode) {
        if (this._root === undefined) return
        if (newNode.name === undefined) throw new TypeError("Missing node name")

        let node = new Node()
        node.name = newNode.name
        node.parent = newNode.parent
        node.isFolder = newNode.isFolder
        node.childNodes = newNode.childNodes

        if (newNode.parent === undefined || newNode.parent === "") {
            this._root.childNodes[newNode.name] = node
        } else {
            let path = newNode.parent.split("\\")
            let parentName = path[path.length- 1]

            let parentNode = this._root
            for (const el of path){
                parentNode = parentNode.childNodes[el]
            }

            if (parentName === parentNode.name) {
                parentNode.childNodes[newNode.name] = node
            }
        }
    }

    getRenderable() {
        this.#setNodeChildren(this._root.childNodes)
        this.#setRenderableArray(this._root.childNodes)

        return this.#children
    }

    #setNodeChildren(nodes, depth = 1) {
        // recursive setting
        let items = [];
        for (const key in nodes) {
            if (typeof nodes[key] === 'object') {

                const children = nodes[key].childNodes != undefined && Object.keys(nodes[key].childNodes).length !== 0 ?
                this.#setNodeChildren(nodes[key].childNodes, depth + 1) : null;
                console.log("Hola");

                const item = <div key={`Row_${depth}-${nodes[key].name}`}
                    className='fileManager-tree-node'>
                        <div className='fileManager-tree-node-bg'></div>
                        <HyperLinkItem>
                            {{
                                "iconClassName": "fileManager-element-icon",
                                "icon": nodes[key].isFolder ? "src/static/images/folder-icon.svg": "src/static/images/file-icon.svg",
                                "textClassName": "fileManager-element-text",
                                "text": nodes[key].name,
                                "wrapperClassName": "filemanager-element-hyperlink"
                            }}
                        </HyperLinkItem>
                        {children}
                </div>

                items.push(item);
            }
        }

        // push the root children with their respective children
        if (depth === 1) {
            this.#children.push(...items);
        }
        return items
    }

    #setRenderableArray() {
        
    }
}

function getdirectoryStruct() {
    const tree = new NodeTree()
    tree.root = {
        "name": "root",
        "item": <div key="root" className='fileManager-tree-root'>
                <HyperLinkItem>
                    {
                        {
                            "iconClassName": "fileManager-element-icon",
                            "icon": "src/static/images/project-icon-title.svg",
                            "textClassName": "fileManager-element-text",
                            "text": "Proyecto"
                        }
                    }
                </HyperLinkItem>
            </div>,
        "isFolder": true,
        "childNodes": {}
    }

    return tree
}

export function FileManager({}) {
    // const [count, setCount] = useState(0)

    // Mock data 
    const dataDirectory = [
        {"name":"components","path":"","isDirectory":true,"isFile":false},
        {"name":"images","path":"","isDirectory":true,"isFile":false},
        {"name":"manifest","path":"","isDirectory":false,"isFile":true},
        {"name":"source","path":"","isDirectory":true,"isFile":false},
        {"name":"BaseScreen","path":"components","isDirectory":true,"isFile":false},
        {"name":"MainScene.brs","path":"components","isDirectory":false,"isFile":true},
        {"name":"MainScene.xml","path":"components","isDirectory":false,"isFile":true},
        {"name":"main.brs","path":"source","isDirectory":false,"isFile":true},
        {"name":"ScreenComponent","path":"components\\BaseScreen","isDirectory":true,"isFile":false},
        {"name":"ScreenItem1","path":"components\\BaseScreen","isDirectory":true,"isFile":false},
        {"name":"ScreenItem2","path":"components\\BaseScreen","isDirectory":true,"isFile":false}
    ]

    const tree = getdirectoryStruct()

    // Add nodes with data
    for (const element of dataDirectory) {
        tree.addNewNode({
            "name": element.name,
            "parent": element.path,
            "isFolder": element.isDirectory,
            "childNodes": {}
        })
    }

    return (
        <div className='fileManager'>
            {
                tree.getRenderable()
            }
        </div>
    )
}
