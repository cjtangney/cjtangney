import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";

import { Button } from "~/components/input/Button";
import { Svg } from "~/components/Svg";

type FlyoutProps = {
  container: React.ReactElement;
  startPosition: "top" | "right" | "bottom" | "left";
  className?: string;
  triggerClassName?: string;
};

const TRIGGER_SELECTORS = {
  top: "left-1/2 -translate-x-1/2 -bottom-20",
  right: "-left-20",
  bottom: "right-1/2 -translate-x-1/2 -top-20",
  left: "-right-20",
};

const ON_SCREEN_SELECTOR = {
  top: "-translate-y-full",
  right: "translate-x-full",
  bottom: "translate-y-full",
  left: "-translate-x-full",
};

const SVG_SELECTOR_SWITCH = (startPosition: string) => {
  switch (startPosition) {
    case "top":
      return {
        open: "[.open_&]:-rotate-90",
        closed: "rotate-90",
      };
    case "right":
      return {
        open: "[.open_&]:rotate-0",
        closed: "rotate-180",
      };
    case "bottom":
      return {
        open: "[.open_&]:rotate-90",
        closed: "-rotate-90",
      };
    case "left":
      return {
        open: "[.open_&]:rotate-180",
        closed: "rotate-0",
      };
    default:
      return {
        open: "rotate-180",
        closed: "",
      };
  }
};

const FlyoutContext = createContext({
  isVisible: false,
  startPosition: "left",
  toggleVisibility: () => {},
});

export const FlyoutProvider = ({
  children,
  className,
  startPosition = "left",
}: {
  children: React.ReactNode;
  className?: string;
  startPosition?: "top" | "right" | "bottom" | "left";
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible((prev) => !prev);
  const flyoutRef = useRef<HTMLDivElement | null>(null);

  /**
   * Listeners for closing the Flyout. These include...
   * - Clicking outside of the Flyout
   * - The Escape key
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        flyoutRef.current &&
        !flyoutRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (flyoutRef.current && event.key === "Escape") {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isVisible]);

  const flyoutSelectors = `absolute z-10 ${className ? className : ""} 
  ${ isVisible ? "" : `${ON_SCREEN_SELECTOR[startPosition]}` }`;

  return (
    <FlyoutContext.Provider
      value={{ isVisible, toggleVisibility, startPosition }}
    >
      <div ref={flyoutRef} className={`transition ${flyoutSelectors}`}>
        {children}
      </div>
    </FlyoutContext.Provider>
  );
};

export const useFlyout = () => useContext(FlyoutContext);

const FlyoutToggleButton = ({
  children,
  className,
  startPosition = "left",
}: {
  children: React.ReactNode;
  className?: string;
  startPosition?: "top" | "right" | "bottom" | "left";
}) => {
  const { isVisible, toggleVisibility } = useFlyout();

  const triggerSelectors = `!absolute shadow-md shadow-c-default p-3 rounded-full !bg-slate-900 ${
    TRIGGER_SELECTORS[startPosition]
  } ${className ? className : ""} ${isVisible ? "open" : ""}`;

  return (
    <Button onClick={toggleVisibility} className={triggerSelectors}>
      {children}
    </Button>
  );
};

const FlyoutContent = ({ children }: { children: React.ReactNode }) => {
  const { isVisible } = useFlyout();
  const flyoutContentSelectors = isVisible ? "" : "!shadow-none invisible";

  return React.Children.map(children, (child) => {
    if (
      React.isValidElement<{ className?: string; onBlur?: () => void }>(
        child
      ) &&
      child.props.className &&
      !child.props.className.includes("sr-only")
    ) {
      return React.cloneElement(child, {
        className: `${child.props.className} ${flyoutContentSelectors}`,
      });
    }
    return child;
  });
};

export const Flyout = ({
  container,
  startPosition,
  className,
  triggerClassName,
}: FlyoutProps) => {
  const svgDisplayClasses = SVG_SELECTOR_SWITCH(startPosition);

  return (
    <FlyoutProvider className={className} startPosition={startPosition}>
      <FlyoutToggleButton
        startPosition={startPosition}
        className={triggerClassName}
      >
        <Svg
          id="chevron-right"
          className={`!fill-white h-[24px] w-[24px] ${svgDisplayClasses.closed} ${svgDisplayClasses.open}`}
        />
      </FlyoutToggleButton>
      <FlyoutContent>{container}</FlyoutContent>
    </FlyoutProvider>
  );
};
