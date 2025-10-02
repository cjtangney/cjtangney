import { useInView } from 'react-intersection-observer';
import { useState, useRef } from 'react';

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
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const { ref } = useInView({
    threshold: 0,
    delay: 250,
    onChange: (inView) => {
      if (!isLoaded) {
        if (inView) {
          setIsLoaded(true);
          overlayRef.current?.classList.remove('opacity-100');
          overlayRef.current?.classList.add('opacity-0');
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
    'h-full w-full rounded-lg bg-neutral-300 z-0',
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
          className={[
            'opacity-100',
            'bg-neutral-300 rounded-lg z-[1]',
            'absolute top-0 left-0 w-full',
            'transition duration-[250ms]',
          ].join(" ")}
          role="presentation"
          ref={overlayRef}
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
