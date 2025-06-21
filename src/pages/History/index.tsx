import { useEffect } from 'react';
import { TrashIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { Button } from '../../components/Button';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import styles from './styles.module.css';
import { formatDate } from '../../utils/formatDate';

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
              {state.tasks.map((task, index) => {
                return (
                  <tr key={index}>
                    <td>{task.name}</td>
                    <td>{task.duration} min</td>
                    <td>{formatDate(task.startDate)}</td>
                    <td>{task.completeDate ? 'Completa' : 'Incompleta'}</td>
                    <td>{task.type}</td>
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
