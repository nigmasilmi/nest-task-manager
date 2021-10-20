import { Injectable } from '@nestjs/common';
import { Task } from './task.model';
import { TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

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

  getTasksWithFilters(filter: GetTasksFilterDto): Task[] {
    const { status, search } = filter;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((t) => t.status === status);
    }
    if (search) {
      tasks = tasks.filter(
        (t) => t.description.includes(search) || t.title.includes(search),
      );
    }
    return tasks;
  }

  deleteTask(id: string) {
    const indexOfTask = this.tasks.findIndex((t) => t.id === id);
    this.tasks.splice(indexOfTask, 1);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTask(id);
    const newStatus = status;
    task.status = newStatus;
    return task;
  }
}
