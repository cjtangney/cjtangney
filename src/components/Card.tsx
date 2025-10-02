export const Card = ({
  children,
  className,
  ariaHidden = false,
}: React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  className?: string;
  ariaHidden?: boolean;
}) => {
  return (
    <div
      className={`rounded-lg shadow-md shadow-c-default py-8 px-12 bg-c-default${
        className ? ` ${className}` : ""
      }`}
      aria-hidden={ariaHidden}
    >
      {children}
    </div>
  );
};
