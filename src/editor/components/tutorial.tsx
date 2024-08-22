import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState, useRef, useEffect } from "react";

export const TutorialComponent: FC = () => {
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleWatchClick = () => {
    setIsVideoVisible(true);
  };

  useEffect(() => {
    if (isVideoVisible && videoRef.current) {
      videoRef.current.play();
    }
  }, [isVideoVisible]);

  return (
    <div className="h-full flex justify-center items-center w-full" style={{ backgroundImage: !isVideoVisible ? 'url("/thumbnail.png")' : undefined }}>
      {!isVideoVisible && (
        <button onClick={handleWatchClick}>
          <FontAwesomeIcon icon={faVideo} /> Watch tutorial
        </button>
      )}
      {isVideoVisible && (
        <video
          ref={videoRef}
          controls
          className="w-full max-w-4xl"
          autoPlay
        >
          <source src="/tutorial.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
};
