import { Theme } from '~/contexts/Theme';

export const Page = ({
  children,
  theme,
  className,
}: {
  children: React.ReactNode;
  theme?: Theme;
  className?: string;
}) => {
  const defaultClasses = [
    'p-4',
    'relative overflow-hidden',
    'min-h-full w-full',
    'sm:px-6',
    'md:px-10',
    'lg:px-12',
  ].join(' ');
  const cssClasses = className
    ? `${defaultClasses} ${className}`
    : defaultClasses;

  return (
    <div className={cssClasses} data-theme={theme}>
      {children}
    </div>
  );
};
