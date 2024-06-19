document.documentElement.style.visibility = 'hidden';

(async () => {
  try {
    const db = await openDatabase();
    const settingsStore = db.transaction(["settings"], "readwrite").objectStore("settings");
    const request = settingsStore.get('theme');

    request.onerror = (event) => {
      console.error("There was an error retrieving data:", event);
      document.documentElement.style.visibility = 'visible';
    };

    request.onsuccess = (event) => {
      const theme = event.target.result;
      const val = theme === 'light' ? '255' : '0';
      document.documentElement.style.setProperty('--val', val);
      document.documentElement.style.visibility = 'visible';
    };
  } catch (error) {
    console.error("Error opening database:", error);
    document.documentElement.style.visibility = 'visible';
  }
})();

function ToggleMode() {
  const currentColor = getComputedStyle(document.documentElement).getPropertyValue('--val');
  const newColor = currentColor === '0' ? '255' : '0';
  const theme = currentColor === '0' ? 'light' : 'dark';
  document.documentElement.style.setProperty('--val', newColor);

  (async () => {
    try {
      const db = await openDatabase();
      const settingsStore = db.transaction(["settings"], "readwrite").objectStore("settings");
      const request = settingsStore.get('theme');

      request.onerror = (event) => {
        alert("There was an error retrieving Data.");
        console.error(event);
      };

      request.onsuccess = (event) => {
        const settingUpdate = settingsStore.put(theme, 'theme');

        settingUpdate.onerror = (event) => {
          alert("There was an error updating Database.");
          console.error(event);
        };

        settingUpdate.onsuccess = (event) => {
          console.info('Theme changed successfully, saved to Database.', db);
        };
      };
    } catch (error) {
      console.error("Error opening database:", error);
    }
  })();
}
