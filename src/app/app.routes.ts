import { Routes } from '@angular/router';
import { TaskListComponent } from './task-list';
import { TaskInfoComponent } from './task-info';

export const routes: Routes = [
  { path: 'task-list', title: 'DIY - Task List', component: TaskListComponent },
  { path: 'task-info/:id', title: 'DIY - Task Info', component: TaskInfoComponent },
  { path: 'task-info', title: 'DIY - Task Info', component: TaskInfoComponent },
  { path: '', redirectTo: 'task-list', pathMatch: 'full' },
];
