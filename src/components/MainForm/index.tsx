import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { useRef } from 'react';
import { Button } from '../Button';
import { Cycles } from '../Cycles';
import { Input } from '../Input';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import type { TaskModel } from '../../models/TaskModel';
import { getNextCycle } from '../../utils/getNextCycle';
import { formatSecondToMinutes } from '../../utils/formatSecondToMinutes';
import { getNextCycleType } from '../../utils/getNextCycleType';

import styles from './styles.module.css';

export function MainForm() {
  const { state, setState } = useTaskContext();
  const taskRef = useRef<HTMLInputElement>(null); //quando usar state no input? quando precisa da informacao em tempo real ex.validacoes no momento da digitacao

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!taskRef.current) {
      return;
    }
    const taskName = taskRef.current.value.trim();
    if (!taskName) {
      alert('Tarefa não pode ser vazia');
      return;
    }
    const newTask: TaskModel = {
      id: crypto.randomUUID(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptedDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };

    setState(prevState => ({
      ...prevState,
      tasks: [...prevState.tasks, newTask],
      activeTask: newTask,
      currentCycle: nextCycle,
      secondsRemaining: newTask.duration * 60,
      formattedSecondsRemaining: formatSecondToMinutes(newTask.duration * 60),
    }));
  }

  function handleStop() {
    setState(prevState => ({
      ...prevState,
      activeTask: null,
      secondsRemaining: 0,
      formattedSecondsRemaining: '00:00',
    }));
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formRow}>
        <Input
          type='text'
          id='task'
          placeholder='Digite a tarefa'
          label='Tarefa'
          required
          ref={taskRef}
          disabled={!!state.activeTask}
        />
      </div>
      <div className={styles.formRow}>
        <p>Próximo intervalo: {state.config[nextCycleType]} minutos</p>
      </div>
      {state.currentCycle > 0 && (
        <div>
          <Cycles />
        </div>
      )}
      <div className={styles.formRow}>
        {!state.activeTask ? (
          <Button type='submit' aria-label='Iniciar nova tarefa'>
            <PlayCircleIcon />
          </Button>
        ) : (
          <Button
            type='button'
            onClick={handleStop}
            aria-label='Parar tarefa atual'
            color='error'
          >
            <StopCircleIcon />
          </Button>
        )}
      </div>
    </form>
  );
}
