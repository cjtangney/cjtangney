import { useInView } from 'react-intersection-observer';
import { useState } from 'react';

export const Image = ({
  src,
  alt,
  srcSet,
  height,
  aspectRatio,
  className,
}: {
  src?: string;
  alt: string;
  srcSet?: string;
  height?: number;
  aspectRatio?: string;
  className?: string;
}) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const { ref } = useInView({
    threshold: 0,
    delay: 250,
    onChange: (inView) => {
      if (!isLoaded) {
        if (inView) {
          setIsLoaded(true);
        }
      }
    },
  });

  if (aspectRatio && aspectRatio.indexOf('/') < 0) {
    console.warn('prop `aspectRatio` should be a fraction (H/W)');
    aspectRatio = undefined;
  }

  const defaultClasses = [
    'relative transition object-cover',
    'h-full w-full rounded-lg bg-neutral-300',
    '[&.loading]:before:opacity-100',
    'before:absolute before:opacity-0 before:transition-opacity',
    'before:bg-neutral-300 before:rounded-lg',
    'before:h-full before:w-full before:top-0 before:left-0',
    isLoaded ? '' : 'loading',
  ].join(' ');
  const defaultStyles = {
    aspectRatio: aspectRatio ? aspectRatio : '',
    minHeight: height ? height : '',
  };
  const cssClasses = className
    ? `${defaultClasses} ${className}`
    : defaultClasses;

  return (
    <div className="relative h-full">
      { height &&
        <div
          className="absolute top-0 left-0 w-full"
          role="presentation"
          style={{
            paddingTop: height ? height : '',
          }}
        />
      }
      <img
        loading="lazy"
        alt={alt}
        src={isLoaded ? src : undefined}
        srcSet={srcSet ? 
          isLoaded 
            ? srcSet 
            : undefined 
          : undefined
        }
        className={cssClasses}
        style={defaultStyles}
        ref={ref}
        height={height}
      />
    </div>
  );
};
