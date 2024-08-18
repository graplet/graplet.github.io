import { useContext, useEffect, useState } from "react";
import { ThemeOptions, ThemeContext } from "../../theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDesktop, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const SettingsComponent = () => {
  const { setTheme } = useContext(ThemeContext);
  const [localTheme, setLocalTheme] = useState<ThemeOptions>(
    (localStorage.getItem("theme") as ThemeOptions) || "system"
  );

  useEffect(() => {
    if (localTheme === "system") {
      const matchMediaDark = window.matchMedia("(prefers-color-scheme: dark)");
      setTheme(matchMediaDark.matches ? "dark" : "light");
    } else {
      setTheme(localTheme);
    }
  }, [localTheme, setTheme]);

  const handleThemeChange = () => {
    const nextTheme: ThemeOptions =
      localTheme === "system"
        ? "light"
        : localTheme === "light"
        ? "dark"
        : "system";
    setLocalTheme(nextTheme);
  };

  const getThemeIcon = () => {
    switch (localTheme) {
      case "light":
        return <FontAwesomeIcon icon={faSun} />;
      case "dark":
        return <FontAwesomeIcon icon={faMoon} />;
      case "system":
      default:
        return <FontAwesomeIcon icon={faDesktop} />;
    }
  };

  return (
    <div className="mt-4">
      <span className="mr-2">Theme:</span>
      <button onClick={handleThemeChange}>
        {getThemeIcon()} {localTheme.charAt(0).toUpperCase() + localTheme.slice(1)}
      </button>
    </div>
  );
};

export default SettingsComponent;
