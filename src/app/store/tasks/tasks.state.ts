import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Task } from './task.model';

export interface TasksState extends EntityState<Task> {
}

export const tasksAdapter = createEntityAdapter<Task>();

export const initialState: TasksState = tasksAdapter.getInitialState({
});
