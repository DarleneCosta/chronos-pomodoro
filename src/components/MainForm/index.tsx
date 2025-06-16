import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { useRef } from 'react';
import { Button } from '../Button';
import { Cycles } from '../Cycles';
import { Input } from '../Input';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import type { TaskModel } from '../../models/TaskModel';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { TaskActionTypes } from '../../contexts/TaskContext/TaskActions';
import { Tips } from '../Tips';

import styles from './styles.module.css';

export function MainForm() {
  const { state, dispatch } = useTaskContext();
  const taskRef = useRef<HTMLInputElement>(null); //quando usar state no input? quando precisa da informacao em tempo real ex.validacoes no momento da digitacao

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handleStartNewTask(e: React.FormEvent<HTMLFormElement>) {
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
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };

    dispatch({
      type: TaskActionTypes.START_TASK,
      payload: newTask,
    });
  }

  function handleInterrupt(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!state.activeTask) {
      return;
    }
    dispatch({
      type: TaskActionTypes.INTERRUPT_TASK,
      payload: state.activeTask,
    });
  }

  return (
    <form className={styles.form} onSubmit={handleStartNewTask}>
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
        <Tips />
      </div>
      {state.currentCycle > 0 && (
        <div>
          <Cycles />
        </div>
      )}
      <div className={styles.formRow}>
        {!state.activeTask ? (
          <Button
            type='submit'
            aria-label='Iniciar nova tarefa'
            title='Iniciar nova tarefa'
            key='btn-submit'
          >
            <PlayCircleIcon />
          </Button>
        ) : (
          <Button
            type='button'
            onClick={handleInterrupt}
            aria-label='Interromper tarefa atual'
            title='Interromper tarefa atual'
            color='error'
            key='btn-interrupt'
          >
            <StopCircleIcon />
          </Button>
        )}
      </div>
    </form>
  );
}
