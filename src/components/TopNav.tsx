import { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router";
import { FocusTrap } from "focus-trap-react";

import { Button } from "~/components/input/Button";
import { Svg } from "~/components/Svg";

const TopNavLabel = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <h2 className={`text-2xl pb-4 border-b border-c-default${className ? ` ${className}` : ""}`}>
    {children}
  </h2>
);

const TopNavItem = ({
  children,
  to,
}: {
  children: React.ReactNode;
  to?: string;
}) => (
  <li className="text-xl">
    {to ? <Link to={to}>{children}</Link> : <>{children}</>}
  </li>
);

export const TopNav = () => {
  const [isVisible, setVisibility] = useState<true | false>(false);
  const navigate = useNavigate();

  const showMenu = () => {
    setVisibility(true);
  };

  const hideMenu = () => {
    setVisibility(false);
  };

  // Close the menu on navigate
  useEffect(() => {
    hideMenu();
  }, [navigate]);

  return (
    <nav className="flex justify-between items-center w-full text-c-default">
      <Button
        className="!absolute lg:!fixed right-4 lg:right-8 top-5 p-2 !bg-slate-900 z-10"
        onClick={showMenu}
      >
        <Svg id="hamburger" className="h-[24px] w-[24px]" />
        <span className="sr-only">Open Site Navigation</span>
      </Button>
      <div
        className={[
          "bg-c-default",
          "fixed right-0 top-0 z-20",
          "h-full w-full text-right",
          "p-11 transition",
          isVisible ? "translate-x-0" : "translate-x-full invisible",
        ].join(" ")}
        aria-hidden={!isVisible}
      >
        {isVisible && (
          <FocusTrap>
            <ul className="flex flex-col gap-4 ml-auto">
              <li>
                <Button
                  onClick={hideMenu}
                  className="!p-0 !bg-transparent !shadow-none"
                >
                  <Svg id="close" className="h-[24px] w-[24px]" />
                  <span className="sr-only">Close Site Navigation</span>
                </Button>
              </li>

              <TopNavLabel className="ml-auto md:max-w-[300px]">
                Navigation
              </TopNavLabel>
              <TopNavItem to="/">Home</TopNavItem>
              <TopNavItem to="/bio">Bio</TopNavItem>
              <TopNavItem to="/photography">
                Photography
              </TopNavItem>
            </ul>
          </FocusTrap>
        )}
      </div>
    </nav>
  );
};
