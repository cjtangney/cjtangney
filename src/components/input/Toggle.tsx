import { MouseEventHandler } from "react";

export const Toggle = ({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick: MouseEventHandler<HTMLInputElement>;
  className?: string;
}) => {
  return (
    <label className={`grid grid-cols-[0.65fr_1fr] gap-4 cursor-pointer`}>
      <input
        id="toggle-theme"
        type="checkbox"
        value=""
        className="toggle sr-only peer"
        onClick={onClick}
      />
      <div
        className={[
          "relative min-w-12 w-full h-6 bg-gray-200 rounded-full",
          'after:absolute after:content-[""] after:transition-all',
          "after:top-[2px] after:start-[2px]",
          "after:bg-white after:border-gray-300 after:border",
          "after:rounded-full after:w-5 after:h-5",
          "peer peer-focus:outline-none",
          "peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:bg-blue-600",
          "peer-checked:after:border-white peer-checked:after:translate-x-[calc(100cqw-100%-4px)]",
          "rtl:peer-checked:after:-translate-x-[calc(100cqw-100%-4px)]",
          "dark:bg-gray-700 dark:border-gray-600 dark:peer-focus:ring-blue-800",
          className,
        ].join(" ")}
        style={{
          containerType: "inline-size",
        }}
      ></div>
      <span className="text-sm font-medium text-c-default">
        {children || "Default Toggle Text"}
      </span>
    </label>
  );
};
