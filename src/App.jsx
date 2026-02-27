import { useState, useCallback } from "react";
import Dock from "./Dock";
import Window from "./Window";
import About from "./apps/About";
import Experience from "./apps/Experience";
import Projects from "./apps/Projects";
import "./App.css";

const WINDOW_CONTENT = {
  about:      { title: "About Me",   component: About },
  experience: { title: "Experience", component: Experience },
  projects:   { title: "Projects",   component: Projects },
  community:  { title: "Community",  component: null },
  music:      { title: "Music",      component: null },
};

let zCounter = 100;

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
          >
            {Content ? <Content /> : <p style={{ padding: 20, color: "#999" }}>Coming soon.</p>}
          </Window>
        );
      })}

      <Dock onOpen={openWindow} openIds={new Set(windows.map((w) => w.id))} />
    </>
  );
}