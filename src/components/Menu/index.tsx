import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from 'lucide-react';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

type AvailableThemes = 'light' | 'dark';

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme as AvailableThemes) || 'dark';
  });

  function handleChangeTheme(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    event.preventDefault();
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  const nextTheme = {
    dark: <SunIcon />,
    light: <MoonIcon />,
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <nav className={styles.menu}>
      <Link
        to='/'
        className={styles.menuLink}
        title='Ir para a página inicial'
        aria-label='Ir para a página inicial'
      >
        <HouseIcon />
      </Link>

      <Link
        to='/history'
        className={styles.menuLink}
        title='Ver histórico'
        aria-label='Ver histórico'
      >
        <HistoryIcon />
      </Link>

      <Link
        to='/settings'
        className={styles.menuLink}
        title='Ir para as configurações'
        aria-label='Ir para as configurações'
      >
        <SettingsIcon />
      </Link>

      <Link
        to='#'
        className={styles.menuLink}
        title='Alterar o tema'
        aria-label='Alterar o tema'
        onClick={handleChangeTheme}
      >
        {nextTheme[theme]}
      </Link>
    </nav>
  );
}
