import { createContext } from 'react';
import { initialState } from './initialTaskState';
import type { TaskStateModel } from '../../models/TaskStateMode';
import type { TaskActionModel } from './TaskActions';

type TaskContextType = {
  state: TaskStateModel;
  dispatch: React.Dispatch<TaskActionModel>;
};

const initialContextValue: TaskContextType = {
  state: initialState,
  dispatch: () => {},
};

export const TaskContext = createContext<TaskContextType>(initialContextValue);
