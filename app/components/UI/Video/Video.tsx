import { forwardRef } from "react";
import type { TVideo } from "./types";

export const Video = forwardRef<HTMLVideoElement, TVideo>(({ srcObject, ...props }, ref) => {
  return <video width="100%" playsInline autoPlay loop muted ref={ref} {...props} />;
});
