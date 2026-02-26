import "./Window.css";
import { useRef, useState, useEffect } from "react";

export default function Window({ id, title, children, onClose, onFocus, zIndex, initialPosition }) {
  const [pos, setPos] = useState(initialPosition || { x: 100, y: 80 });
  const [size, setSize] = useState({ w: 640, h: 420 });
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [prevState, setPrevState] = useState(null);

  const dragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const resizing = useRef(false);
  const resizeStart = useRef({});
  const windowRef = useRef();

  // Dragging
  const onTitleMouseDown = (e) => {
    if (isMaximized) return;
    dragging.current = true;
    dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    onFocus(id);
  };

  useEffect(() => {
    const onMouseMove = (e) => {
      if (dragging.current) {
        setPos({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y });
      }
      if (resizing.current) {
        const dx = e.clientX - resizeStart.current.mouseX;
        const dy = e.clientY - resizeStart.current.mouseY;
        setSize({
          w: Math.max(320, resizeStart.current.w + dx),
          h: Math.max(200, resizeStart.current.h + dy),
        });
      }
    };
    const onMouseUp = () => {
      dragging.current = false;
      resizing.current = false;
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  const onResizeMouseDown = (e) => {
    e.stopPropagation();
    resizing.current = true;
    resizeStart.current = { mouseX: e.clientX, mouseY: e.clientY, w: size.w, h: size.h };
  };

  const handleMaximize = () => {
    if (!isMaximized) {
      setPrevState({ pos, size });
      setPos({ x: 0, y: 0 });
      setSize({ w: window.innerWidth, h: window.innerHeight - 80 });
    } else {
      setPos(prevState.pos);
      setSize(prevState.size);
    }
    setIsMaximized(!isMaximized);
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  if (isMinimized) return null;

  return (
    <div
      ref={windowRef}
      className={`mac-window ${isMaximized ? "maximized" : ""}`}
      style={{
        left: pos.x,
        top: pos.y,
        width: isMaximized ? "100vw" : size.w,
        height: isMaximized ? `calc(100vh - 80px)` : size.h,
        zIndex,
      }}
      onMouseDown={() => onFocus(id)}
    >
      {/* Title bar */}
      <div className="mac-titlebar" onMouseDown={onTitleMouseDown}>
        <div className="mac-controls">
          <button className="mac-btn close" onClick={() => onClose(id)} title="Close" />
          <button className="mac-btn minimize" onClick={handleMinimize} title="Minimize" />
          <button className="mac-btn maximize" onClick={handleMaximize} title="Maximize" />
        </div>
        <span className="mac-title">{title}</span>
      </div>

      {/* Content */}
      <div className="mac-content">{children}</div>

      {/* Resize handle */}
      {!isMaximized && (
        <div className="mac-resize-handle" onMouseDown={onResizeMouseDown} />
      )}
    </div>
  );
}