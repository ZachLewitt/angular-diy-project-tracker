import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Task, TasksActions, TasksState, tasksFeature } from '../store';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  tasks$: Observable<Task[]> = this.store.select(tasksFeature.selectAll);

  constructor(private store: Store<TasksState>) {}

  deleteTask(task: Task): void {
    this.store.dispatch(TasksActions.deleteTaskStarted({ task }));
  }
}
