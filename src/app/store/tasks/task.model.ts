import { TaskStep } from "./task-step.model";

export type Task = {
  id: string;
  title: string;
  description: string;
  steps: TaskStep[];
};
