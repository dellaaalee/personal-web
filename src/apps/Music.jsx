import "./Music.css";
import { useState, useEffect, useRef } from "react";
import cover from "../assets/at_my_worst_album_cover.jpg";
import song from "../assets/Pink Sweat$ - At My Worst.mp3";

const TRACK = {
  title: "At My Worst",
  artist: "Pink Sweat$",
  duration: 185,
};

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function Music() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(TRACK.duration);

  useEffect(() => {
    const audio = audioRef.current;
    const onTimeUpdate = () => setElapsed(Math.floor(audio.currentTime));
    const onLoaded = () => setDuration(Math.floor(audio.duration));
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoaded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoaded);
    };
  }, []);

  const togglePlay = () => {
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  const handleSeek = (e) => {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const newTime = ratio * duration;
    audioRef.current.currentTime = newTime;
    setElapsed(Math.floor(newTime));
  };

  const progress = (elapsed / duration) * 100;
  const remaining = duration - elapsed;

  return (
    <div className="music-root">
      <audio ref={audioRef} src={song} />

      <img className="music-art" src={cover} alt="At My Worst album cover" />

      <div className="music-progress-row">
        <span className="music-time">{formatTime(elapsed)}</span>
        <span className="music-time">-{formatTime(remaining)}</span>
      </div>
      <div className="music-bar" onClick={handleSeek}>
        <div className="music-bar-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="music-info">
        <span className="music-title">{TRACK.title}</span>
        <span className="music-artist">{TRACK.artist}</span>
      </div>

      <div className="music-controls">
        <button className="music-btn" onClick={() => { audioRef.current.currentTime = 0; setElapsed(0); }}>⏮</button>
        <button className="music-btn music-btn-play" onClick={togglePlay}>
          {playing ? "⏸" : "▶"}
        </button>
        <button className="music-btn" onClick={() => { audioRef.current.currentTime = duration; }}>⏭</button>
      </div>
    </div>
  );
}