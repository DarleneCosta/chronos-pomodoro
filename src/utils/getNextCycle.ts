import type { TaskStateModel } from '../models/TaskStateMode';

export function getNextCycle(state: TaskStateModel) {
  if (state.currentCycle === 8 ) {
    return 1;
  }
  return state.currentCycle + 1;
}