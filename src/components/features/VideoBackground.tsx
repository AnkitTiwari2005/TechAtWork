import React, { useRef, useEffect } from 'react';

interface VideoBackgroundProps {
  src: string;
  opacity?: number;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ src, opacity = 0.28 }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Autoplay blocked — silent fail, static bg will show
      });
    }
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
      style={{ opacity }}
    />
  );
};

export default VideoBackground;
