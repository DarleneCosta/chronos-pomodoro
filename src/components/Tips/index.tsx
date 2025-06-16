import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';

export const Tips = () => {
  const { state } = useTaskContext();

  const tipsForNoActiveTask = {
    workTime: `Próximo ciclo: ${state.config.workTime} minutos`,
    shortBreakTime: `Próximo ciclo: ${state.config.shortBreakTime} minutos`,
    longBreakTime: `Próximo ciclo: ${state.config.longBreakTime} minutos`,
  };
  const tipsForWhenActiveTask = {
    workTime: `Foque no seu trabalho!`,
    shortBreakTime: `Descanse um pouco!`,
    longBreakTime: `Descanse um pouco!`,
  };

  const nextCycleType = getNextCycleType(getNextCycle(state.currentCycle));

  return (
    <span>
      {state.activeTask
        ? tipsForWhenActiveTask[state.activeTask.type]
        : tipsForNoActiveTask[nextCycleType]}
    </span>
  );
};
