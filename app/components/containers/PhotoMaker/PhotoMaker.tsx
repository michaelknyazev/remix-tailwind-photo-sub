import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { useCallback, useEffect, useState } from "react";

import { NonIdealState } from "../../UI/NonIdealState";
import { Button } from "../../UI/Button";
import { Video } from "../../UI/Video";

import type { TPhotoMaker } from "./types";

export const PhotoMaker = ({ onPhoto }: TPhotoMaker) => {
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(
    null
  );
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const videoRef = useCallback(
    (node: HTMLVideoElement) => {
      if (node) {
        node.srcObject = videoStream;
        node.play();

        setVideoElement(node);
      }
    },
    [videoStream]
  );

  const handleLoadVideo = async (): Promise<MediaStream | null> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
        },
        audio: false,
      });

      return stream;
    } catch (err) {
      return null;
    }
  };

  const handleReloadStream = async () => {
    const stream = await handleLoadVideo();

    if (!stream) {
      return;
    }

    setVideoStream(stream);
  };

  const handleAskForCameraAccess = async () => {
    try {
      const _name = "camera" as PermissionName;
      const _p = await navigator.permissions.query({ name: _name });

      if (_p.state === "denied") {
        return;
      }

      handleReloadStream();
    } catch (err) {
      return;
    }
  };

  const handleTakePicture = async () => {
    const canvas = document.createElement("canvas");

    if (videoStream) {
      const videoTrack = videoStream.getVideoTracks()[0];

      if (videoTrack) {
        const _settings = videoTrack.getSettings();
        const _w = _settings.width || 0;
        const _h = _settings.height || 0;

        canvas.width = _w;
        canvas.height = _h;

        const ctx = canvas.getContext("2d");

        if (ctx && videoElement) {
          ctx.drawImage(videoElement, 0, 0, _w, _h);

          const imageUrl = canvas.toDataURL("image/jpeg");

          if (onPhoto) onPhoto(imageUrl);
        }
      }
    }
  };

  useEffect(() => {
    handleAskForCameraAccess();
  }, []);

  useEffect(() => {
    return () => {
      if (videoStream) {
        videoStream.getTracks().map((track) => {
          track.stop();
        });
      }
    };
  }, [videoStream]);

  const className = [
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "w-full",
    "rounded-md",
    "cursor-pointer",
    "group",
    "overflow-hidden",
    "min-h-20",
  ];
  return (
    <div className={className.join(" ")} onClick={handleAskForCameraAccess}>
      {(() => {
        if (videoStream) {
          return (
            <>
              <div className="w-full overflow-hidden max-h-80 z-0 pb-2">
                <Video
                  ref={videoRef}
                  className="w-full h-full"
                  srcObject={videoStream}
                />
              </div>
              <div className="w-full z-1 p-2">
                <Button onClick={handleTakePicture}>Take a photo</Button>
              </div>
            </>
          );
        }

        return (
          <NonIdealState
            title="Access to the camera"
            description="Please, provide an access to the camera to take photos."
            icon={<ExclamationTriangleIcon className="w-20" />}
            action={
              <Button onClick={handleReloadStream}>Provide Access</Button>
            }
          />
        );
      })()}
    </div>
  );
};
