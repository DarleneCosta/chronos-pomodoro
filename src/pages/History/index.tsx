import { useEffect } from 'react';
import { TrashIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { Button } from '../../components/Button';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { formatDate } from '../../utils/formatDate';
import { getTaskStatus } from '../../utils/getTaskStatus';
import styles from './styles.module.css';

export function History() {
  const { state } = useTaskContext();
  useEffect(() => {
    document.title = 'Histórico de pomodoros | Chronos Pomodoro';
  }, []);
  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>Histórico</span>
          <span className={styles.buttonContainer}>
            <Button
              color='error'
              aria-label='Apagar todo o histórico'
              title='Apagar histórico'
            >
              <TrashIcon />
            </Button>
          </span>
        </Heading>
      </Container>

      <Container>
        <div className={styles.responsiveTable}>
          <table>
            <thead>
              <tr>
                <th>Tarefa</th>
                <th>Duração</th>
                <th>Data</th>
                <th>Status</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {state.tasks.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center' }}>
                    Nenhuma tarefa encontrada
                  </td>
                </tr>
              )}

              {state.tasks.map((task, index) => {
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
