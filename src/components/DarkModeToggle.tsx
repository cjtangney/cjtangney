import { useThemes } from "~/contexts/Theme";
import { Card } from "~/components/Card";
import { Flyout } from "~/components/Flyout";
import { Toggle } from "~/components/input/Toggle";

type ThemeType = "lite" | "dark";

const THEME_LABEL = {
  lite: "Light Mode",
  dark: "Dark Mode",
};

export const DarkModeToggle = () => {
  const { activeTheme, toggleTheme } = useThemes();

  return (
    <Flyout
      startPosition="left"
      className="top-5 -left-5 lg:left-0 absolute lg:!fixed"
      container={
        <Card
          className={`px-4 py-4 rounded-tl-none rounded-bl-none min-w-52 !my-0`}
        >
          <Toggle onClick={() => toggleTheme(activeTheme)}>
            {THEME_LABEL[activeTheme as ThemeType]}
          </Toggle>
        </Card>
      }
    />
  );
};
