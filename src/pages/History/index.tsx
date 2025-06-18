import { useEffect } from 'react';
import { Container } from '../../components/Container';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';

export function History() {
  useEffect(() => {
    document.title = 'Histórico de pomodoros | Chronos Pomodoro';
  }, []);

  return (
    <MainTemplate>
      <Container>
        <Heading>Histórico</Heading>
      </Container>
      <Container>
        <p style={{ textAlign: 'center' }}>
          Aqui você pode ver o histórico de seus pomodoros.
        </p>
      </Container>
    </MainTemplate>
  );
}
