import { Children } from "react"
import { TList } from "./types"

export const List = ({ children }: TList) => {
  return (
    <div className="flex flex-col">
      {Children.map(children, child => {
        return (
          <div className="p-2">
            {child}
          </div>
        )
      })}
    </div>
  )
}