import styles from './styles.module.css';

type InputProps = {
  id: string;
  label: string;
} & React.ComponentProps<'input'>;

export function Input(props: InputProps) {
  return (
    <>
      <label htmlFor={props.id} className={styles.label}>
        {props.label}
      </label>
      <input type={props.type} {...props} className={styles.input} />
    </>
  );
}
