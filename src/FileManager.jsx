import { HyperLinkItem } from './HyperLinkItem'
import "./FileManagerStyles.css";
import { useState, useRef, useLayoutEffect } from 'react'

const CONTAINER_WIDTH = 237
const PADDING_PER_CHILD = 20

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
        {"name":"VeryLongComponentForTest","path":"components\\BaseScreen","isDirectory":true,"isFile":false},
        {"name":"ScreenItem1","path":"components\\BaseScreen","isDirectory":true,"isFile":false},
        {"name":"ScreenItem2","path":"components\\BaseScreen","isDirectory":true,"isFile":false},
        {"name":"ScreenItem1","path":"components\\BaseScreen\\ScreenItem1","isDirectory":true,"isFile":false},
        {"name":"ScreenItem1","path":"components\\BaseScreen\\ScreenItem1\\ScreenItem1","isDirectory":true,"isFile":false}
    ]

    const tree = getdirectoryStruct()
    fillTreeNodes(tree, dataDirectory)

    return (
        <div className='fileManager' style={{width:`${CONTAINER_WIDTH}px`}}>
            { tree.getRenderable() }
        </div>
    )
}

/**
* Creates a tree node object
*/
class Node {
    constructor() {
        this.name = ""
        this.childNodes = {}
        this.isFolder = false
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

/**
 * Creates a tree structure.
 * 
 * It will be necessary to set the root node
 */
class NodeTree {
    #childrenArray = []
    constructor() {
        this.#initializeRootNode()
    }

    set root(root) {
        this._root = new Node()
        this._root.name = root.name
        this._root.isFolder = root.isFolder
        this._root.childNodes = root.childNodes

        this.#childrenArray.push(root.renderable)
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
    *       "childNodes": object {} with tree child node
    *   }
    *   ```
    * 
    * If no parent defined, node will be added to root node.
    */
    addNewNode(newNode) {
        if (this._root === undefined) return new Error("No root node has been set")
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

    /**
     * loops trough the child nodes in the root node and starts setting the renderable components
     * @returns array with renderable components of the tree structure
     */
    getRenderable() {
        if (this._root === undefined) return new Error("No root node has been set")

        this.#setNodeChildren(this._root.childNodes)

        return this.#childrenArray
    }

    /**
     * Fills recursively children array with renderable components
     */
    #setNodeChildren(nodes, depth = 1) {
        // recursive setting
        let items = [];

        for (const key in nodes) {
            if (typeof nodes[key] === 'object') {
                const childNode = nodes[key]
                const childNodeChildren = typeof childNode.childNodes === 'object' && Object.keys(childNode.childNodes).length !== 0
                    ? this.#setNodeChildren(childNode.childNodes, depth + 1)
                    : null;

                const item = <div key={`Row_${depth}-${childNode.name}`} className='fileManager-tree-node' style={{paddingLeft:`${PADDING_PER_CHILD}px`, width:`${CONTAINER_WIDTH + (PADDING_PER_CHILD * depth)}px`}}>
                    <HyperLinkItem>
                        {{
                            "iconClassName": "fileManager-element-icon",
                            "icon": childNode.isFolder ? "src/static/images/folder-icon.svg": "src/static/images/file-icon.svg",
                            "textClassName": "fileManager-element-text",
                            "text": childNode.name
                        }}
                    </HyperLinkItem>
                    {childNodeChildren}
                </div>

                items.push(item);
            }
        }

        // push the root children with their respective children
        if (depth === 1) {
            this.#childrenArray.push(...items);
        }
        return items
    }

    /**
     * fills root node
     */
    #initializeRootNode() {
        this.root = {
            "name": "root",
            "renderable": <div key="root" className='fileManager-tree-root'>
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
    }
}

function getdirectoryStruct() {
    const tree = new NodeTree()

    return tree
}

function fillTreeNodes(treeStructure, data) {
    // Add nodes with data
    for (const element of data) {
        treeStructure.addNewNode({
            "name": element.name,
            "parent": element.path,
            "isFolder": element.isDirectory,
            "childNodes": {}
        })
    }
}
