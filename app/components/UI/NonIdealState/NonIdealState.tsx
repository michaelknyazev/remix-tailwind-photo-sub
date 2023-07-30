import type { TNonIdealState } from "./types";

export const NonIdealState = ({ title, description, icon, action }: TNonIdealState) => {
  return (
    <div className="flex flex-col">
      {icon && (
        <div className="w-full pr-2 pl-2 pt-4 pb-2 flex justify-center">
          <div className="transition-transform group-hover:scale-110">
            {icon}
          </div>
        </div>
      )}
      {title && (
        <div className="w-full pr-2 pl-2 pt-2 pb-0 flex justify-center">
          <div className="font-bold">{title}</div>
        </div>
      )}
      {description && (
        <div className="w-full pr-2 pl-2 pt-0 pb-0 flex justify-center">
          <div className="text-center pr-7 pl-7">{description}</div>
        </div>
      )}
      {action && <div className="w-full pr-2 pl-2 pt-5 pb-2 flex justify-center">{action}</div>}
    </div>
  );
};
