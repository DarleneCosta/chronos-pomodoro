import styles from './styles.module.css';

type ButtonProps = {
  children: React.ReactNode;
  color?: 'default' | 'error';
} & React.ComponentProps<'button'>;

export function Button({ children, color = 'default', ...props }: ButtonProps) {
  return (
    <button {...props} className={`${styles.button} ${styles[color]}`}>
      {children}
    </button>
  );
}
