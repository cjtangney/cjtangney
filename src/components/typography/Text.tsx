export const Text = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const defaultClasses = 'text-c-default';
  const cssClasses = className
    ? `${defaultClasses} ${className}`
    : defaultClasses;

  return <p className={cssClasses}>{children}</p>;
};
