import { HistoryIcon, HouseIcon, SettingsIcon, SunIcon } from 'lucide-react';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';

type AvailableThemes = 'light' | 'dark';

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>('dark');

  function handleChangeTheme(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    event.preventDefault();
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <nav className={styles.menu}>
      <a
        href='#'
        className={styles.menuLink}
        title='Ir para a página inicial'
        aria-label='Ir para a página inicial'
      >
        <HouseIcon className={styles.menuIcon} />
      </a>

      <a
        href='#'
        className={styles.menuLink}
        title='Ver histórico'
        aria-label='Ver histórico'
      >
        <HistoryIcon className={styles.menuIcon} />
      </a>

      <a
        href='#'
        className={styles.menuLink}
        title='Ir para as configurações'
        aria-label='Ir para as configurações'
      >
        <SettingsIcon className={styles.menuIcon} />
      </a>

      <a
        href='#'
        className={styles.menuLink}
        title='Alterar o tema'
        aria-label='Alterar o tema'
        onClick={handleChangeTheme}
      >
        <SunIcon className={styles.menuIcon} />
      </a>
    </nav>
  );
}
