import { Spinner } from "../Spinner";
import type { TButton } from "./types";

export const Button = ({ onClick, disabled = false, loading = false, children }: TButton) => {
  const handleClick = () => {
    if (disabled || loading) return;

    if (onClick) {
      onClick();
    }
  };

  const className = [
    "w-full",
    "text-white",
    "font-bold",
    "py-2",
    "px-4",
    "rounded",
  ]

  if (disabled) className.push("bg-gray-500", "cursor-disabled")
  else className.push("bg-blue-500", "hover:bg-blue-700", "cursor-pointer")

  return (
    <button
      onClick={handleClick}
      className={className.join(' ')}
    >
      {(() => {
        if (loading) {
          return (
            <Spinner />
          )
        }

        return children
      })()}
    </button>
  );
};
