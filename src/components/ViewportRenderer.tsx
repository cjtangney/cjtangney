import { useEffect, useRef } from "react";

export type ViewportRenderConfig = {
  enabled?: boolean;
  threshold?: number;
  viewportSlideClassName?: string;
  viewportSlideGap?: number;
};

const GAP_SELECTOR: Record<number, string> = {
  1: "gap-2",
  2: "gap-4",
  3: "gap-8",
  4: "gap-12",
  5: "gap-16",
  6: "gap-24",
  7: "gap-32",
  8: "gap-64",
  9: "gap-72",
  10: "gap-96",
}

export const ViewportRenderer = ({
  config = {
    enabled: true,
    threshold: 0.5,
  },
  children,
  className,
}: {
  config: ViewportRenderConfig;
  children: React.ReactNode;
  className?: string;
}) => {
  const observedElements = useRef(new Map());

  const showEntries = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const { target }: IntersectionObserverEntry = entry;
      (target as HTMLElement).dataset.rendered = "true";
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const intersectionEntries = entries.filter(
          (entry) => entry.isIntersecting
        );
        showEntries(intersectionEntries);
      },
      { threshold: config.threshold }
    );

    const elementsToObserve = observedElements.current;
    elementsToObserve.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      elementsToObserve.forEach((element) => {
        if (element) observer.unobserve(element);
      });
    };
  }, [config]);

  const defaultClasses = "";
  let cssClasses = className
    ? `${defaultClasses} ${className}`
    : defaultClasses;
  cssClasses = config.viewportSlideGap 
    ? `${cssClasses} ${GAP_SELECTOR[config.viewportSlideGap]}` 
    : cssClasses;

  const handleRef = (element: HTMLElement, id: string) => {
    observedElements.current.set(id, element);
  };

  const { viewportSlideClassName } = config;

  if (children) {
    if (!Array.isArray(children)) {
      children = [children];
    }
  }

  return (
    <div className={cssClasses}>
      {(children as React.ReactNode[]).map(
        (child: React.ReactNode, index: number) => (
          <div
            id={`viewport-renderer-${index}`}
            key={`viewport-renderer-${index}`}
            ref={(el) =>
              handleRef(el as HTMLElement, `viewport-renderer-${index}`)
            }
            data-rendered={false}
            className={[
              viewportSlideClassName,
              "opacity-0 translate-y-1/2 transition duration-1000",
              '[&[data-rendered="true"]]:opacity-100',
              '[&[data-rendered="true"]]:translate-y-0',
            ].join(" ")}
          >
            {child}
          </div>
        )
      )}
    </div>
  );
};
