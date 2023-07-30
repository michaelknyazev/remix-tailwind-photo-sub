import { VideoHTMLAttributes } from "react";

export type TVideo = VideoHTMLAttributes<HTMLVideoElement> & {
  srcObject: MediaStream;
};
