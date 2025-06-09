import styles from './styles.module.css';

type InputProps = {
  id: string;
  labelText: string;
} & React.ComponentProps<'input'>;

export function Input(props: InputProps) {
  return (
    <>
      <label htmlFor={props.id} className={styles.label}>
        {props.labelText}
      </label>
      <input type={props.type} {...props} className={styles.input} />
    </>
  );
}
