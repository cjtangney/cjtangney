interface HeadingProps {
  children: React.ReactNode;
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const FONT_PROPERTIES = {
  1: 'text-4xl md:text-6xl mb-5',
  2: 'text-3xl md:text-4xl mb-5',
  3: 'text-2xl md:text-3xl mb-5',
  4: 'text-xl md:text-2xl mb-5',
  5: 'text-lg md:text-xl mb-5',
  6: 'text-lg mb-5',
};

const HeadingTag: React.FC<HeadingProps> = ({
  children,
  className,
  level = 2,
}: HeadingProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  const defaultClasses = `${FONT_PROPERTIES[level]} text-c-default`;
  const cssClasses = className
    ? `${defaultClasses} ${className}`
    : defaultClasses;

  return <Tag className={cssClasses}>{children}</Tag>;
};

export const Heading = ({ children, className, level = 2 }: HeadingProps) => {
  return (
    <HeadingTag className={className ? className : ''} level={level}>
      {children}
    </HeadingTag>
  );
};
