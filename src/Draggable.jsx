import { useState, useRef } from 'react'

// https://stackoverflow.com/questions/75833107/click-and-drag-to-scroll-with-mouse-react-typescript-component
export function Draggable({topClass, styles = {}, children}) {
    const tagRef = useRef(null);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const mouseCoords = useRef({
        startX: 0,
        startY: 0,
        scrollLeft: 0,
        scrollTop: 0
    });

    const handleDragStart = (e) => {
        if (!tagRef.current) return

        const slider = tagRef.current;
        const startX = e.pageX - slider.offsetLeft;
        const startY = e.pageY - slider.offsetTop;
        const scrollLeft = slider.scrollLeft;
        const scrollTop = slider.scrollTop;
        mouseCoords.current = { startX, startY, scrollLeft, scrollTop }
        setIsMouseDown(true)
        document.body.style.cursor = "grabbing"
    }

    const handleDragEnd = () => {
        setIsMouseDown(false)
        if (!tagRef.current) return

        document.body.style.cursor = "default"
    }

    const handleDrag = (e) => {
        if (!isMouseDown || !tagRef.current) return;

        e.preventDefault();
        const slider = tagRef.current
        const x = e.pageX - slider.offsetLeft;
        const y = e.pageY - slider.offsetTop;
        const walkX = (x - mouseCoords.current.startX) * 1.5;
        const walkY = (y - mouseCoords.current.startY) * 1.5;
        slider.scrollLeft = mouseCoords.current.scrollLeft - walkX;
        slider.scrollTop = mouseCoords.current.scrollTop - walkY;
    }

    return (
        <div className={topClass}
            style={styles}
            ref={tagRef}
            onMouseDown={handleDragStart}
            onMouseUp={handleDragEnd}
            onMouseMove={handleDrag}
        >
            {children}
        </div>
    )
}
