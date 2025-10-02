import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

export type Theme = "lite" | "dark";

const ThemeContext = createContext<{
  activeTheme: Theme;
  toggleTheme: (theme: Theme) => void;
}>({
  activeTheme: "lite",
  toggleTheme: () => null,
});

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [activeTheme, setActiveTheme] = useState<Theme>("dark");

  const toggleTheme = useCallback(() => {
    setActiveTheme(activeTheme === "lite" ? "dark" : "lite");
  }, [activeTheme]);

  return (
    <ThemeContext.Provider value={{ activeTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemes = () => useContext(ThemeContext);
