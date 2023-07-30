import { TDefaultPageLayout, TDefaultPageLayoutPosition } from "./types";

const DefaultPageLayout = ({ children }: TDefaultPageLayout) => {
  return (
    <div className="flex items-start flex-wrap sm:flex-col md:flex-row">
      {children}
    </div>
  );
};

DefaultPageLayout.Position = ({
  children,
  main = false,
  photo = false,
  submit = false,
}: TDefaultPageLayoutPosition) => {
  const className = ["w-full", "p-1.5"];

  if (main) className.push("md:w-[calc(100%-theme(width.80))]", "min-h-screen");
  if (photo) className.push("md:w-80", "bg-slate-200");
  if (submit)
    className.push(
      "fixed",
      "bottom-0",
      "left-0",
      "w-full",
      "pb-0",
      "pt-2",
      "bg-slate-200"
    );

  return <div className={className.join(" ")}>{children}</div>;
};

export { DefaultPageLayout };
