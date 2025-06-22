import { useEffect, useState } from 'react';
import { TrashIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { Button } from '../../components/Button';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { formatDate } from '../../utils/formatDate';
import { getTaskStatus } from '../../utils/getTaskStatus';
import { type SortTasksOptions, sortTasks } from '../../utils/sortTasks';
import styles from './styles.module.css';
import { TaskActionTypes } from '../../contexts/TaskContext/TaskActions';

export function History() {
  const { state, dispatch } = useTaskContext();
  const hasTasks = state.tasks.length > 0;
  const [sortTaskOptions, setSortTaskOptions] = useState<SortTasksOptions>(() => ({
    tasks: sortTasks({ tasks: state.tasks }),
    direction: 'desc',
    field: 'startDate',
  }));

  useEffect(() => {
    setSortTaskOptions(prev => ({
      ...prev,
      tasks: sortTasks({
        tasks: state.tasks,
        direction: prev.direction,
        field: prev.field,
      }),
    }));
  }, [state.tasks]);

  function handleSortTasks({ field }: Pick<SortTasksOptions, 'field'>) {
    const newDirection = sortTaskOptions.direction === 'asc' ? 'desc' : 'asc';
    setSortTaskOptions({
      tasks: sortTasks({ tasks: state.tasks, field, direction: newDirection }),
      direction: newDirection,
      field,
    });
  }

  function handleDeleteAllTasks() {
    if (!confirm('Tem certeza que deseja apagar todo o histórico?')) {
      return;
    }

    dispatch({ type: TaskActionTypes.RESET_TASK });
  }

  useEffect(() => {
    document.title = 'Histórico de pomodoros | Chronos Pomodoro';
  }, []);
  
  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>Histórico</span>
          {hasTasks && (
          <span className={styles.buttonContainer}>
            <Button
              color='error'
              aria-label='Apagar todo o histórico'
              title='Apagar histórico'
              onClick={handleDeleteAllTasks}
            >
              <TrashIcon />
              </Button>
            </span>
          )}
        </Heading>
      </Container>

      <Container>
        <div className={styles.responsiveTable}>
          <table>
            <thead>
              <tr>
                <th onClick={() => handleSortTasks({ field: 'name' })} className={styles.thSort}>Tarefa ↕</th>
                <th onClick={() => handleSortTasks({ field: 'duration' })} className={styles.thSort}>Duração ↕</th>
                <th onClick={() => handleSortTasks({ field: 'startDate' })} className={styles.thSort}>Data ↕</th>
                <th onClick={() => handleSortTasks({ field: 'completeDate' })} className={styles.thSort}>Status ↕</th>
                <th onClick={() => handleSortTasks({ field: 'type' })} className={styles.thSort}>Tipo ↕</th>
              </tr>
            </thead>
            <tbody>
              {!hasTasks && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center' }}>
                    Nenhuma tarefa encontrada
                  </td>
                </tr>
              )}

              {sortTaskOptions.tasks.map((task, index) => {
                const taskTypeDictionary = {
                  workTime: 'Foco',
                  shortBreakTime: 'Pausa',
                  longBreakTime: 'Pausa longa',
                };

                return (
                  <tr key={index}>
                    <td>{task.name}</td>
                    <td>{task.duration} min</td>
                    <td>{formatDate(task.startDate)}</td>
                    <td>{getTaskStatus(task, state.activeTask)}</td>
                    <td>{taskTypeDictionary[task.type]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Container>
    </MainTemplate>
  );
}
