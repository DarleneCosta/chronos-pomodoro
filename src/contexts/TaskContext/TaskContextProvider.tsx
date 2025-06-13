import { useEffect, useState } from 'react';
import type { TaskStateModel } from '../../models/TaskStateMode';
import { initialState } from './initialTaskState';
import { TaskContext } from './taskContext';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, setState] = useState<TaskStateModel>(initialState);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <TaskContext.Provider value={{ state, setState }}>
      {children}
    </TaskContext.Provider>
  );
}
