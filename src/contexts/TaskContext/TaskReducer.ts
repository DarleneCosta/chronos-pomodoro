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
          state.activeTask?.id === task.id
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
    case TaskActionTypes.COUNT_DOWN: {
      return {
        ...state,
        secondsRemaining: action.payload.secondsRemaining,
        formattedSecondsRemaining: formatSecondToMinutes(
          action.payload.secondsRemaining,
        ),
      };
    }
    case TaskActionTypes.COMPLETE_TASK: {
      return {
        ...state,
        tasks: state.tasks.map(task =>
          state.activeTask?.id === task.id
            ? { ...task, completeDate: Date.now() }
            : task,
        ),
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
      };
    }
    case TaskActionTypes.CHANGE_SETTINGS: {
      return {
        ...state,
        config: action.payload,
      };
    }
  }
  return state;
}
