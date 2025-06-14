import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import styles from './styles.module.css';

export function Cycles() {
  const { state } = useTaskContext();
  const cycles = Array.from({ length: state.currentCycle });

  const cycleDescriptionMap = {
    workTime: 'foco',
    shortBreakTime: 'descanso curto',
    longBreakTime: 'descanso longo',
  };

  return (
    <div className={styles.cycles}>
      <span>Ciclos</span>
      <div className={styles.cycleDots}>
        {cycles.map((_, index) => {
          const nextCycle = getNextCycle(index);
          const nextCycleType = getNextCycleType(nextCycle);
          return (
            <span
              key={index}
              className={`${styles.cycleDot} ${styles[nextCycleType]}`}
              aria-label={`Ciclo de ${
                cycleDescriptionMap[
                  nextCycleType as keyof typeof cycleDescriptionMap
                ]
              }`}
              title={`Ciclo de ${
                cycleDescriptionMap[
                  nextCycleType as keyof typeof cycleDescriptionMap
                ]
              }`}
            ></span>
          );
        })}
      </div>
    </div>
  );
}
