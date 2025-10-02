export const Text = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const defaultClasses = 'mb-5 text-c-default';
  const cssClasses = className
    ? `${defaultClasses} ${className}`
    : defaultClasses;

  return <p className={cssClasses}>{children}</p>;
};
