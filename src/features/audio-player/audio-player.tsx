"use client";
import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

export const AudioPlayer = ({ audioSrc }: { audioSrc: string }) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const waveSurferRef = useRef<WaveSurfer | null>(null);
  const [isFirst, setIsFirst] = useState(true);
  useEffect(() => {
    setIsFirst(false);
  }, []);
  useEffect(() => {
    if (!waveformRef.current || isFirst) {
      return;
    }
    waveSurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#ddd",
      progressColor: "#555",
      cursorColor: "#333",
      height: 20,
      barWidth: 2,
      backend: "MediaElement",
    });

    waveSurferRef.current.load(audioSrc);

    waveSurferRef.current.on("error", (e) => {
      console.error("WaveSurfer error:", e);
    });
  }, [audioSrc, isFirst]);

  const handlePlayPause = () => {
    waveSurferRef.current?.playPause();
  };

  return (
    <div>
      <button onClick={handlePlayPause}>Play/Pause</button>
      <div ref={waveformRef}></div>
    </div>
  );
};
