"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./videoPlayer.module.scss";

function fmt(t: number) {
  if (!Number.isFinite(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function VideoPlayer({
  src,
  poster,
  title,
}: {
  src: string;
  poster?: string;
  title: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [ready, setReady] = useState(false);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => setCurrent(v.currentTime);
    const onMeta = () => {
      setDuration(v.duration);
      setReady(true);
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onVol = () => {
      setVolume(v.volume);
      setMuted(v.muted);
    };
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("volumechange", onVol);
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("volumechange", onVol);
    };
  }, []);

  useEffect(() => {
    const onFs = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "k") {
      e.preventDefault();
      togglePlay();
    } else if (e.key === "ArrowRight") {
      if (videoRef.current) videoRef.current.currentTime += 5;
    } else if (e.key === "ArrowLeft") {
      if (videoRef.current) videoRef.current.currentTime -= 5;
    } else if (e.key === "f") {
      toggleFullscreen();
    } else if (e.key === "m") {
      if (videoRef.current) videoRef.current.muted = !videoRef.current.muted;
    }
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = (Number(e.target.value) / 100) * duration;
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    if (!v) return;
    const val = Number(e.target.value);
    v.volume = val;
    v.muted = val === 0;
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else wrapRef.current?.requestFullscreen?.();
  };

  const progress = duration ? (current / duration) * 100 : 0;

  return (
    <div
      ref={wrapRef}
      className={`${styles.player} ${playing ? styles.playing : ""}`}
      onKeyDown={onKey}
      tabIndex={0}
      role="region"
      aria-label={`Видеоплеер: ${title}`}
    >
      <video
        ref={videoRef}
        className={styles.video}
        src={src}
        poster={poster}
        playsInline
        onClick={togglePlay}
      />

      {!playing && (
        <button
          type="button"
          className={styles.bigPlay}
          aria-label="Воспроизвести"
          onClick={togglePlay}
        >
          <PlayIcon />
        </button>
      )}

      <div className={styles.controls}>
        <input
          type="range"
          className={styles.seek}
          min={0}
          max={100}
          step={0.1}
          value={progress}
          onChange={seek}
          aria-label="Перемотка"
          style={{ "--p": `${progress}%` } as React.CSSProperties}
        />

        <div className={styles.bar}>
          <button
            type="button"
            className={styles.ctrl}
            onClick={togglePlay}
            aria-label={playing ? "Пауза" : "Воспроизвести"}
          >
            {playing ? <PauseIcon /> : <PlayIcon small />}
          </button>

          <div className={styles.volume}>
            <button
              type="button"
              className={styles.ctrl}
              onClick={toggleMute}
              aria-label={muted ? "Включить звук" : "Выключить звук"}
            >
              {muted || volume === 0 ? <MuteIcon /> : <VolumeIcon />}
            </button>
            <input
              type="range"
              className={styles.volumeSlider}
              min={0}
              max={1}
              step={0.05}
              value={muted ? 0 : volume}
              onChange={changeVolume}
              aria-label="Громкость"
            />
          </div>

          <span className={styles.time}>
            {fmt(current)} <span>/</span> {ready ? fmt(duration) : "..."}
          </span>

          <span className={styles.spacer} />

          <button
            type="button"
            className={styles.ctrl}
            onClick={toggleFullscreen}
            aria-label={
              fullscreen ? "Выйти из полноэкранного режима" : "На весь экран"
            }
          >
            {fullscreen ? <ExitFsIcon /> : <FsIcon />}
          </button>
        </div>
      </div>
    </div>
  );
}

function PlayIcon({ small }: { small?: boolean }) {
  const s = small ? 18 : 30;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 4.5v15l12-7.5z" fill="currentColor" />
    </svg>
  );
}
function PauseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 5h4v14H6zM14 5h4v14h-4z" fill="currentColor" />
    </svg>
  );
}
function VolumeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 9v6h4l5 4V5L8 9H4zm12.5 3a4 4 0 0 0-2-3.46v6.92A4 4 0 0 0 16.5 12z"
        fill="currentColor"
      />
    </svg>
  );
}
function MuteIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 9v6h4l5 4V5L8 9H4zm15.5 3 2.3-2.3-1.4-1.4-2.3 2.3-2.3-2.3-1.4 1.4 2.3 2.3-2.3 2.3 1.4 1.4 2.3-2.3 2.3 2.3 1.4-1.4z"
        fill="currentColor"
      />
    </svg>
  );
}
function FsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 4h6v2H6v4H4V4zm10 0h6v6h-2V6h-4V4zM4 14h2v4h4v2H4v-6zm16 0v6h-6v-2h4v-4h2z"
        fill="currentColor"
      />
    </svg>
  );
}
function ExitFsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M8 4h2v4H4V6h4V4zm6 0h2v2h4v2h-6V4zM4 16h6v4H8v-2H4v-2zm12 0h6v2h-4v2h-2v-4z"
        fill="currentColor"
      />
    </svg>
  );
}
