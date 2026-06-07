import React, { useRef, useEffect, useState } from 'react';

interface VideoBackgroundProps {
  src: string;
  opacity?: number;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ src, opacity = 0.28 }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play()
      .then(() => setVisible(true))
      .catch(() => setVisible(false));
  }, []);

  return (
    <video
      ref={videoRef}
      className="video-bg"
      src={src}
      autoPlay
      muted
      loop
      playsInline
      style={{ opacity: visible ? opacity : 0, transition: 'opacity 0.5s ease' }}
    />
  );
};

export default VideoBackground;
