import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TasksActions } from './tasks.actions';
import { concatMap, exhaustMap, map } from 'rxjs';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Injectable()
export class TasksEffects {
  fetchTaskListsStarted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.fetchTaskListStarted),
      concatMap(() =>
        this.tasksService
          .getTasks()
          .pipe(
            map((tasks: Task[]) =>
              TasksActions.fetchTaskListSucceeded({ tasks })
            )
          )
      )
    )
  );

  createTaskStarted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.createTaskStarted),
      exhaustMap(({ task }) =>
        this.tasksService
          .createTask(task)
          .pipe(
            map((newTask: Task) =>
              TasksActions.createTaskSucceeded({ task: newTask })
            )
          )
      )
    )
  );

  updateTaskStarted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.updateTaskStarted),
      exhaustMap(({ task }) =>
        this.tasksService
          .updateTask(task)
          .pipe(
            map((updatedTask: Task) =>
              TasksActions.updateTaskSucceeded({ task: updatedTask })
            )
          )
      )
    )
  );

  deleteTaskStarted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.deleteTaskStarted),
      exhaustMap(({ task }) =>
        this.tasksService
          .deleteTask(task)
          .pipe(
            map((deletedTask: Task) =>
              TasksActions.deleteTaskSucceeded({ task: deletedTask })
            )
          )
      )
    )
  );

  constructor(private actions$: Actions, private tasksService: TasksService) {}
}
