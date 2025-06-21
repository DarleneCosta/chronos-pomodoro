import RouterLink from '../RouterLink';
import styles from './styles.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <RouterLink href='/about-pomodoro'>
        Entenda como funciona a técnica de pomodoro
      </RouterLink>
      <RouterLink
        href='https://github.com/DarleneCosta/pomodoro-react-native'
        target='_blank'
      >
        Chronos Pomodoro &copy; {new Date().getFullYear()} - Feito com ❤️
      </RouterLink>
    </footer>
  );
}
