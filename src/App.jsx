import { useState, useCallback } from "react";
import Dock from "./Dock";
import Window from "./Window";
import "./App.css";

const WINDOW_CONTENT = {
  about:      { title: "About Me",   content: "About me content goes here." },
  experience: { title: "Experience", content: "Experience content goes here." },
  projects:   { title: "Projects",   content: "Projects content goes here." },
  linkedin:   { title: "LinkedIn",   content: "LinkedIn content goes here." },
  email:      { title: "Email",      content: "Email content goes here." },
  community:  { title: "Community",  content: "Community content goes here." },
  music:      { title: "Music",      content: "Music content goes here." },
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
            <p>{config.content}</p>
          </Window>
        );
      })}

      <Dock onOpen={openWindow} openIds={new Set(windows.map((w) => w.id))} />
    </>
  );
}