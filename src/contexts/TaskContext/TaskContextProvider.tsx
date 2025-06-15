import { useEffect, useReducer } from 'react';
import { initialState } from './initialTaskState';
import { TaskContext } from './TaskContext';
import { taskReducer } from './TaskReducer';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
