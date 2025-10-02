import {
  ViewportRenderer,
  ViewportRenderConfig,
} from '~/components/ViewportRenderer';

export const Container = ({
  children,
  className,
  viewportRenderConfig,
}: {
  children: React.ReactNode;
  className?: string;
  viewportRenderConfig?: ViewportRenderConfig | null;
}) => {
  const defaultClasses = 'max-w-screen-xl mx-auto';
  const cssClasses = className
    ? `${defaultClasses} ${className}`
    : defaultClasses;

  return viewportRenderConfig ? (
    <ViewportRenderer className={cssClasses} config={viewportRenderConfig}>
      {children}
    </ViewportRenderer>
  ) : (
    <div className={cssClasses}>{children}</div>
  );
};
