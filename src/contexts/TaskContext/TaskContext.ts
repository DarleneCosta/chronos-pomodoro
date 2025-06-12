import { createContext } from 'react';
import { initialState } from './initialTaskState';
import type { TaskStateModel } from '../../models/TaskStateMode';

type TaskContextType = {
  state: TaskStateModel;
  setState: React.Dispatch<React.SetStateAction<TaskStateModel>>;
};

const initialContextValue: TaskContextType = {
  state: initialState,
  setState: () => {},
};

export const TaskContext = createContext<TaskContextType>(initialContextValue);