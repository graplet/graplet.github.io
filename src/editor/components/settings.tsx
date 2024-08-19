import { useContext, useEffect, useState } from "react";
import { ThemeOptions, ThemeContext } from "../../scripts/models/themeprovider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDesktop, faMoon, faSun, faTrash } from "@fortawesome/free-solid-svg-icons";
import { GrapletLocalStorage } from "../../scripts/models/storage";

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

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      GrapletLocalStorage.deleteProject(GrapletLocalStorage.currentProjectId!)
      .then(() => {
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Failed to delete project:", error);
      });
    }
  }

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
    <div className="mt-4 max-w-80">
      <div className="flex justify-between text-nowrap mb-4">
        <p className="m-0">Theme</p>
        <button onClick={handleThemeChange}>
          {getThemeIcon()} {localTheme.charAt(0).toUpperCase() + localTheme.slice(1)}
        </button>
      </div>
      <div className="flex justify-between text-nowrap mb-4">
        <p className="m-0">Delete this Project</p>
        <button onClick={handleDelete} style={{ color: 'rgb(var(--red))'}}>
          <FontAwesomeIcon icon={faTrash} /> Delete
        </button>
      </div>
    </div>
  );
};

export default SettingsComponent;
