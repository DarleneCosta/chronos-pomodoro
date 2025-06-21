import { useEffect, useReducer, useRef } from 'react';
import { initialState } from './initialTaskState';
import { TaskContext } from './TaskContext';
import { taskReducer } from './TaskReducer';
import { TaskActionTypes } from './TaskActions';
import { TimerWorkerManager } from '../../workes/TimerWorkerManager';
import { loadBeep } from '../../utils/loadBeep';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const worker = TimerWorkerManager.getInstance();
  const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);

  worker.onmessage((event: MessageEvent) => {
    const countDownSeconds = event.data;
    if (countDownSeconds <= 0!) {
      if (playBeepRef.current) {
        playBeepRef.current();
        playBeepRef.current = null;
      }
      dispatch({
        type: TaskActionTypes.COMPLETE_TASK,
      });
      worker.terminate();
    } else {
      dispatch({
        type: TaskActionTypes.COUNT_DOWN,
        payload: { secondsRemaining: countDownSeconds },
      });
    }
  });

  useEffect(() => {
    if (!state.activeTask) {
      worker.terminate();
      return;
    }
    document.title = `${state.formattedSecondsRemaining} - Chronos Pomodoro`;
    worker.postMessage(state);
  }, [worker, state]);

  useEffect(() => {
    if (state.activeTask && !playBeepRef.current) {
      playBeepRef.current = loadBeep();
    } else {
      playBeepRef.current = null;
    }
  }, [state.activeTask]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
