import { useEffect, useState } from 'react';
import Calling_all_item from './Calling _all _item/Calling_all_item';

function App() {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem('theme') || 'light'
  );

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <>
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className=" fixed top-2 right-4 z-50 px-3 py-1 rounded bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
      >
        {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
      </button>
      <Calling_all_item />
    </>
  );
}

export default App;