import { PlayCircleIcon } from 'lucide-react';
import { Button } from '../Button';
import { Cycles } from '../Cycles';
import { Input } from '../Input';
import styles from './styles.module.css';

export function MainForm() {
  return (
    <form className={styles.form} action=''>
      <div className={styles.formRow}>
        <Input
          type='text'
          id='task'
          placeholder='Digite a tarefa'
          labelText='Tarefa'
        />
      </div>
      <div className={styles.formRow}>
        <p>Próximo intervalo: 25 minutos</p>
      </div>
      <div>
        <Cycles />
      </div>
      <div className={styles.formRow}>
        <Button>
          <PlayCircleIcon />
        </Button>
      </div>
    </form>
  );
}
