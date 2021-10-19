import { Injectable } from '@nestjs/common';
import { Task } from './task.model';
import { TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }
  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  getTask(id: string): Task {
    const task = this.tasks.find((t) => t.id === id);
    return task;
  }

  deleteTask(id: string) {
    const indexOfTask = this.tasks.findIndex((t) => t.id === id);
    this.tasks.splice(indexOfTask, 1);
  }

  updateTask(id: string, status: string): Task {
    const task = this.tasks.find((t) => t.id === id);
    const newStatus = TaskStatus[status];
    task.status = newStatus;
    return task;
  }
}
