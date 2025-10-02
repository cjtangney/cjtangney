import React, { forwardRef } from "react";

// TODO - adjust the hover styles here
const variants = {
  default: [
    "shadow-md shadow-c-default p-3 rounded-full text-c-default bg-c-default transition relative overflow-hidden",
    "before:absolute before:content-[''] before:h-full before:w-full before:bg-slate-900 before:top-0 before:left-0 before:opacity-0",
    "hover:shadow-xl hover:shadow-c-default hover:text-c-default hover:bg-c-default",
    // "hover:before:opacity-100",
  ].join(" "),
  inverted: [
    "shadow-md shadow-c-default p-3 rounded-full text-c-inverted bg-c-inverted transition relative overflow-hidden",
    "before:absolute before:content-[''] before:h-full before:w-full before:bg-slate-900 before:top-0 before:left-0 before:opacity-0",
    "hover:shadow-xl hover:shadow-c-default hover:text-c-inverted hover:bg-c-inverted",
    // "hover:before:opacity-100",
  ].join(" "),
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "default" | "inverted";
}

export const Button = forwardRef(
  (
    { children, className, onClick, variant = "default" }: ButtonProps,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    const cssClasses = className
      ? `${variants[variant]} ${className}`
      : variants[variant];

    return (
      <button onClick={onClick} className={cssClasses} ref={ref}>
        {typeof children === "string" ? (
          <span className="z-[1] relative">{children}</span>
        ) : (
          React.Children.map(children, (child) => {
            if (
              React.isValidElement<{ className?: string }>(child) &&
              child.props.className &&
              !child.props.className.includes("sr-only")
            ) {
              return React.cloneElement(child, {
                className: `${child.props.className} z-[1] relative`,
              });
            }
            return child;
          })
        )}
      </button>
    );
  }
);
