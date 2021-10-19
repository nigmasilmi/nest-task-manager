import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }
  @Get('/:id')
  getTask(@Param('id') taskId): Task {
    return this.taskService.getTask(taskId);
  }
  @Delete('/:id')
  deleteTask(@Param('id') taskId) {
    this.taskService.deleteTask(taskId);
  }

  @Patch('/:id')
  updateTask(@Param('id') taskId, @Body('statusChange') chgStatus): Task {
    return this.taskService.updateTask(taskId, chgStatus);
  }
}
