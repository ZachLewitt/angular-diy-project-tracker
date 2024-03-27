import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { TasksActions } from './tasks.actions';
import { initialState, tasksAdapter } from './tasks.state';

export const tasksFeature = createFeature({
  name: 'tasks',
  reducer: createReducer(
    initialState,
    on(TasksActions.fetchTaskListStarted, (state) => ({ ...state })),
    on(TasksActions.fetchTaskListSucceeded, (state, { tasks }) =>
      tasksAdapter.upsertMany(tasks, state)
    ),
    on(TasksActions.fetchTaskListFailed, (state) => ({ ...state })),
    on(TasksActions.taskSelected, (state, { taskId }) => ({
      ...state,
      editingTask: state.entities[taskId] ?? null,
    })),
    on(TasksActions.createTaskSucceeded, (state, { task }) =>
      tasksAdapter.addOne(task, state)
    ),
    on(TasksActions.updateTaskSucceeded, (state, { task }) =>
      tasksAdapter.updateOne(
        {
          id: task.id,
          changes: { ...task },
        },
        state
      )
    ),
    on(TasksActions.deleteTaskSucceeded, (state, { task }) =>
      tasksAdapter.removeOne(task.id, state)
    )
  ),
  extraSelectors: ({ selectTasksState, selectEntities }) => ({
    ...tasksAdapter.getSelectors(selectTasksState),
  }),
});
