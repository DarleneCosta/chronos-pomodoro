import type { TaskStateModel } from '../../models/TaskStateMode';
import { formatSecondToMinutes } from '../../utils/formatSecondToMinutes';
import { getNextCycle } from '../../utils/getNextCycle';
import { TaskActionTypes, type TaskActionModel } from './TaskActions';

export function taskReducer(
  state: TaskStateModel,
  action: TaskActionModel,
): TaskStateModel {
  switch (action.type) {
    case TaskActionTypes.START_TASK: {
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        activeTask: action.payload,
        currentCycle: getNextCycle(state.currentCycle),
        secondsRemaining: action.payload.duration * 60,
        formattedSecondsRemaining: formatSecondToMinutes(
          action.payload.duration * 60,
        ),
      };
    }
    case TaskActionTypes.INTERRUPT_TASK: {
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? { ...task, interruptDate: Date.now() }
            : task,
        ),
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
      };
    }
    case TaskActionTypes.RESET_TASK: {
      return state;
    }
  }
  return state;
}
