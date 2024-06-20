import { ChangeEvent, useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../theme";

const SettingsComponent = () => {
  const { setTheme } = useContext(ThemeContext);
  const [localTheme, setLocalTheme] = useState<string | undefined>(localStorage.getItem('theme') || undefined);

  useEffect(() => {
    if (localTheme === 'system') {
      const matchMediaDark = window.matchMedia('(prefers-color-scheme: dark)');
      setTheme(matchMediaDark.matches ? 'dark' : 'light');
    } else if (localTheme) {
      setTheme(localTheme);
    }
  }, [localTheme, setTheme]);


  const handleThemeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = event.target.value;
    setLocalTheme(selectedTheme);
  };
  return (
    <div className="casual-tab">
      <label htmlFor="theme-select">Theme: </label>
      <select id="theme-select" name="theme" value={localTheme} onChange={handleThemeChange}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
    </div>
  );
};

export default SettingsComponent;