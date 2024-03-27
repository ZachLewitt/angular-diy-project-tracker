import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, withLatestFrom } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Task, TasksActions, TasksState, tasksFeature } from '../store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-task-info',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    CdkDropList,
    CdkDrag,
  ],
  templateUrl: './task-info.component.html',
  styleUrl: './task-info.component.scss',
})
export class TaskInfoComponent implements OnInit, OnDestroy {
  private routeSubscription?: Subscription;

  isCreating: boolean = true;
  id?: string;

  formGroup = this.formBuilder.group(
    {
      title: ['', Validators.required],
      description: ['', Validators.required],
      steps: this.formBuilder.array(
        [this.formBuilder.control('test')],
        Validators.required
      ),
    },
    { updateOn: 'submit' }
  );

  get steps() {
    return this.formGroup.get('steps') as FormArray;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<TasksState>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.routeSubscription = this.route.params
      .pipe(withLatestFrom(this.store.select(tasksFeature.selectEntities)))
      .subscribe(([params, entities]) => {
        const id = params['id'];
        const existingTask = id ? entities[id] : null;

        if (existingTask) {
          this.id = id;
          this.isCreating = false;
          this.formGroup.setValue({
            title: existingTask.title,
            description: existingTask.description,
            steps: existingTask.steps
              .sort((a, b) => a.order - b.order)
              .map((x) => x.description),
          });
        } else {
          this.isCreating = true;
        }
      });
  }

  submitForm() {
    if (this.formGroup.valid) {
      const task: Task = {
        id: this.id ?? '',
        title: this.formGroup.value.title ?? '',
        description: this.formGroup.value.description ?? '',
        steps:
          this.formGroup.value.steps?.map((x, i) => ({
            order: i,
            description: x ?? '',
          })) ?? [],
      };

      const action = this.isCreating
        ? TasksActions.createTaskStarted({ task })
        : TasksActions.updateTaskStarted({ task });

      this.store.dispatch(action);
      this.router.navigate(['/task-list']);
    }
  }

  addStep() {
    this.steps.push(this.formBuilder.control(''));
  }

  stepDropped(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.steps.controls,
      event.previousIndex,
      event.currentIndex
    );
  }

  ngOnDestroy() {
    this.routeSubscription?.unsubscribe();
  }
}
