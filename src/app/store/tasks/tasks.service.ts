import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from './task.model';

const TASK_KEY = 'tasks';

const defaultTasks = [
  { id: '1', title: 'Test Task', description: 'Test Description' },
];

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor() {}

  getTasks(): Observable<Task[]> {
    return of(this.getTasksFromStorage());
  }

  createTask(task: Task) {
    const taskWithId = { ...task, id: crypto.randomUUID() };

    const tasks = this.getTasksFromStorage();
    tasks.push(taskWithId);
    this.setTasksInStorage(tasks);

    return of(taskWithId);
  }

  updateTask(task: Task) {
    const tasks = this.getTasksFromStorage();
    const updatedTasks = tasks.map((x) => (x.id === task.id ? task : x));
    this.setTasksInStorage(updatedTasks);

    return of(task);
  }

  deleteTask(task: Task) {
    const tasks = this.getTasksFromStorage();
    const remainingTasks = tasks.filter((x) => x.id !== task.id);
    this.setTasksInStorage(remainingTasks);

    return of(task);
  }

  private getTasksFromStorage() {
    const json = localStorage.getItem(TASK_KEY) ?? '';
    const tasks = JSON.parse(json) as Task[];
    return tasks;
  }

  private setTasksInStorage(tasks: Task[]) {
    const json = JSON.stringify(tasks);
    localStorage.setItem(TASK_KEY, json);
  }
}
