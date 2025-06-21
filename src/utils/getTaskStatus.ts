import type { TaskModel } from '../models/TaskModel';

export function getTaskStatus(task: TaskModel, activeTask: TaskModel | null) {
  if (task.completeDate) {
    return 'Completa';
  }
  if (task.interruptDate) {
    return 'Interrompida';
  }
  if (activeTask?.id === task.id) {
    return 'Em progresso';
  }
  return 'Abandonada';
}
