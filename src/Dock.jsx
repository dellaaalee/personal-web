import "./Dock.css";
import { useEffect, useState } from "react";

import about from "./assets/icons/notes.png";
import exp from "./assets/icons/notes.png";
import projects from "./assets/icons/notes.png";
import linkedin from "./assets/icons/linkedin.png";
import gmail from "./assets/icons/notes.png";
import music from "./assets/icons/notes.png";

const items = [
  { id: "about", label: "About me", icon: about, href: "#about" },
  { id: "experience", label: "experience", icon: exp, href: "#experience" },
  { id: "projects", label: "projects", icon: projects, href: "#projects" },
  { id: "linkedin", label: "linkedin", icon: linkedin, href: "#linkedin" },
  { id: "email", label: "email", icon: gmail, href: "#email" },
  { id: "community", label: "community", icon: music, href: "#community" },
  { id: "music", label: "music", icon: music, href: "#music" },
];

export default function Dock() {
  const [activeId, setActiveId] = useState("about"); // default

  useEffect(() => {
    const updateFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      setActiveId(hash || "about");
    };

    updateFromHash(); // ✅ runs on initial page load
    window.addEventListener("hashchange", updateFromHash);

    return () => window.removeEventListener("hashchange", updateFromHash);
  }, []);

  return (
    <div className="dock-wrapper">
      <nav className="dock" aria-label="Dock navigation">
        {items.map((item) => (
          <a
            key={item.id}
            className={`dock-item ${activeId === item.id ? "is-active" : ""}`}
            href={item.href}
            aria-label={item.label}
          >
            <img src={item.icon} className="dock-icon" alt="" />
            <span className="dock-tooltip">{item.label}</span>
            <span className="dock-dot" aria-hidden="true" />
          </a>
        ))}
      </nav>
    </div>
  );
}