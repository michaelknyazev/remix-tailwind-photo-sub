import { Children } from "react"
import type { TButtonGroup } from "./types";

export const ButtonGroup = ({ children }: TButtonGroup) => {
  return (
    <div className="flex flex-col">
      {Children.map(children, child => {
        return (
          <div className="pb-2">
            {child}
          </div>
        );
      })}
    </div>
  );
}