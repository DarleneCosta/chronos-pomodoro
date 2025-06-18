import { Link } from 'react-router';
import styles from './styles.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Link to='/about-pomodoro'>
        Entenda como funciona a técnica de pomodoro
      </Link>
      <Link
        to='https://github.com/DarleneCosta/pomodoro-react-native'
        target='_blank'
      >
        Chronos Pomodoro &copy; {new Date().getFullYear()} - Feito com ❤️
      </Link>
    </footer>
  );
}
