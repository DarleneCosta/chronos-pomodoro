import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from 'lucide-react';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import RouterLink from '../RouterLink';

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
      <RouterLink
        href='/'
        className={styles.menuLink}
        title='Ir para a página inicial'
        aria-label='Ir para a página inicial'
      >
        <HouseIcon />
      </RouterLink>

      <RouterLink
        href='/history'
        className={styles.menuLink}
        title='Ver histórico'
        aria-label='Ver histórico'
      >
        <HistoryIcon />
      </RouterLink>

      <RouterLink
        href='/settings'
        className={styles.menuLink}
        title='Ir para as configurações'
        aria-label='Ir para as configurações'
      >
        <SettingsIcon />
      </RouterLink>

      <RouterLink
        href='#'
        className={styles.menuLink}
        title='Alterar o tema'
        aria-label='Alterar o tema'
        onClick={handleChangeTheme}
      >
        {nextTheme[theme]}
      </RouterLink>
    </nav>
  );
}
