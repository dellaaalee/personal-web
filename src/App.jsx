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
  { xPct: 0.24, yPct: 0.54 },
  { xPct: 0.37, yPct: 0.52 },
  { xPct: 0.47, yPct: 0.27 },
  { xPct: 0.44, yPct: 0.69 },
  { xPct: 0.55, yPct: 0.57 },
  { xPct: 0.66, yPct: 0.42 },
  { xPct: 0.70, yPct: 0.68 },
];

let zCounter = 100;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

function DesktopIcon({ icon, initialPosPct, onOpen }) {
  const toPixels = (pct) => ({
    x: pct.xPct * window.innerWidth,
    y: pct.yPct * window.innerHeight,
  });

  const [pos, setPos] = useState(() => toPixels(initialPosPct));
  const dragging = useRef(false);
  const dragOffset = useRef({});
  const hasDragged = useRef(false);
  const manuallyMoved = useRef(false);

  useEffect(() => {
    const onResize = () => {
      if (!manuallyMoved.current) {
        setPos(toPixels(initialPosPct));
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!dragging.current) return;
      const dx = e.clientX - dragOffset.current.startX;
      const dy = e.clientY - dragOffset.current.startY;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        hasDragged.current = true;
        manuallyMoved.current = true;
      }
      setPos({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      });
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

  const iconType =
    icon.id === "about" || icon.id === "community" ? "notes" :
    icon.id === "projects" || icon.id === "experience" ? "folder" :
    icon.id === "music" ? "music" :
    icon.id === "linkedin" ? "linkedin" :
    icon.id === "email" ? "gmail" : "notes";

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
          initialPosPct={DESKTOP_POSITIONS[i]}
          onOpen={onOpen}
        />
      ))}
    </>
  );
}

function MobileMenu({ onOpen }) {
  const items = [
    { id: "about",      label: "About Me"   },
    { id: "experience", label: "Experience" },
    { id: "projects",   label: "Projects"   },
    { id: "community",  label: "Community"  },
    { id: "music",      label: "Music"      },
  ];

  return (
    <div style={{
      position: "fixed",
      top: 28,
      left: 0,
      right: 0,
      bottom: 60,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
      padding: 24,
    }}>
      <p style={{ fontSize: 13, color: "#999", marginBottom: 8 }}>Della's Portfolio</p>
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onOpen(item.id)}
          style={{
            width: "100%",
            maxWidth: 320,
            padding: "14px 20px",
            background: "#fff",
            borderRadius: 12,
            fontSize: 15,
            fontWeight: 500,
            color: "#1a1a1a",
            textAlign: "left",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            cursor: "pointer",
            border: "none",
            fontFamily: "Inter, sans-serif",
          }}
        >
          {item.label}
        </button>
      ))}
      <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
        <button
          onClick={() => window.open("https://www.linkedin.com/in/della-lee/", "_blank")}
          style={{ fontSize: 13, color: "#4AACE0", background: "none", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif" }}
        >
          LinkedIn
        </button>
        <button
          onClick={() => window.open("mailto:dellahlee3@gmail.com", "_blank")}
          style={{ fontSize: 13, color: "#4AACE0", background: "none", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif" }}
        >
          Email
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [windows, setWindows] = useState([]);
  const isMobile = useIsMobile();

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
      {isMobile ? (
        <>
          <MobileMenu onOpen={openWindow} />
          {windows.length > 0 && (() => {
            const w = windows[windows.length - 1];
            const config = WINDOW_CONTENT[w.id];
            if (!config) return null;
            const Content = config.component;
            return (
              <div style={{
                position: "fixed",
                top: 28,
                left: 0,
                right: 0,
                bottom: 0,
                background: "#fff",
                zIndex: 9000,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}>
                <div style={{
                  height: 40,
                  background: "#f5f5f5",
                  borderBottom: "1px solid rgba(0,0,0,0.08)",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 12px",
                  gap: 12,
                  flexShrink: 0,
                }}>
                  <button
                    onClick={() => closeWindow(w.id)}
                    style={{
                      fontSize: 13,
                      color: "#5BBDDD",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    ← Back
                  </button>
                  <span style={{ fontSize: 13, fontWeight: 500, color: "#3a3a3a" }}>
                    {config.title}
                  </span>
                </div>
                <div style={{ flex: 1, overflow: "auto" }}>
                  {Content ? <Content /> : <p style={{ padding: 20, color: "#999" }}>Coming soon.</p>}
                </div>
              </div>
            );
          })()}
        </>
      ) : (
        <>
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
        </>
      )}
      <Dock onOpen={openWindow} openIds={new Set(windows.map((w) => w.id))} />
    </>
  );
}