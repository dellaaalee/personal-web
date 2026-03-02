import { useState, useCallback, useRef, useEffect } from "react";
import Dock from "./Dock";
import Window from "./Window";
import MenuBar from "./MenuBar";
import About from "./apps/About";
import Experience from "./apps/Experience";
import Projects from "./apps/Projects";
import Community from "./apps/Community";
import Music from "./apps/Music";
import linkedinImg from "./assets/icons/linkedin.png";
import gmailImg from "./assets/icons/gmail.png";
import "./App.css";
import "./Dock.css";

const WINDOW_CONTENT = {
  about:      { title: "About Me",   component: About },
  experience: { title: "Experience", component: Experience },
  projects:   { title: "Projects",   component: Projects },
  community:  { title: "Community",  component: Community },
  music:      { title: "Music",      component: Music, size: { w: 403, h: 658 }, resizable: false },
};

const DESKTOP_ICONS = [
  { id: "about",      label: "about me"   },
  { id: "experience", label: "experience" },
  { id: "projects",   label: "projects"   },
  { id: "community",  label: "community"  },
  { id: "music",      label: "music"      },
  { id: "linkedin",   label: "linkedin"   },
  { id: "email",      label: "email"      },
];

const DESKTOP_POSITIONS = [
  { x: 349, y: 483},
  { x: 526, y: 464 },
  { x: 676, y: 241 },
  { x: 632, y: 620 },
  { x: 791, y: 511 },
  { x: 945, y: 377 },
  { x: 1006, y: 613 },
];

let zCounter = 100;

function DesktopIcon({ icon, initialPos, onOpen }) {
  const [pos, setPos] = useState(initialPos);
  const dragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const hasDragged = useRef(false);

  const iconType =
    icon.id === "about" || icon.id === "experience" || icon.id === "community" ? "notes" :
    icon.id === "projects" ? "folder" :
    icon.id === "music" ? "music" :
    icon.id === "linkedin" ? "linkedin" :
    icon.id === "email" ? "gmail" : "notes";

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!dragging.current) return;
      const dx = e.clientX - dragOffset.current.startX;
      const dy = e.clientY - dragOffset.current.startY;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        hasDragged.current = true;
      }
      setPos({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y });
    };
    const onMouseUp = () => { dragging.current = false; };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  const onMouseDown = (e) => {
    hasDragged.current = false;
    dragging.current = true;
    dragOffset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
      startX: e.clientX,
      startY: e.clientY,
    };
  };

  const onClick = () => {
    if (hasDragged.current) return;
    if (icon.id === "linkedin") { window.open("https://www.linkedin.com/in/della-lee/", "_blank"); return; }
    if (icon.id === "email") { window.open("mailto:dellahlee3@gmail.com", "_blank"); return; }
    onOpen(icon.id);
  };

  return (
    <div
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        cursor: "pointer",
        zIndex: 10,
        userSelect: "none",
      }}
      onMouseDown={onMouseDown}
      onClick={onClick}
    >
      <div className={"dock-icon " + iconType}>
        {iconType === "notes" && <span className="notes-lines" />}
        {(iconType === "linkedin" || iconType === "gmail") && (
          <img
            src={iconType === "linkedin" ? linkedinImg : gmailImg}
            alt=""
            className="dock-icon-img"
          />
        )}
      </div>
      <span style={{
        fontSize: 10,
        color: "#333",
        fontFamily: "Inter, sans-serif",
      }}>
        {icon.label}
      </span>
    </div>
  );
}

function DesktopIcons({ onOpen }) {
  return (
    <>
      {DESKTOP_ICONS.map((icon, i) => (
        <DesktopIcon
          key={icon.id}
          icon={icon}
          initialPos={DESKTOP_POSITIONS[i]}
          onOpen={onOpen}
        />
      ))}
    </>
  );
}

export default function App() {
  const [windows, setWindows] = useState([]);

  const openWindow = useCallback((id) => {
    setWindows((prev) => {
      if (prev.find((w) => w.id === id)) {
        zCounter++;
        return prev.map((w) => w.id === id ? { ...w, zIndex: zCounter } : w);
      }
      zCounter++;
      const offset = prev.length * 30;
      return [...prev, { id, zIndex: zCounter, pos: { x: 120 + offset, y: 60 + offset } }];
    });
  }, []);

  const closeWindow = useCallback((id) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const focusWindow = useCallback((id) => {
    zCounter++;
    setWindows((prev) => prev.map((w) => w.id === id ? { ...w, zIndex: zCounter } : w));
  }, []);

  return (
    <>
      <MenuBar />
      <DesktopIcons onOpen={openWindow} />
      {windows.map((w) => {
        const config = WINDOW_CONTENT[w.id];
        if (!config) return null;
        const Content = config.component;
        return (
          <Window
            key={w.id}
            id={w.id}
            title={config.title}
            zIndex={w.zIndex}
            initialPos={w.pos}
            onClose={closeWindow}
            onFocus={focusWindow}
            initialSize={config.size}
            resizable={config.resizable !== false}
          >
            {Content ? <Content /> : <p style={{ padding: 20, color: "#999" }}>Coming soon.</p>}
          </Window>
        );
      })}
      <Dock onOpen={openWindow} openIds={new Set(windows.map((w) => w.id))} />
    </>
  );
}