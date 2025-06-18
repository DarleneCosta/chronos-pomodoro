import { useEffect } from 'react';
import { Container } from '../../components/Container';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { SaveIcon } from 'lucide-react';
import { useRef } from 'react';
import { showMessage } from '../../adapters/showMessage';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import styles from './styles.module.css';
import { TaskActionTypes } from '../../contexts/TaskContext/TaskActions';

export function Settings() {
  useEffect(() => {
    document.title = 'Configurações | Chronos Pomodoro';
  }, []);

  const { state, dispatch } = useTaskContext();
  const workTimeInputRef = useRef<HTMLInputElement>(null);
  const shortBreakInputRef = useRef<HTMLInputElement>(null);
  const longBreakInputRef = useRef<HTMLInputElement>(null);

  function handleSaveSettings(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    showMessage.dismiss();

    const formErrors = [];

    const workTime = Number(workTimeInputRef.current?.value);
    const shortBreak = Number(shortBreakInputRef.current?.value);
    const longBreak = Number(longBreakInputRef.current?.value);

    if (isNaN(workTime) || workTime < 1 || workTime > 120) {
      formErrors.push(
        'Digite valores entre 1 e 120 minutos para o tempo de foco.',
      );
    }

    if (isNaN(shortBreak) || shortBreak < 1 || shortBreak > 30) {
      formErrors.push(
        'Digite valores entre 1 e 30 minutos para o tempo de descanso curto.',
      );
    }

    if (isNaN(longBreak) || longBreak < 1 || longBreak > 60) {
      formErrors.push(
        'Digite valores entre 1 e 60 minutos para o tempo de descanso longo.',
      );
    }

    if (formErrors.length > 0) {
      formErrors.forEach(error => showMessage.warn(error));
      return;
    }

    dispatch({
      type: TaskActionTypes.CHANGE_SETTINGS,
      payload: {
        workTime,
        shortBreakTime: shortBreak,
        longBreakTime: longBreak,
      },
    });

    showMessage.success('Configurações salvas com sucesso');
  }
  return (
    <MainTemplate>
      <Container>
        <Heading>Configurações</Heading>
      </Container>
      <Container>
        <p style={{ textAlign: 'center' }}>
          Modifique as configurações do seu tempo de foco, descanso curto e
          descanso longo.
        </p>
      </Container>
      <Container>
        <form className={styles.form} action='' onSubmit={handleSaveSettings}>
          <div className={styles.formRow}>
            <Input
              id='work-time'
              label='Foco'
              ref={workTimeInputRef}
              defaultValue={state.config.workTime.toString()}
              type='number'
              min={1}
              max={120}
              maxLength={3}
            />
          </div>
          <div className={styles.formRow}>
            <Input
              id='short-break'
              label='Descanso curto'
              ref={shortBreakInputRef}
              defaultValue={state.config.shortBreakTime.toString()}
              type='number'
              min={1}
              max={30}
              maxLength={2}
            />
          </div>
          <div className={styles.formRow}>
            <Input
              id='long-break'
              label='Descanso longo'
              ref={longBreakInputRef}
              defaultValue={state.config.longBreakTime.toString()}
              type='number'
              min={1}
              max={60}
              maxLength={2}
            />
          </div>
          <div className={styles.formRow}>
            <Button
              aria-label='Salvar configurações'
              title='Salvar configurações'
            >
              <SaveIcon />
            </Button>
          </div>
        </form>
      </Container>
    </MainTemplate>
  );
}
