import "./MenuBar.css";
import { useState, useEffect } from "react";

export default function MenuBar() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }));
      setDate(now.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="menubar">
      <div className="menubar-left">
        <span className="menubar-apple">⌘</span>
        <span className="menubar-item">Della's Computer</span>
      </div>
      <div className="menubar-right">
        <span className="menubar-datetime">{date} &nbsp; {time}</span>
      </div>
    </div>
  );
}