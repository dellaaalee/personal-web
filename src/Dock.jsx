import "./Dock.css";
import { useState } from "react";

import about from "./assets/icons/notes.png";
import exp from "./assets/icons/notes.png";
import projects from "./assets/icons/notes.png";
import linkedin from "./assets/icons/linkedin.png";
import gmail from "./assets/icons/gmail.png";
import music from "./assets/icons/notes.png";

const items = [
  { id: "about",      label: "About me",   icon: about,    type: "notes"    },
  { id: "experience", label: "Experience", icon: exp,      type: "notes"    },
  { id: "projects",   label: "Projects",   icon: projects, type: "folder"   },
  { id: "linkedin",   label: "LinkedIn",   icon: linkedin, type: "linkedin", url: "https://www.linkedin.com/in/della-lee/"},
  { id: "email",      label: "Email",      icon: gmail,    type: "gmail"    },
  { id: "community",  label: "Community",  icon: music,    type: "folder"   },
  { id: "music",      label: "Music",      icon: music,    type: "music"    },
];

export default function Dock({ onOpen, openIds }) {
  const [activeId, setActiveId] = useState("about");

  const handleClick = (e, item) => {
    e.preventDefault();
    if (item.url) {
      window.open(item.url, "_blank");
      return;
    }
    setActiveId(item.id);
    if (onOpen) onOpen(item.id);
  };

  const isOpen = (id) => {
    if (openIds) return openIds.has(id);
    return id === activeId;
  };

  return (
    <div className="dock-wrapper">
      <nav className="dock" aria-label="Dock navigation">
        {items.map((item) => {
          const cls = "dock-item" + (isOpen(item.id) ? " is-active" : "");
          const iconCls = "dock-icon " + item.type;
          return (
            <a
              key={item.id}
              className={cls}
              href="#"
              aria-label={item.label}
              onClick={(e) => handleClick(e, item)}
            >
              <div className={iconCls} aria-hidden="true">
                {item.type === "notes" && (
                  <span className="notes-lines" aria-hidden="true" />
                )}
                {(item.type === "gmail" || item.type === "linkedin") && (
                  <img src={item.icon} alt="" className="dock-icon-img" />
                )}
              </div>
              <span className="dock-tooltip">{item.label}</span>
              <span className="dock-dot" aria-hidden="true" />
            </a>
          );
        })}
      </nav>
    </div>
  );
}