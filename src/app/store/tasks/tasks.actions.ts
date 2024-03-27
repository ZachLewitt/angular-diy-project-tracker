import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Task } from './task.model';

export const TasksActions = createActionGroup({
  source: 'Task',
  events: {
    fetchTaskListStarted: emptyProps(),
    fetchTaskListSucceeded: props<{ tasks: Task[] }>(),
    fetchTaskListFailed: props<{ error: string }>(),
    taskSelected: props<{ taskId: string }>(),
    createTaskStarted: props<{ task: Task }>(),
    createTaskSucceeded: props<{ task: Task }>(),
    createTaskFailed: props<{ error: string }>(),
    updateTaskStarted: props<{ task: Task }>(),
    updateTaskSucceeded: props<{ task: Task }>(),
    updateTaskFailed: props<{ error: string }>(),
    deleteTaskStarted: props<{ task: Task }>(),
    deleteTaskSucceeded: props<{ task: Task }>(),
    deleteTaskFailed: props<{ error: string }>(),
  },
});
